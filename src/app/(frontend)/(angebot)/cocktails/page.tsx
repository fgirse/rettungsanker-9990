import { KategorieSeite } from '@/components/GetraenkekarteNew'
import { ladeKategorie } from '@/lib/getraenke'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Cocktails & Longdrinks – Rettungsanker Freiburg',
  description: 'Cocktails und Longdrinks im Rettungsanker Freiburg.',
}

export default async function Cocktails() {
  const items = await ladeKategorie('cocktails-longdrinks')
  return <KategorieSeite kategorie="cocktails-longdrinks" items={items} />
}
