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
import { lokalisierterPfad, SPRACH_CODES, spracheAusParams, type SprachParams } from '@/i18n/sprachen'

export const dynamic = 'force-dynamic'

// Sagt Suchmaschinen, unter welcher Adresse es die Startseite in den anderen Sprachen gibt
export const metadata = {
  alternates: {
    languages: Object.fromEntries(SPRACH_CODES.map((code) => [code, lokalisierterPfad('/', code)!])),
  },
}

export default async function Home({ params }: { params: SprachParams }) {
  const sprache = await spracheAusParams(params)
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'getraenkekarte',
    sort: 'sortierung',
    limit: 500,
    pagination: false,
    overrideAccess: false,
    locale: sprache,
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
      <HeroSection sprache={sprache} />
      <Marquee />
      <About sprache={sprache} />
      <Bento sprache={sprache} />
      <LiveTV sprache={sprache} />
      <Getraenkekarte items={items} />
      <Photogallery />
      <Team sprache={sprache} />
      <ContactSection sprache={sprache} />
      <Wohin />
    </>
  )
}
