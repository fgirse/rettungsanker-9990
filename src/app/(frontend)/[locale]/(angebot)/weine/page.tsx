import { KategorieSeite } from '@/components/GetraenkekarteNew'
import { ladeKategorie } from '@/lib/getraenke'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Weine – Rettungsanker Freiburg',
  description: 'Regionale Weine im Rettungsanker Freiburg.',
}

export default async function Weine() {
  const items = await ladeKategorie('weine')
  return <KategorieSeite kategorie="weine" items={items} />
}
