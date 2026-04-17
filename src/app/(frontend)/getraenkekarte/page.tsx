import { getPayload } from 'payload'
import config from '@payload-config'
import GetraenkekarteComponent, { type MenuItem, type Kategorie } from '@/components/Getraenkekarte'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Getränkekarte – Rettungsanker Freiburg',
  description: 'Unsere Biere, Weine, Cocktails, Softdrinks, Kaffee & Snacks.',
}

// Raw document shape — matches the Getraenkekarte collection fields.
// Replace with the generated Payload type once `payload generate:types` is run.
type GetraenkekarteDoc = {
  id: string | number
  kategorie: Kategorie
  artikel: string
  beschreibung?: string | null
  volumen?: string | null
  preis: string
  sortierung?: number | null
}

export default async function GetraenkekartePage() {
  const payload = await getPayload({ config })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (payload.find as any)({
    collection: 'getraenkekarte',
    sort: 'sortierung',
    limit: 500,
    pagination: false,
  })

  const items: MenuItem[] = (result.docs as GetraenkekarteDoc[]).map((doc) => ({
    id: String(doc.id),
    kategorie: doc.kategorie,
    artikel: doc.artikel,
    beschreibung: doc.beschreibung ?? null,
    volumen: doc.volumen ?? null,
    preis: doc.preis,
    sortierung: doc.sortierung ?? null,
  }))

  return <GetraenkekarteComponent items={items} />
}
