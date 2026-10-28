import LiveTV from '@/components/LiveTV'
import { spracheAusParams, type SprachParams } from '@/i18n/sprachen'
import { SEITEN } from '@/i18n/inhalte/seiten'

export async function generateMetadata({ params }: { params: SprachParams }) {
  const t = SEITEN[await spracheAusParams(params)].meta.fussball
  return { title: t.titel, description: t.beschreibung }
}

// Gleicher Bereich wie auf der Startseite, inkl. aktueller Bundesliga-Tabelle im Laufband
export default async function Fussball({ params }: { params: SprachParams }) {
  const sprache = await spracheAusParams(params)
  return (
    <div className="bg-slate-950 pb-16">
      <LiveTV sprache={sprache} />
    </div>
  )
}
