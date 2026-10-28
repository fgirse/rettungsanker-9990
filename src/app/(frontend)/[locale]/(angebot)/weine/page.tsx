import { KategorieSeite } from '@/components/GetraenkekarteNew'
import { ladeKategorie } from '@/lib/getraenke'
import { spracheAusParams, type SprachParams } from '@/i18n/sprachen'
import { SEITEN } from '@/i18n/inhalte/seiten'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: SprachParams }) {
  const t = SEITEN[await spracheAusParams(params)].meta.weine
  return { title: t.titel, description: t.beschreibung }
}

export default async function Weine({ params }: { params: SprachParams }) {
  const items = await ladeKategorie('weine', await spracheAusParams(params))
  return <KategorieSeite kategorie="weine" items={items} />
}
