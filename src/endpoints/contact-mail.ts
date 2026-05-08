import { APIError, type Endpoint, type PayloadRequest } from 'payload'
import { Resend } from 'resend'

import { getContactRateLimit } from '@/lib/contact-rate-limit'

type ContactMailBody = {
  name?: unknown
  email?: unknown
  phone?: unknown
  eventDate?: unknown
  subject?: unknown
  message?: unknown
  company?: unknown
  startedAt?: unknown
  turnstileToken?: unknown
}

const MIN_FORM_FILL_MS = 4000

function toTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getClientIdentifier(req: PayloadRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return req.headers.get('x-real-ip') || 'unknown'
}

async function verifyTurnstileToken(token: string, clientIdentifier: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    throw new APIError('Turnstile secret key is not configured.', 503)
  }

  const verificationBody = new URLSearchParams({
    secret: secretKey,
    response: token,
    remoteip: clientIdentifier,
  })

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: verificationBody,
  })

  if (!response.ok) {
    throw new APIError('Captcha verification failed.', 502)
  }

  const result = (await response.json()) as { success?: boolean }

  return result.success === true
}

export const contactMailEndpoint: Endpoint = {
  path: '/contact-mail',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    let body: ContactMailBody

    if (typeof req.json !== 'function') {
      throw new APIError('Request body is not available', 400)
    }

    try {
      body = (await req.json()) as ContactMailBody
    } catch {
      throw new APIError('Invalid JSON body', 400)
    }

    const name = toTrimmedString(body.name)
    const email = toTrimmedString(body.email)
    const phone = toTrimmedString(body.phone)
    const eventDate = toTrimmedString(body.eventDate)
    const subject = toTrimmedString(body.subject) || 'Kontaktformular'
    const message = toTrimmedString(body.message)
    const company = toTrimmedString(body.company)
    const startedAt = toTrimmedString(body.startedAt)
    const turnstileToken = toTrimmedString(body.turnstileToken)

    // Honeypot field should stay empty for real users.
    if (company) {
      return Response.json({ ok: true })
    }

    const startedAtMs = Date.parse(startedAt)
    if (!Number.isNaN(startedAtMs) && Date.now() - startedAtMs < MIN_FORM_FILL_MS) {
      throw new APIError('Anfrage wurde zu schnell abgeschickt. Bitte versuche es erneut.', 400)
    }

    if (!name || !email || !message) {
      throw new APIError('Missing required fields: name, email, message', 400)
    }

    if (!turnstileToken) {
      throw new APIError('Captcha validation is required.', 400)
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      throw new APIError('Invalid email address', 400)
    }

    const rateLimit = getContactRateLimit()
    const clientIdentifier = getClientIdentifier(req)

    if (rateLimit) {
      const rateLimitResult = await rateLimit.limit(clientIdentifier)

      if (!rateLimitResult.success) {
        throw new APIError('Zu viele Anfragen. Bitte versuche es in ein paar Minuten erneut.', 429)
      }
    }

    const isTurnstileValid = await verifyTurnstileToken(turnstileToken, clientIdentifier)
    if (!isTurnstileValid) {
      throw new APIError('Captcha validation failed.', 400)
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeEventDate = escapeHtml(eventDate)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

    const phoneLine = phone ? `Telefon: ${phone}\n` : ''
    const eventDateLine = eventDate ? `Veranstaltungsdatum: ${eventDate}\n` : ''
    const phoneHtml = phone ? `<p><strong>Telefon:</strong> ${safePhone}</p>` : ''
    const eventDateHtml = eventDate
      ? `<p><strong>Veranstaltungsdatum:</strong> ${safeEventDate}</p>`
      : ''

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      throw new APIError('Email service is not configured.', 503)
    }

    const resend = new Resend(resendApiKey)
    await resend.emails.send({
      from: `Rettungsanker <${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: 'rettungsanker-freiburg@gmx.de',
      replyTo: email,
      subject: `[Website] ${subject}`,
      text: `Name: ${name}\nE-Mail: ${email}\n${phoneLine}${eventDateLine}Betreff: ${subject}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>E-Mail:</strong> ${safeEmail}</p>${phoneHtml}${eventDateHtml}<p><strong>Betreff:</strong> ${safeSubject}</p><p><strong>Nachricht:</strong><br/>${safeMessage}</p>`,
    })

    return Response.json({ ok: true })
  },
}
