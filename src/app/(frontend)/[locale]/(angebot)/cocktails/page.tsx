import { KategorieSeite } from '@/components/GetraenkekarteNew'
import { ladeKategorie } from '@/lib/getraenke'
import { spracheAusParams, type SprachParams } from '@/i18n/sprachen'
import { SEITEN } from '@/i18n/inhalte/seiten'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: SprachParams }) {
  const t = SEITEN[await spracheAusParams(params)].meta.cocktails
  return { title: t.titel, description: t.beschreibung }
}

export default async function Cocktails({ params }: { params: SprachParams }) {
  const items = await ladeKategorie('cocktails-longdrinks', await spracheAusParams(params))
  return <KategorieSeite kategorie="cocktails-longdrinks" items={items} />
}
