'use client'

import { AlertTriangle, CheckCircle2, Clock3, Loader2, ShieldAlert, Wrench } from 'lucide-react'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          theme?: 'light' | 'dark' | 'auto'
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        },
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
    }
  }
}

type FormState = {
  name: string
  email: string
  phone: string
  eventDate: string
  subject: string
  message: string
  company: string
  startedAt: string
  turnstileToken: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  subject: '',
  message: '',
  company: '',
  startedAt: '',
  turnstileToken: '',
}

function resolveErrorMessage(status: number, payload: unknown): string {
  const response = payload as
    | {
        message?: string
        error?: string
        errors?: Array<{ message?: string }>
      }
    | null
    | undefined

  const serverMessage =
    response?.message ||
    response?.error ||
    response?.errors?.find((entry) => entry.message)?.message

  if (status === 429) {
    return 'Zu viele Anfragen in kurzer Zeit. Bitte warte kurz und versuche es dann erneut.'
  }

  if (status === 503) {
    return 'Das Kontaktformular ist im Moment nicht verfuegbar. Bitte versuche es spaeter erneut.'
  }

  if (serverMessage) {
    const normalizedMessage = serverMessage.toLowerCase()

    if (normalizedMessage.includes('captcha') || normalizedMessage.includes('turnstile')) {
      return 'Die Captcha-Pruefung ist fehlgeschlagen oder abgelaufen. Bitte bestaetige sie erneut.'
    }
  }

  return serverMessage || 'Die Nachricht konnte nicht gesendet werden.'
}

function getErrorVariant(message: string): 'captcha' | 'rate-limit' | 'unavailable' | 'generic' {
  const normalizedMessage = message.toLowerCase()

  if (normalizedMessage.includes('captcha') || normalizedMessage.includes('turnstile')) {
    return 'captcha'
  }

  if (normalizedMessage.includes('zu viele anfragen') || normalizedMessage.includes('warte kurz')) {
    return 'rate-limit'
  }

  if (
    normalizedMessage.includes('nicht verfuegbar') ||
    normalizedMessage.includes('spaeter erneut')
  ) {
    return 'unavailable'
  }

  return 'generic'
}

