import HeroSection from '@/components/Hero'
//import Marquee from '@/components/Marquee';
import About from '@/components/About'
import Photogallery from '@/components/PhotoGallery'
import Bento from '@/components/GridLayout3'
import Marquee from '@/components/Marquee'
import Wohin from '@/components/wohin'
import Team from '@/components/Team'
import Getraenkekarte, { type Kategorie, type MenuItem } from '@/components/Getraenkekarte'
import { getPayload } from 'payload'
import config from '@payload-config'
import LiveTV from "@/components/LiveTV";

export const dynamic = 'force-dynamic'

type GetraenkekarteDoc = {
  id: string | number
  kategorie: Kategorie
  artikel: string
  beschreibung?: string | null
  volumen?: string | null
  preis: string
  sortierung?: number | null
}

export default async function Home() {
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

  return (
    <>
      <HeroSection />
      <Marquee />
      <About />
      <Bento />
      <LiveTV />
      <Getraenkekarte items={items} />
      <Photogallery />
      <Team />
      <Wohin />
    </>
  )
}
