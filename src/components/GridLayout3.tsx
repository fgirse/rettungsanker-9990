import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import { getPayload, type CollectionSlug } from 'payload'
import config from '@payload-config'
import { lokalisierterPfad, type SprachCode } from '@/i18n/sprachen'
import { START, type StartTexte } from '@/i18n/inhalte/start'

type BentoRichText = {
  root: {
    type: string
    children: { [k: string]: unknown }[]
    direction: 'ltr' | 'rtl' | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
}

interface BentoItem {
  id: string
  title: string
  content: BentoRichText | string
  imageSrc: string
  imageAlt: string
  isMain?: boolean
  buttonLabel?: string
  buttonHref?: string
}

type BentoFieldKeys = {
  titleKey: keyof BentoGridDoc
  contentKey: keyof BentoGridDoc
}

type BentoGridDoc = {
  id?: string
  title_biere?: string
  content_biere?: BentoRichText
  title_weine?: string
  content_weine?: BentoRichText
  title_cocktails?: string
  content_cocktails?: BentoRichText
  title_fussball?: string
  content_fussball?: BentoRichText
  title_events?: string
  content_events?: BentoRichText
  title_albers?: string
  content_albers?: BentoRichText
  title_logoNeu?: string
  content_logoNeu?: BentoRichText
}

// Bilder und Layout bleiben hier; Titel, Text und Bildbeschreibung kommen je Sprache aus START.
// Sind im CMS (Sammlung „bentogrid“) Texte gepflegt, haben diese Vorrang.
const bentoItems: (Omit<BentoItem, 'title' | 'content' | 'imageAlt' | 'buttonLabel'> &
  BentoFieldKeys & { schluessel: keyof StartTexte['bento']['kacheln'] })[] = [
  {
    id: 'bier',
    schluessel: 'bier',
    imageSrc: '/Assets/Img/image.png',
    isMain: true,
    titleKey: 'title_biere',
    contentKey: 'content_biere',
  },
  {
    id: 'weine',
    schluessel: 'weine',
    imageSrc: '/Assets/Img/bottles04.png',
    titleKey: 'title_weine',
    contentKey: 'content_weine',
  },
  {
    id: 'cocktails',
    schluessel: 'cocktails',
    imageSrc: '/Assets/Img/cocktails.png',
    titleKey: 'title_cocktails',
    contentKey: 'content_cocktails',
  },
  {
    id: 'fussball',
    schluessel: 'fussball',
    imageSrc: '/Assets/Img/Fussball2.png',
    isMain: true,
    buttonHref: '/#section-contact',
    titleKey: 'title_fussball',
    contentKey: 'content_fussball',
  },
  {
    id: 'party',
    schluessel: 'party',
    imageSrc: '/Assets/Img/Crowdparty2.png',
    titleKey: 'title_events',
    contentKey: 'content_events',
  },
  {
    id: 'albers',
    schluessel: 'albers',
    imageSrc: '/Assets/Img/Albers_Illu_white.png',
    titleKey: 'title_albers',
    contentKey: 'content_albers',
  },
  {
    id: 'logoNeu',
    schluessel: 'logoNeu',
    imageSrc: '/Assets/Img/LogoNeu.png',
    titleKey: 'title_logoNeu',
    contentKey: 'content_logoNeu',
  },
]

function BentoCard({
  item,
  highlight,
  className,
}: {
  item: BentoItem
  highlight: string
  className?: string
}) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-xl',
        item.isMain
          ? 'bg-amber-400 border-amber-400 border-2 ring-2 ring-amber-200'
          : 'bg-stone-900 ',
        className,
      )}
    >
      {item.isMain && (
        <Badge className="absolute top-3 right-3 z-10 bg-red-700 text-white hover:bg-amber-700">
          {highlight}
        </Badge>
      )}
      <div className="relative  w-full h-40 md:h-48 lg:h-52 overflow-hidden">
        <Image
          src={item.imageSrc || '/placeholder.svg'}
          alt={item.imageAlt}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className={cn('pb-2', item.isMain ? 'bg-amber-400' : '')}>
        <CardTitle
          className={cn(
            'text-center text-2xl md:text-2xl headingA ',
            item.isMain ? 'text-slate-600' : ' text-yellow-600',
          )}
        >
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(item.isMain ? 'bg-amber-400' : '')}>
        <CardDescription
          className={cn(
            'font-sans text-lg md:text-base lg:text-[1.33rem] leading-relaxed',
            item.isMain ? 'text-amber-50' : 'text-white',
          )}
        >
          {typeof item.content === 'string' ? (
            <p>{item.content}</p>
          ) : (
            <RichText
              data={item.content as unknown as SerializedEditorState<SerializedLexicalNode>}
            />
          )}
        </CardDescription>
        {item.buttonLabel && item.buttonHref && (
          <a
            href={item.buttonHref}
            className="mt-4 inline-block rounded-md bg-red-700 px-6 py-2 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            {item.buttonLabel}
          </a>
        )}
      </CardContent>
    </Card>
  )
}