export default function ContactForm() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)
  const successAlertRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormState>({
    ...initialState,
    startedAt: new Date().toISOString(),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [isTurnstileScriptLoaded, setIsTurnstileScriptLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)

  const errorVariant = errorMessage ? getErrorVariant(errorMessage) : null
  const StatusIcon =
    errorVariant === 'captcha'
      ? ShieldAlert
      : errorVariant === 'rate-limit'
        ? Clock3
        : errorVariant === 'unavailable'
          ? Wrench
          : AlertTriangle
  const statusTitle =
    errorVariant === 'captcha'
      ? 'Captcha erneut bestaetigen'
      : errorVariant === 'rate-limit'
        ? 'Kurz warten und erneut senden'
        : errorVariant === 'unavailable'
          ? 'Formular temporaer nicht verfuegbar'
          : 'Senden fehlgeschlagen'

  useEffect(() => {
    if (!turnstileSiteKey) {
      setErrorMessage('Captcha ist nicht konfiguriert. Bitte spaeter erneut versuchen.')
    }
  }, [turnstileSiteKey])

  useEffect(() => {
    if (!isSubmitting) {
      setSubmitProgress(0)
      return
    }

    setSubmitProgress(12)

    const intervalId = window.setInterval(() => {
      setSubmitProgress((current) => {
        if (current >= 88) {
          return current
        }

        return Math.min(current + Math.random() * 16, 88)
      })
    }, 220)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isSubmitting])

  useEffect(() => {
    if (!successMessage) {
      setIsSuccessVisible(false)
      return
    }

    setIsSuccessVisible(true)

    successAlertRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })

    const fadeTimeoutId = window.setTimeout(() => {
      setIsSuccessVisible(false)
    }, 3200)

    const clearTimeoutId = window.setTimeout(() => {
      setSuccessMessage('')
    }, 4000)

    return () => {
      window.clearTimeout(fadeTimeoutId)
      window.clearTimeout(clearTimeoutId)
    }
  }, [successMessage])

  useEffect(() => {
    if (
      !isTurnstileScriptLoaded ||
      !turnstileSiteKey ||
      !turnstileContainerRef.current ||
      !window.turnstile ||
      turnstileWidgetIdRef.current
    ) {
      return
    }

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      theme: 'dark',
      callback: (token: string) => {
        setFormData((current) => ({
          ...current,
          turnstileToken: token,
        }))
        setErrorMessage('')
      },
      'expired-callback': () => {
        setFormData((current) => ({
          ...current,
          turnstileToken: '',
        }))
      },
      'error-callback': () => {
        setFormData((current) => ({
          ...current,
          turnstileToken: '',
        }))
        setErrorMessage('Captcha konnte nicht geladen werden. Bitte versuche es erneut.')
      },
    })

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
        turnstileWidgetIdRef.current = null
      }
    }
  }, [isTurnstileScriptLoaded, turnstileSiteKey])

  function resetTurnstile() {
    setFormData((current) => ({
      ...current,
      turnstileToken: '',
    }))

    if (turnstileWidgetIdRef.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetIdRef.current)
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!formData.turnstileToken) {
      setErrorMessage('Bitte bestaetige zuerst das Captcha.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      setSubmitProgress(20)

      const response = await fetch('/api/contact-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as unknown

        throw new Error(resolveErrorMessage(response.status, result))
      }

      setFormData({
        ...initialState,
        startedAt: new Date().toISOString(),
      })
      setSubmitProgress(100)
      resetTurnstile()
      setSuccessMessage('Nachricht gesendet. Wir melden uns so schnell wie moeglich bei dir.')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Ein unerwarteter Fehler ist aufgetreten.'
      setErrorMessage(message)
      setSubmitProgress(100)
      resetTurnstile()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setIsTurnstileScriptLoaded(true)}
      />

      <form className="space-y-6" onSubmit={handleSubmit}>
        {isSubmitting ? (
          <div className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/80">
              <div
                className="h-full rounded-full bg-linear-to-r from-yellow-500 via-lime-400 to-yellow-300 transition-[width] duration-200 ease-out"
                style={{ width: `${submitProgress}%` }}
              />
            </div>
            <p className="font-sans text-xs tracking-wide text-yellow-300/90">
              Nachricht wird sicher uebermittelt ... {Math.round(submitProgress)}%
            </p>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="font-sans text-zinc-100">
              Name
            </Label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dein Name"
              required
              className="h-11 border-zinc-700 bg-zinc-900/80 font-sans text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email" className="font-sans text-zinc-100">
              E-Mail
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@beispiel.de"
              required
              className="h-11 border-zinc-700 bg-zinc-900/80 font-sans text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="font-sans text-zinc-100">
              Telefonnummer
            </Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Optional fuer Rueckfragen"
              className="h-11 border-zinc-700 bg-zinc-900/80 font-sans text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-event-date" className="font-sans text-zinc-100">
              Veranstaltungsdatum
            </Label>
            <Input
              id="contact-event-date"
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              className="h-11 border-zinc-700 bg-zinc-900/80 font-sans text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject" className="font-sans text-zinc-100">
              Betreff
            </Label>
            <Input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Worum geht es?"
              className="h-11 border-zinc-700 bg-zinc-900/80 font-sans text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="hidden" aria-hidden="true">
          <Label htmlFor="contact-company">Firma</Label>
          <Input
            id="contact-company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
          <Label htmlFor="contact-started-at">Started</Label>
          <Input
            id="contact-started-at"
            name="startedAt"
            type="text"
            value={formData.startedAt}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message" className="font-sans text-zinc-100">
            Nachricht
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Schreib hier deine Nachricht"
            required
            className="min-h-40 border-zinc-700 bg-zinc-900/80 font-sans text-white placeholder:text-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="font-sans text-zinc-100">Captcha</Label>
          <div
            ref={turnstileContainerRef}
            className={cn(
              'min-h-16.25 rounded-2xl border bg-zinc-900/80 p-3 transition-colors',
              errorVariant === 'captcha'
                ? 'border-red-400 ring-2 ring-red-500/30'
                : 'border-zinc-700',
            )}
          />
          <p className="font-sans text-sm text-zinc-400">
            Cloudflare Turnstile schuetzt dieses Formular vor automatisierten Anfragen.
          </p>
        </div>

        {successMessage ? (
          <div
            ref={successAlertRef}
            className={cn(
              'flex items-start gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 font-sans text-sm text-emerald-200 transition-opacity duration-700',
              isSuccessVisible ? 'opacity-100' : 'opacity-0',
            )}
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-bold text-emerald-100">Nachricht erfolgreich gesendet</p>
              <p>{successMessage}</p>
            </div>
          </div>
        ) : null}

        {errorMessage ? (
          <div
            role="alert"
            className={cn(
              'flex items-start gap-3 rounded-2xl px-4 py-3 font-sans text-sm',
              errorVariant === 'rate-limit' &&
                'border border-amber-500/40 bg-amber-500/10 text-amber-100',
              errorVariant === 'unavailable' &&
                'border border-orange-500/40 bg-orange-500/10 text-orange-100',
              (errorVariant === 'captcha' || errorVariant === 'generic') &&
                'border border-red-500/40 bg-red-500/10 text-red-200',
            )}
          >
            <StatusIcon className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-bold">{statusTitle}</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-sm leading-6 text-zinc-400">
            Mit dem Absenden bestaetigst du, dass wir deine Anfrage zur Bearbeitung per E-Mail
            verarbeiten duerfen. Turnstile und serverseitiges Rate-Limiting blockieren Missbrauch.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting || !turnstileSiteKey}
            className="h-12 rounded-full bg-yellow-500 px-8 font-sans text-base font-bold text-zinc-950 hover:bg-yellow-400"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Wird gesendet ...
              </span>
            ) : (
              'Nachricht senden'
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
