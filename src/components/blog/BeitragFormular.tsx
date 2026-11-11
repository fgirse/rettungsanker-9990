'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { BLOG, fuelle } from '@/i18n/inhalte/blog'
import { useSprache } from '@/i18n/SprachProvider'
import { lokalisierterPfad } from '@/i18n/sprachen'
import { api, BildFehler, bildVorbereiten } from '@/lib/blog/api'
import { Meldung } from './KontoFormulare'

const ANNEHMEN = '.jpg,.jpeg,.png,.svg,image/jpeg,image/png,image/svg+xml'
const MAX_GALERIE = 12

type Vorschau = { datei: File; url: string }

const feldKlasse =
  'w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 font-sans text-base text-zinc-100 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30'

function Beschriftung({
  text,
  hinweis,
  children,
}: {
  text: string
  hinweis?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-sans text-sm font-semibold text-zinc-200">{text}</span>
      {children}
      {hinweis && <span className="mt-1 block font-sans text-xs text-zinc-500">{hinweis}</span>}
    </label>
  )
}

// Formular für einen neuen Blogbeitrag. Bilder werden zuerst einzeln hochgeladen
// (und dabei verkleinert), danach wird der Beitrag mit ihren IDs angelegt.
export function BeitragFormular({ themen }: { themen: { id: string; titel: string }[] }) {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const [titel, setTitel] = useState('')
  const [thema, setThema] = useState('')
  const [einleitung, setEinleitung] = useState('')
  const [inhalt, setInhalt] = useState('')
  const [schlagwoerter, setSchlagwoerter] = useState('')
  const [titelbild, setTitelbild] = useState<Vorschau | null>(null)
  const [galerie, setGalerie] = useState<Vorschau[]>([])
  const [stand, setStand] = useState<'bereit' | 'bilder' | 'speichert'>('bereit')
  const [fehler, setFehler] = useState('')

  // Vorschau-Adressen im Browser wieder freigeben, wenn das Formular verschwindet
  useEffect(
    () => () => {
      if (titelbild) URL.revokeObjectURL(titelbild.url)
      galerie.forEach((g) => URL.revokeObjectURL(g.url))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const vorschau = (datei: File): Vorschau => ({ datei, url: URL.createObjectURL(datei) })

  async function hochladen(datei: File): Promise<string> {
    const fertig = await bildVorbereiten(datei)
    const form = new FormData()
    form.append('file', fertig)
    form.append('_payload', JSON.stringify({ alt: titel.slice(0, 200) }))
    const res = await api<{ doc?: { id: string } }>('/api/blog-bilder', {
      method: 'POST',
      body: form,
    })
    if (!res.ok || !res.daten?.doc?.id)
      throw new BildFehler(res.status === 413 ? 'gross' : 'typ', datei.name)
    return res.daten.doc.id
  }

  async function absenden(e: React.FormEvent) {
    e.preventDefault()
    if (!titel.trim() || !thema || !einleitung.trim() || !inhalt.trim()) {
      return setFehler(t.fehler.pflichtfelder)
    }
    setFehler('')

    const hochgeladen: string[] = []
    let titelbildId: string | undefined
    try {
      setStand('bilder')
      if (titelbild) {
        titelbildId = await hochladen(titelbild.datei)
        hochgeladen.push(titelbildId)
      }
      for (const g of galerie) hochgeladen.push(await hochladen(g.datei))
    } catch (err) {
      setStand('bereit')
      await aufraeumen(hochgeladen)
      if (err instanceof BildFehler) {
        return setFehler(
          err.art === 'gross'
            ? fuelle(t.fehler.bildGross, { datei: err.datei })
            : fuelle(t.fehler.bildHochladen, { datei: err.datei }),
        )
      }
      return setFehler(t.fehler.allgemein)
    }

    setStand('speichert')
    const res = await api<{ doc?: { slug: string } }>('/api/blog-beitraege', {
      method: 'POST',
      body: JSON.stringify({
        titel: titel.trim(),
        thema,
        einleitung: einleitung.trim(),
        inhalt: inhalt.trim(),
        titelbild: titelbildId,
        galerie: titelbildId ? hochgeladen.slice(1) : hochgeladen,
        schlagwoerter: schlagwoerter
          .split(',')
          .map((s) => s.trim().replace(/^#/, ''))
          .filter(Boolean)
          .slice(0, 8),
      }),
    })
    if (res.ok && res.daten?.doc?.slug) {
      window.location.assign(lokalisierterPfad(`/blog/${res.daten.doc.slug}`, sprache)!)
      return
    }
    await aufraeumen(hochgeladen)
    setStand('bereit')
    setFehler(t.fehler.allgemein)
  }

  // Schlägt das Speichern fehl, die schon hochgeladenen Bilder wieder löschen
  async function aufraeumen(ids: string[]) {
    await Promise.all(ids.map((id) => api(`/api/blog-bilder/${id}`, { method: 'DELETE' })))
  }

  function bildPruefen(datei: File) {
    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(datei.type)) {
      setFehler(t.fehler.bildTyp)
      return false
    }
    setFehler('')
    return true
  }

  const laeuft = stand !== 'bereit'

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <h1 className="headingB m-0 text-3xl text-yellow-400 md:text-4xl">{t.formular.titel}</h1>
      <p className="mt-3 font-sans text-sm text-zinc-400">{t.formular.einfuehrung}</p>

      <form onSubmit={absenden} className="mt-8 space-y-6">
        <Beschriftung text={t.formular.feldTitel}>
          <input
            className={feldKlasse}
            required
            maxLength={120}
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
          />
        </Beschriftung>

        <Beschriftung text={t.formular.feldThema}>
          <select
            className={feldKlasse}
            required
            value={thema}
            onChange={(e) => setThema(e.target.value)}
          >
            <option value="" disabled>
              {t.formular.themaWaehlen}
            </option>
            {themen.map((th) => (
              <option key={th.id} value={th.id}>
                {th.titel}
              </option>
            ))}
          </select>
        </Beschriftung>

        <Beschriftung text={t.formular.feldEinleitung} hinweis={t.formular.hinweisEinleitung}>
          <textarea
            className={`${feldKlasse} min-h-24`}
            required
            maxLength={400}
            value={einleitung}
            onChange={(e) => setEinleitung(e.target.value)}
          />
        </Beschriftung>

        {/* Titelbild: ein Bild mit großer Vorschau */}
        <div>
          <span className="mb-1 block font-sans text-sm font-semibold text-zinc-200">
            {t.formular.feldTitelbild}
          </span>
          {titelbild ? (
            <div className="relative overflow-hidden rounded-xl border border-zinc-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={titelbild.url} alt="" className="aspect-video w-full object-cover" />
              <EntfernenKnopf
                text={t.formular.bildEntfernen}
                onClick={() => {
                  URL.revokeObjectURL(titelbild.url)
                  setTitelbild(null)
                }}
              />
            </div>
          ) : (
            <BildWahl
              onWahl={(dateien) => {
                const d = dateien[0]
                if (d && bildPruefen(d)) setTitelbild(vorschau(d))
              }}
            />
          )}
          <span className="mt-1 block font-sans text-xs text-zinc-500">
            {t.formular.hinweisBilder}
          </span>
        </div>

        <Beschriftung text={t.formular.feldInhalt} hinweis={t.formular.hinweisInhalt}>
          <textarea
            className={`${feldKlasse} min-h-72`}
            required
            maxLength={20000}
            value={inhalt}
            onChange={(e) => setInhalt(e.target.value)}
          />
        </Beschriftung>

        {/* Galerie: mehrere Bilder als kleine Kacheln */}
        <div>
          <span className="mb-1 block font-sans text-sm font-semibold text-zinc-200">
            {t.formular.feldGalerie}
          </span>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {galerie.map((g, i) => (
              <div
                key={g.url}
                className="relative overflow-hidden rounded-lg border border-zinc-700"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.url} alt="" className="aspect-square w-full object-cover" />
                <EntfernenKnopf
                  text={t.formular.bildEntfernen}
                  onClick={() => {
                    URL.revokeObjectURL(g.url)
                    setGalerie((alt) => alt.filter((_, j) => j !== i))
                  }}
                />
              </div>
            ))}
            {galerie.length < MAX_GALERIE && (
              <BildWahl
                mehrere
                klein
                onWahl={(dateien) => {
                  const gueltig = dateien.filter(bildPruefen).slice(0, MAX_GALERIE - galerie.length)
                  setGalerie((alt) => [...alt, ...gueltig.map(vorschau)])
                }}
              />
            )}
          </div>
        </div>

        <Beschriftung text={t.formular.feldSchlagwoerter} hinweis={t.formular.hinweisSchlagwoerter}>
          <input
            className={feldKlasse}
            value={schlagwoerter}
            onChange={(e) => setSchlagwoerter(e.target.value)}
          />
        </Beschriftung>

        {fehler && <Meldung art="fehler">{fehler}</Meldung>}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={laeuft}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-6 py-2.5 font-sans font-semibold text-zinc-900 transition-colors hover:bg-yellow-400 disabled:opacity-60"
          >
            {laeuft && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {stand === 'bilder'
              ? t.formular.laedtBilder
              : stand === 'speichert'
                ? t.formular.speichert
                : t.formular.veroeffentlichen}
          </button>
          <Link
            href={lokalisierterPfad('/blog', sprache)!}
            className="font-sans text-sm text-zinc-400 hover:text-yellow-400"
          >
            {t.formular.abbrechen}
          </Link>
        </div>
      </form>
    </div>
  )
}

function BildWahl({
  onWahl,
  mehrere = false,
  klein = false,
}: {
  onWahl: (dateien: File[]) => void
  mehrere?: boolean
  klein?: boolean
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-600 text-zinc-400 transition-colors hover:border-yellow-500 hover:text-yellow-400 ${
        klein ? 'aspect-square' : 'aspect-video'
      }`}
    >
      <ImagePlus className={klein ? 'size-6' : 'size-10'} aria-hidden />
      <input
        type="file"
        accept={ANNEHMEN}
        multiple={mehrere}
        className="sr-only"
        onChange={(e) => {
          onWahl(Array.from(e.target.files ?? []))
          // Zurücksetzen, damit dieselbe Datei erneut gewählt werden kann
          e.target.value = ''
        }}
      />
    </label>
  )
}

function EntfernenKnopf({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={text}
      title={text}
      className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-red-600"
    >
      <X className="size-4" aria-hidden />
    </button>
  )
}
