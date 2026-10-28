import HeroSection from '@/components/Hero'
//import Marquee from '@/components/Marquee';
import About from '@/components/About'
import Photogallery from '@/components/PhotoGallery'
import Bento from '@/components/GridLayout3'
import Marquee from '@/components/Marquee'
import Wohin from '@/components/wohin'
import Team from '@/components/Team'
import ContactSection from '@/components/ContactSection'
import Getraenkekarte, { type MenuItem } from '@/components/GetraenkekarteNew'
import { getPayload } from 'payload'
import config from '@payload-config'
import LiveTV from '@/components/LiveTV'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'getraenkekarte',
    sort: 'sortierung',
    limit: 500,
    pagination: false,
    overrideAccess: false,
  })

  const items: MenuItem[] = result.docs.map((doc) => ({
    id: String(doc.id),
    kategorie: doc.kategorie as MenuItem['kategorie'],
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
      <ContactSection />
      <Wohin />
    </>
  )
}
