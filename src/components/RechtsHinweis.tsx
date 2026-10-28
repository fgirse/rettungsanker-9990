import { Info } from 'lucide-react'
import type { SprachCode } from '@/i18n/sprachen'
import { SEITEN } from '@/i18n/inhalte/seiten'

// Hinweis über Impressum und Datenschutz in den Fremdsprachen:
// Der Rechtstext bleibt deutsch, weil nur die deutsche Fassung verbindlich ist.
export function RechtsHinweis({ sprache }: { sprache: SprachCode }) {
  const hinweis = SEITEN[sprache].recht.hinweis
  if (!hinweis) return null

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
      <p className="flex items-start gap-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 font-sans text-sm text-yellow-100">
        <Info className="mt-0.5 size-5 shrink-0 text-yellow-400" />
        {hinweis}
      </p>
    </div>
  )
}
