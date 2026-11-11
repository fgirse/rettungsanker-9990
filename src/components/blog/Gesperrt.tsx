import Link from 'next/link'
import { Lock } from 'lucide-react'
import { BLOG } from '@/i18n/inhalte/blog'
import { lokalisierterPfad, type SprachCode } from '@/i18n/sprachen'

// Hinweis für nicht angemeldete Besucher: der Blog ist nur für registrierte Mitglieder
export function Gesperrt({ sprache }: { sprache: SprachCode }) {
  const t = BLOG[sprache].gesperrt
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-2xl border border-zinc-700/50 bg-zinc-900/60 p-8 text-center">
        <Lock className="mx-auto size-10 text-yellow-500" aria-hidden />
        <h2 className="headingB mt-4 text-2xl text-yellow-400">{t.titel}</h2>
        <p className="mt-3 font-sans text-zinc-300">{t.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={lokalisierterPfad('/blog/anmelden', sprache)!}
            className="rounded-lg bg-yellow-500 px-6 py-2 font-sans font-semibold text-zinc-900 hover:bg-yellow-400"
          >
            {t.anmelden}
          </Link>
          <Link
            href={lokalisierterPfad('/blog/registrieren', sprache)!}
            className="rounded-lg border border-zinc-600 px-6 py-2 font-sans text-zinc-200 hover:border-yellow-500 hover:text-yellow-400"
          >
            {t.registrieren}
          </Link>
        </div>
      </div>
    </div>
  )
}
