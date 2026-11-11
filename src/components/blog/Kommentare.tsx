'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { BLOG } from '@/i18n/inhalte/blog'
import { useSprache } from '@/i18n/SprachProvider'
import { lokalisierterPfad } from '@/i18n/sprachen'
import { api } from '@/lib/blog/api'
import { Meldung } from './KontoFormulare'

export type KommentarDaten = {
  id: string
  text: string
  autorName: string
  datum: string
  // Eigene Kommentare (oder alle fürs Team) dürfen gelöscht werden
  loeschbar: boolean
}

export function Kommentare({
  beitragId,
  kommentare,
}: {
  beitragId: string
  kommentare: KommentarDaten[]
}) {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const router = useRouter()
  const [text, setText] = useState('')
  const [laeuft, setLaeuft] = useState(false)
  const [fehler, setFehler] = useState('')

  async function senden(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setLaeuft(true)
    setFehler('')
    const res = await api('/api/blog-kommentare', {
      method: 'POST',
      body: JSON.stringify({ beitrag: beitragId, text: text.trim() }),
    })
    setLaeuft(false)
    if (!res.ok) return setFehler(t.fehler.allgemein)
    setText('')
    // Server-Seite neu laden, damit der Kommentar in der Liste erscheint
    router.refresh()
  }

  async function loeschen(id: string) {
    if (!window.confirm(t.kommentare.loeschenFrage)) return
    const res = await api(`/api/blog-kommentare/${id}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
    else setFehler(t.fehler.allgemein)
  }

  return (
    <section className="mt-14 border-t border-zinc-800 pt-10" aria-labelledby="kommentare-titel">
      <h2 id="kommentare-titel" className="headingB m-0 text-2xl text-yellow-400">
        {t.kommentare.titel} ({kommentare.length})
      </h2>

      {kommentare.length === 0 ? (
        <p className="mt-4 font-sans text-zinc-500">{t.kommentare.leer}</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {kommentare.map((k) => (
            <li key={k.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="m-0 font-sans text-sm">
                  <span className="font-semibold text-zinc-100">{k.autorName}</span>
                  <span className="text-zinc-500"> · {k.datum}</span>
                </p>
                {k.loeschbar && (
                  <button
                    type="button"
                    onClick={() => loeschen(k.id)}
                    className="inline-flex items-center gap-1 font-sans text-xs text-zinc-500 hover:text-red-400"
                  >
                    <Trash2 className="size-3.5" aria-hidden /> {t.kommentare.loeschen}
                  </button>
                )}
              </div>
              <p className="m-0 mt-2 font-sans whitespace-pre-line text-zinc-300">{k.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={senden} className="mt-8 space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.kommentare.platzhalter}
          aria-label={t.kommentare.platzhalter}
          maxLength={2000}
          required
          className="min-h-28 w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 font-sans text-base text-zinc-100 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
        />
        {fehler && <Meldung art="fehler">{fehler}</Meldung>}
        <button
          type="submit"
          disabled={laeuft}
          className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-2 font-sans font-semibold text-zinc-900 hover:bg-yellow-400 disabled:opacity-60"
        >
          {laeuft && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {t.kommentare.senden}
        </button>
      </form>
    </section>
  )
}

// Löscht den eigenen Beitrag nach Rückfrage und kehrt zur Übersicht zurück
export function BeitragLoeschen({ beitragId }: { beitragId: string }) {
  const { sprache } = useSprache()
  const t = BLOG[sprache]
  const [laeuft, setLaeuft] = useState(false)
  return (
    <button
      type="button"
      disabled={laeuft}
      onClick={async () => {
        if (!window.confirm(t.beitrag.loeschenFrage)) return
        setLaeuft(true)
        const res = await api(`/api/blog-beitraege/${beitragId}`, { method: 'DELETE' })
        if (res.ok) window.location.assign(lokalisierterPfad('/blog', sprache)!)
        else setLaeuft(false)
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-1.5 font-sans text-sm text-red-300 hover:bg-red-950/50 disabled:opacity-50"
    >
      <Trash2 className="size-4" aria-hidden />
      {t.beitrag.loeschen}
    </button>
  )
}
