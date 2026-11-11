import type { PayloadRequest } from 'payload'
import { BLOG, fuelle } from '@/i18n/inhalte/blog'
import { istSprachCode, lokalisierterPfad, STANDARD_SPRACHE } from '@/i18n/sprachen'

// Sonderzeichen im Namen unschädlich machen, bevor er in die HTML-Mail kommt
const ohneHtml = (wert: string) => wert.replace(/[&<>"']/g, (z) => `&#${z.charCodeAt(0)};`)

// Sprache der Mail: kommt als ?locale=… mit der Anfrage aus dem Formular
function mailSprache(req: PayloadRequest) {
  return istSprachCode(req.locale) ? req.locale : STANDARD_SPRACHE
}

// Baut den Link zur passenden Blog-Seite in der Sprache des Mitglieds
function link(req: PayloadRequest, pfad: string, token: string) {
  const basis = (req.payload.config.serverURL || '').replace(/\/$/, '')
  return `${basis}${lokalisierterPfad(pfad, mailSprache(req))}?token=${encodeURIComponent(token)}`
}

// Schlichte Mail im Rettungsanker-Look: dunkler Kopf, gelber Knopf
function mailHtml(text: string, knopf: string, url: string, req: PayloadRequest) {
  const t = BLOG[mailSprache(req)].mail
  return `<!doctype html><html><body style="margin:0;background:#f4f1ea;font-family:Arial,sans-serif;color:#1a252d">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;overflow:hidden">
<tr><td style="background:#1a252d;color:#eab308;padding:20px 28px;font-size:20px;font-weight:bold">Rettungsanker-Blog</td></tr>
<tr><td style="padding:28px;font-size:16px;line-height:1.5">${text}
<p style="margin:28px 0"><a href="${url}" style="background:#eab308;color:#1a252d;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:bold">${knopf}</a></p>
<p style="font-size:13px;color:#555;word-break:break-all">${url}</p>
<p style="font-size:13px;color:#555">${t.ignorieren}</p>
<p>${t.gruss}</p></td></tr></table></td></tr></table></body></html>`
}

type MailArgs = { req?: PayloadRequest; token?: string; user?: { name?: string | null } }

export const bestaetigungsMail = {
  generateEmailSubject: ({ req }: MailArgs = {}) => BLOG[mailSprache(req!)].mail.bestaetigenBetreff,
  generateEmailHTML: ({ req, token, user }: MailArgs = {}) => {
    const t = BLOG[mailSprache(req!)].mail
    return mailHtml(
      fuelle(t.bestaetigenText, { name: ohneHtml(user?.name || '') }),
      t.bestaetigenKnopf,
      link(req!, '/blog/bestaetigen', token || ''),
      req!,
    )
  },
}

export const passwortMail = {
  generateEmailSubject: ({ req }: MailArgs = {}) => BLOG[mailSprache(req!)].mail.passwortBetreff,
  generateEmailHTML: ({ req, token, user }: MailArgs = {}) => {
    const t = BLOG[mailSprache(req!)].mail
    return mailHtml(
      fuelle(t.passwortText, { name: ohneHtml(user?.name || '') }),
      t.passwortKnopf,
      link(req!, '/blog/passwort-neu', token || ''),
      req!,
    )
  },
}