export default async function BenroGrid({ sprache }: { sprache: SprachCode }) {
  const t = START[sprache].bento
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'bentogrid' as CollectionSlug,
    limit: 1,
    locale: sprache,
  })

  const bentoDoc = docs?.[0] as BentoGridDoc | undefined
  const items: BentoItem[] = bentoItems.map((item) => {
    const kachel: { title: string; content: string; imageAlt: string; buttonLabel?: string } =
      t.kacheln[item.schluessel]
    return {
      ...item,
      title: (bentoDoc?.[item.titleKey] as string | undefined) ?? kachel.title,
      content: (bentoDoc?.[item.contentKey] as BentoRichText | undefined) ?? kachel.content,
      imageAlt: kachel.imageAlt,
      buttonLabel: kachel.buttonLabel,
      buttonHref: lokalisierterPfad(item.buttonHref, sprache),
    }
  })

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-y-12 mb-10 md:mb-14">
          {/* Auf schmalen Handys skaliert die Schrift mit der Breite, sonst ragt das längste Wort
              (nicht umbrechbar) über den Rand und erzeugt eine seitliche Scrollleiste.
              leading-none ersetzt die Zeilenhöhe, die text-5xl vorher mitgebracht hat. */}
          <p className=" text-center text-[clamp(2rem,11vw,3rem)] leading-none headingA md:text-7xl lg:text-[6rem] font-bold text-yellow-500 ">
            {t.philosophie}
          </p>
          <p className="mt-20 mb-24 text-4xl headingA md:text-4xl lg:text-[5rem] font-bold text-slate-700 text-balance">
            {t.angebot}
          </p>
          <p className=" text-center font-sans text-muted-foreground text-lg md:text-2xl lg:text-[2rem] max-w-2xl mx-auto text-pretty">
            {t.einleitung}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Bier vom Fass - Main item, larger on desktop */}
          <BentoCard item={items[0]} highlight={t.highlight} className="md:col-span-1 lg:col-span-1 lg:row-span-1" />

          {/* Regionale Weine */}
          <BentoCard item={items[1]} highlight={t.highlight} className="md:col-span-1 lg:col-span-1" />

          {/* Cocktails & Longdrinks */}
          <BentoCard item={items[2]} highlight={t.highlight} className="md:col-span-1 lg:col-span-1" />

          {/* Fußball Live-TV - Main item */}
          <BentoCard item={items[3]} highlight={t.highlight} className="md:col-span-1 lg:col-span-1" />

          {/* Party & Events */}
          <BentoCard item={items[4]} highlight={t.highlight} className="md:col-span-1 lg:col-span-1" />

          {/* Hans Albers – im 2-Spalten-Raster neben „Party & Events“, sonst bliebe dort eine Lücke */}
          <BentoCard item={items[5]} highlight={t.highlight} className="md:col-span-1 lg:col-span-1" />

          {/* Logo Neu */}
          <BentoCard item={items[6]} highlight={t.highlight} className="md:col-span-2 lg:col-span-3" />
        </div>
      </div>
    </section>
  )
}
