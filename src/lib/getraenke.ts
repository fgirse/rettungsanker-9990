import { getPayload } from 'payload'
import config from '@payload-config'
import type { Kategorie, MenuItem } from '@/components/GetraenkekarteNew'
import type { SprachCode } from '@/i18n/sprachen'

// Lädt alle Einträge einer Rubrik aus der Payload-Sammlung „getraenkekarte“ in der gewünschten Sprache
export async function ladeKategorie(kategorie: Kategorie, locale: SprachCode): Promise<MenuItem[]> {
  const payload = await getPayload({ config })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (payload.find as any)({
    collection: 'getraenkekarte',
    where: { kategorie: { equals: kategorie } },
    sort: 'sortierung',
    limit: 200,
    pagination: false,
    locale,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result.docs.map((doc: any) => ({
    id: String(doc.id),
    kategorie: doc.kategorie,
    artikel: doc.artikel,
    beschreibung: doc.beschreibung ?? null,
    volumen: doc.volumen ?? null,
    preis: doc.preis,
    sortierung: doc.sortierung ?? null,
  }))
}
