import LiveTV from '@/components/LiveTV'

export const metadata = {
  title: 'Fußball live – Rettungsanker Freiburg',
  description: 'SC Freiburg, Europa League und große Turniere live im Rettungsanker.',
}

// Gleicher Bereich wie auf der Startseite, inkl. aktueller Bundesliga-Tabelle im Laufband
export default function Fussball() {
  return (
    <div className="bg-slate-950 pb-16">
      <LiveTV />
    </div>
  )
}
