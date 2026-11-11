import Link from 'next/link'
import { PenLine } from 'lucide-react'
import { BLOG } from '@/i18n/inhalte/blog'
import { lokalisierterPfad, type SprachCode } from '@/i18n/sprachen'
import { AbmeldenKnopf } from './AbmeldenKnopf'

// Gemeinsamer Kopf aller Blog-Seiten: Titel, Untertitel und – wenn angemeldet –
// eine Leiste mit Name, „Beitrag schreiben“ und „Abmelden“
export function BlogRahmen({
  sprache,
  nutzerName,
  kompakt = false,
  children,
}: {
  sprache: SprachCode
  nutzerName?: string | null
  // Auf Beitrags- und Formularseiten nur die Leiste, ohne großen Titel
  kompakt?: boolean
  children: React.ReactNode
}) {
  const t = BLOG[sprache]
  return (
    <div className="min-h-screen bg-[#0d1117] text-zinc-200">
      {!kompakt && (
        <header className="border-b border-zinc-800 bg-[#1a252d]/80">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-yellow-500/80">
              {t.kopf.oberzeile}
            </p>
            <h1 className="headingA m-0 mt-3 text-4xl font-normal! text-yellow-500 md:text-6xl">
              {t.kopf.titel}
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-zinc-300">{t.kopf.untertitel}</p>
          </div>
        </header>
      )}

      {nutzerName && (
        <div className="border-b border-zinc-800 bg-zinc-900/70">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
            <p className="m-0 font-sans text-sm text-zinc-400">
              {t.leiste.angemeldetAls} <span className="text-zinc-100">{nutzerName}</span>
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={lokalisierterPfad('/blog/neu', sprache)!}
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-1.5 font-sans text-sm font-semibold text-zinc-900 transition-colors hover:bg-yellow-400"
              >
                <PenLine className="size-4" aria-hidden />
                {t.leiste.schreiben}
              </Link>
              <AbmeldenKnopf
                text={t.leiste.abmelden}
                ziel={lokalisierterPfad('/blog/anmelden', sprache)!}
              />
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
