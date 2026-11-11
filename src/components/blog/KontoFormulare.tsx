'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { BLOG, fuelle } from '@/i18n/inhalte/blog'
import { useSprache } from '@/i18n/SprachProvider'
import { lokalisierterPfad } from '@/i18n/sprachen'
import { api, fehlerDetails, sicheresZiel } from '@/lib/blog/api'

// ─── Gemeinsame Bausteine ────────────────────────────────────────────────────

export function KontoKarte({
  titel,
  text,
  children,
}: {
  titel: string
  text?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-6 md:p-8">
        <h1 className="headingB m-0 text-2xl text-yellow-400 md:text-3xl">{titel}</h1>
        {text && <p className="mt-3 font-sans text-sm text-zinc-400">{text}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

const feldKlasse =
  'w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 font-sans text-base text-zinc-100 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30'

function Feld({
  label,
  hinweis,
  ...props
}: { label: string; hinweis?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-sm text-zinc-300">{label}</span>
      <input className={feldKlasse} {...props} />
      {hinweis && <span className="mt-1 block font-sans text-xs text-zinc-500">{hinweis}</span>}
    </label>
  )
}

export function Meldung({
  art,
  children,
}: {
  art: 'fehler' | 'erfolg'
  children: React.ReactNode
}) {
  const Icon = art === 'fehler' ? AlertTriangle : CheckCircle2
  return (
    <div
      role={art === 'fehler' ? 'alert' : 'status'}
      className={`flex gap-3 rounded-lg border p-3 font-sans text-sm ${
        art === 'fehler'
          ? 'border-red-500/40 bg-red-950/40 text-red-200'
          : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200'
      }`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  )
}

function Absenden({ laeuft, text }: { laeuft: boolean; text: string }) {
  return (
    <button
      type="submit"
      disabled={laeuft}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 py-2.5 font-sans font-semibold text-zinc-900 transition-colors hover:bg-yellow-400 disabled:opacity-60"
    >
      {laeuft && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {text}
    </button>
  )
}

const linkKlasse = 'text-yellow-400 underline-offset-4 hover:underline'

// ─── Anmelden ────────────────────────────────────────────────────────────────

export function AnmeldenFormular({ weiter }: { weiter?: string }) {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const pfad = (p: string) => lokalisierterPfad(p, sprache)!
  const [email, setEmail] = useState('')
  const [passwort, setPasswort] = useState('')
  const [fehler, setFehler] = useState('')
  const [laeuft, setLaeuft] = useState(false)

  async function absenden(e: React.FormEvent) {
    e.preventDefault()
    setLaeuft(true)
    setFehler('')
    const res = await api('/api/mitglieder/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: passwort }),
    })
    if (res.ok) {
      // Komplett neu laden, damit die Server-Seiten den frischen Login-Cookie sehen
      window.location.assign(sicheresZiel(weiter, pfad('/blog')))
      return
    }
    const { text } = fehlerDetails(res.daten)
    setFehler(
      res.status === 403
        ? t.fehler.nichtBestaetigt
        : /locked|gesperrt/i.test(text)
          ? t.fehler.gesperrt
          : res.status === 401
            ? t.fehler.loginFalsch
            : t.fehler.allgemein,
    )
    setLaeuft(false)
  }

  return (
    <KontoKarte titel={t.konto.anmeldenTitel} text={t.konto.anmeldenText}>
      <form onSubmit={absenden} className="space-y-4">
        <Feld
          label={t.konto.email}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Feld
          label={t.konto.passwort}
          type="password"
          autoComplete="current-password"
          required
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
        />
        {fehler && <Meldung art="fehler">{fehler}</Meldung>}
        <Absenden laeuft={laeuft} text={t.konto.anmelden} />
      </form>
      <div className="mt-6 space-y-2 font-sans text-sm text-zinc-400">
        <p className="m-0">
          <Link href={pfad('/blog/passwort-vergessen')} className={linkKlasse}>
            {t.konto.passwortVergessen}
          </Link>
        </p>
        <p className="m-0">
          {t.konto.nochKeinKonto}{' '}
          <Link href={pfad('/blog/registrieren')} className={linkKlasse}>
            {t.konto.jetztRegistrieren}
          </Link>
        </p>
      </div>
    </KontoKarte>
  )
}

// ─── Registrieren ────────────────────────────────────────────────────────────

export function RegistrierenFormular() {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const pfad = (p: string) => lokalisierterPfad(p, sprache)!
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [passwort, setPasswort] = useState('')
  const [passwort2, setPasswort2] = useState('')
  const [regeln, setRegeln] = useState(false)
  const [alter, setAlter] = useState<'' | 'ab16' | 'unter16'>('')
  const [fehler, setFehler] = useState('')
  const [laeuft, setLaeuft] = useState(false)
  const [fertig, setFertig] = useState(false)

  async function absenden(e: React.FormEvent) {
    e.preventDefault()
    if (passwort.length < 8) return setFehler(t.fehler.passwortKurz)
    if (passwort !== passwort2) return setFehler(t.fehler.passwortUngleich)
    if (!alter) return setFehler(t.fehler.alter)
    if (!regeln) return setFehler(t.fehler.regeln)
    setLaeuft(true)
    setFehler('')
    // ?locale= bestimmt die Sprache der Bestätigungsmail
    const res = await api(`/api/mitglieder?locale=${sprache}`, {
      method: 'POST',
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password: passwort,
        altersangabe: alter,
      }),
    })
    setLaeuft(false)
    if (res.ok) return setFertig(true)
    const { pfade } = fehlerDetails(res.daten)
    setFehler(
      pfade.includes('altersangabe')
        ? t.fehler.alter
        : pfade.includes('email')
          ? t.fehler.emailVergeben
          : pfade.includes('password')
            ? t.fehler.passwortKurz
            : t.fehler.allgemein,
    )
  }

  if (fertig) {
    return (
      <KontoKarte titel={t.konto.registriertTitel}>
        <Meldung art="erfolg">{fuelle(t.konto.registriertText, { email })}</Meldung>
        <p className="mt-6 font-sans text-sm">
          <Link href={pfad('/blog/anmelden')} className={linkKlasse}>
            {t.konto.zurAnmeldung}
          </Link>
        </p>
      </KontoKarte>
    )
  }

  // Link zur Datenschutzerklärung mitten im übersetzten Satz
  const [vorDs, nachDs] = t.konto.regelnAkzeptieren.split('{datenschutz}')

  return (
    <KontoKarte titel={t.konto.registrierenTitel} text={t.konto.registrierenText}>
      <form onSubmit={absenden} className="space-y-4">
        <Feld
          label={t.konto.name}
          hinweis={t.konto.hinweisName}
          autoComplete="nickname"
          required
          minLength={2}
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Feld
          label={t.konto.email}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Feld
          label={t.konto.passwort}
          hinweis={t.konto.hinweisPasswort}
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
        />
        <Feld
          label={t.konto.passwortWiederholen}
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={passwort2}
          onChange={(e) => setPasswort2(e.target.value)}
        />

        {/* Altersangabe: unter 16 nur mit Einverständnis der Eltern (siehe Datenschutzerklärung) */}
        <fieldset className="rounded-lg border border-zinc-700/60 bg-zinc-950/40 p-4">
          <legend className="px-1 font-sans text-sm font-semibold text-zinc-200">
            {t.konto.alterTitel}
          </legend>
          {(
            [
              ['ab16', t.konto.alterAb16],
              ['unter16', t.konto.alterUnter16],
            ] as const
          ).map(([wert, text]) => (
            <label
              key={wert}
              className="mt-2 flex items-start gap-2 font-sans text-sm text-zinc-300"
            >
              <input
                type="radio"
                name="alter"
                value={wert}
                checked={alter === wert}
                onChange={() => setAlter(wert)}
                className="mt-1.5 size-4 shrink-0 accent-yellow-500"
              />
              <span>{text}</span>
            </label>
          ))}
        </fieldset>

        <div className="rounded-lg border border-zinc-700/60 bg-zinc-950/40 p-4">
          <p className="m-0 font-sans text-sm font-semibold text-zinc-200">{t.konto.regelnTitel}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 font-sans text-xs leading-5 text-zinc-400">
            {t.konto.regeln.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <label className="mt-3 flex items-start gap-2 font-sans text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={regeln}
              onChange={(e) => setRegeln(e.target.checked)}
              className="mt-1.5 size-4 accent-yellow-500"
            />
            <span>
              {vorDs}
              <Link href={pfad('/datenschutz')} target="_blank" className={linkKlasse}>
                {t.konto.datenschutz}
              </Link>
              {nachDs}
            </span>
          </label>
        </div>

        {fehler && <Meldung art="fehler">{fehler}</Meldung>}
        <Absenden laeuft={laeuft} text={t.konto.registrieren} />
      </form>
      <p className="mt-6 font-sans text-sm text-zinc-400">
        {t.konto.schonKonto}{' '}
        <Link href={pfad('/blog/anmelden')} className={linkKlasse}>
          {t.konto.zurAnmeldung}
        </Link>
      </p>
    </KontoKarte>
  )
}

// ─── E-Mail bestätigen (Link aus der Mail) ──────────────────────────────────

export function Bestaetigen({ token }: { token: string }) {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const [stand, setStand] = useState<'laeuft' | 'ok' | 'fehler'>(token ? 'laeuft' : 'fehler')
  // In der Entwicklung ruft React Effekte doppelt auf; der Token gilt aber nur einmal
  const gesendet = useRef(false)

  useEffect(() => {
    if (!token || gesendet.current) return
    gesendet.current = true
    api(`/api/mitglieder/verify/${encodeURIComponent(token)}`, { method: 'POST' }).then((res) =>
      setStand(res.ok ? 'ok' : 'fehler'),
    )
  }, [token])

  return (
    <KontoKarte titel={t.konto.bestaetigenTitel}>
      {stand === 'laeuft' && (
        <p className="flex items-center gap-2 font-sans text-zinc-300">
          <Loader2 className="size-4 animate-spin" aria-hidden /> {t.konto.bestaetigtLaeuft}
        </p>
      )}
      {stand === 'ok' && <Meldung art="erfolg">{t.konto.bestaetigt}</Meldung>}
      {stand === 'fehler' && <Meldung art="fehler">{t.konto.bestaetigenFehler}</Meldung>}
      {stand !== 'laeuft' && (
        <p className="mt-6 font-sans text-sm">
          <Link href={lokalisierterPfad('/blog/anmelden', sprache)!} className={linkKlasse}>
            {t.konto.zurAnmeldung}
          </Link>
        </p>
      )}
    </KontoKarte>
  )
}

// ─── Passwort vergessen ─────────────────────────────────────────────────────

export function PasswortVergessenFormular() {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const [email, setEmail] = useState('')
  const [laeuft, setLaeuft] = useState(false)
  const [fertig, setFertig] = useState(false)

  async function absenden(e: React.FormEvent) {
    e.preventDefault()
    setLaeuft(true)
    await api(`/api/mitglieder/forgot-password?locale=${sprache}`, {
      method: 'POST',
      body: JSON.stringify({ email: email.trim() }),
    })
    // Immer dieselbe Antwort, damit niemand ausprobieren kann, welche Adressen registriert sind
    setLaeuft(false)
    setFertig(true)
  }

  return (
    <KontoKarte titel={t.konto.vergessenTitel} text={fertig ? undefined : t.konto.vergessenText}>
      {fertig ? (
        <Meldung art="erfolg">{t.konto.vergessenGesendet}</Meldung>
      ) : (
        <form onSubmit={absenden} className="space-y-4">
          <Feld
            label={t.konto.email}
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Absenden laeuft={laeuft} text={t.konto.vergessenSenden} />
        </form>
      )}
      <p className="mt-6 font-sans text-sm">
        <Link href={lokalisierterPfad('/blog/anmelden', sprache)!} className={linkKlasse}>
          {t.konto.zurAnmeldung}
        </Link>
      </p>
    </KontoKarte>
  )
}

// ─── Neues Passwort (Link aus der Mail) ─────────────────────────────────────

export function NeuesPasswortFormular({ token }: { token: string }) {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const [passwort, setPasswort] = useState('')
  const [passwort2, setPasswort2] = useState('')
  const [fehler, setFehler] = useState('')
  const [laeuft, setLaeuft] = useState(false)

  async function absenden(e: React.FormEvent) {
    e.preventDefault()
    if (passwort.length < 8) return setFehler(t.fehler.passwortKurz)
    if (passwort !== passwort2) return setFehler(t.fehler.passwortUngleich)
    setLaeuft(true)
    setFehler('')
    const res = await api('/api/mitglieder/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password: passwort }),
    })
    // Payload meldet nach dem Zurücksetzen direkt an
    if (res.ok) return window.location.assign(lokalisierterPfad('/blog', sprache)!)
    setLaeuft(false)
    setFehler(t.konto.neuFehler)
  }

  return (
    <KontoKarte titel={t.konto.neuTitel}>
      <form onSubmit={absenden} className="space-y-4">
        <Feld
          label={t.konto.passwort}
          hinweis={t.konto.hinweisPasswort}
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={passwort}
          onChange={(e) => setPasswort(e.target.value)}
        />
        <Feld
          label={t.konto.passwortWiederholen}
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={passwort2}
          onChange={(e) => setPasswort2(e.target.value)}
        />
        {fehler && <Meldung art="fehler">{fehler}</Meldung>}
        <Absenden laeuft={laeuft} text={t.konto.neuSpeichern} />
      </form>
    </KontoKarte>
  )
}
