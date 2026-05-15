'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import Fassbier from '../../public/Assets/Img/01_fassbier.png';
import Flaschenpost from '../../public/Assets/Img/02_flaschenpost.png';
import LogoNeu from '../../public/Assets/SVG/LogoNeu.svg';
import Weine from '../../public/Assets/Img/03_weine.png';
import CocktailsLongdrinks from '../../public/Assets/Img/04_cocktails_longdrinks.png';
import KurzeBraende from '../../public/Assets/Img/05_kurze_braende.png';
import Softgetränke from '../../public/Assets/Img/06_softdrinks.png';
import CoffeeCup from '../../public/Assets/Img/07_kaffee_tee.png';
import Snacks from '../../public/Assets/Img/08_snacks.png';

// ── Types ──────────────────────────────────────────────────────────────────────

export type Kategorie =
  | 'biere_vom_fass'
  | 'biere_in_flaschen'
  | 'weine'
  | 'cocktails-longdrinks'
  | 'kurze-brände'
  | 'softdrinks'
  | 'kaffee-tee'
  | 'snacks'

export interface MenuItem {
  id: string
  kategorie: Kategorie
  artikel: string
  beschreibung?: string | null
  volumen?: string | null
  preis: string
  sortierung?: number | null
}

// ── Hand-drawn SVG Illustrations ──────────────────────────────────────────────

const _Fassbier = ({ className }: { className?: string }) => (
  <Image src={Fassbier} alt="Illustration/Fassbier" width={80} height={80} className={className} />
)
const _Flaschenpost = ({ className }: { className?: string }) => (
  <Image src={Flaschenpost} alt="Illustration/Flaschenpost" width={80} height={80} className={className} />
)


const _Weine = ({ className }: { className?: string }) => (
  <Image src={Weine} alt="Illustration/Weine" width={80} height={80} className={className} />
)

const _CocktailsLongdrinks = ({ className }: { className?: string }) => (
  <Image src={CocktailsLongdrinks} alt="Illustration/Cocktails & Longdrinks" width={80} height={80} className={className} />
)

const _KurzeBraende = ({ className }: { className?: string }) => (
  <Image src={KurzeBraende} alt="Illustration/Kurze & Brände" width={80} height={80} className={className} />
)

const _Softdrinks = ({ className }: { className?: string }) => (
  <Image src={Softgetränke} alt="Illustration/Softdrinks" width={80} height={80} className={className} />
)

const _CoffeeCup = ({ className }: { className?: string }) => (
<Image src={CoffeeCup} alt="Illustration/Coffee Cup" width={80} height={80} className={className} />  
)

const _Snacks = ({ className }: { className?: string }) => (
<Image src={Snacks} alt="Illustration/Snacks" width={80} height={80} className={className} />
)

// ── Category Config ────────────────────────────────────────────────────────────

interface CategoryConfig {
  id: Kategorie
  label: string
  emoji: string
  tagline: string
  colorClass: string
  sectionBg: string
  borderColor: string
  badgeClass: string
  priceColor: string
  dotColor: string
  illustrationColor: string
  Illustration: React.ComponentType<{ className?: string }>
  rotation: string
  headerPattern: string
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'biere_vom_fass' as Kategorie,
    label: 'Biere vom Fass ',
    emoji: '🍺',
    tagline: 'Frisch gezapft & nordisch herb',
    colorClass: 'text-yellow-600',
    sectionBg: 'bg-gradient-to-br from-yellow-950/70 via-yellow-900/40 to-slate-900/80',
    borderColor: 'border-yellow-500/30',
    badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    priceColor: 'text-yellow-600',
    dotColor: 'bg-amber-500',
    illustrationColor: 'text-yellow-600',
    Illustration: _Fassbier,
    rotation: '-rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(245,158,11,0.04) 8px, rgba(245,158,11,0.04) 9px)',
  },
  {
    id: 'biere_in_flaschen' as Kategorie,
    label: 'Flaschenpost',
    emoji: '🍻',
    tagline: 'vielfältig & für jeden Geschmack',
    colorClass: 'text-yellow-500',
    sectionBg: 'bg-gradient-to-br from-yellow-500/70 via-yellow-500/40 to-slate-900/80',
    borderColor: 'border-yellow-500/30',
    badgeClass: 'bg-amber-500/15 text-yellow-500 border border-yellow-500/25',
    priceColor: 'text-yellow-500',
    dotColor: 'bg-yellow-500',
    illustrationColor: 'text-yellow-500',
    Illustration: _Flaschenpost,
    rotation: '-rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(245,158,11,0.04) 8px, rgba(245,158,11,0.04) 9px)',
  },
  {
    id: 'weine' as Kategorie,
    label: 'Weine',
    emoji: '🍷',
    tagline: 'Regional & handverlesen',
    colorClass: 'text-rose-400',
    sectionBg: 'bg-gradient-to-br from-rose-950/70 via-rose-900/40 to-slate-900/80',
    borderColor: 'border-rose-500/30',
    badgeClass: 'bg-rose-500/15 text-rose-300 border border-rose-500/25',
    priceColor: 'text-rose-400',
    dotColor: 'bg-rose-500',
    illustrationColor: 'text-rose-400',
    Illustration: _Weine,
    rotation: 'rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(244,63,94,0.04) 8px, rgba(244,63,94,0.04) 9px)',
  },
  {
    id: 'cocktails-longdrinks' as Kategorie,
    label: 'Cocktails & Longdrinks',
    emoji: '🍹',
    tagline: 'Gemixt mit Liebe & einer Prise Wahnsinn',
    colorClass: 'text-fuchsia-400',
    sectionBg: 'bg-gradient-to-br from-fuchsia-950/70 via-purple-900/40 to-slate-900/80',
    borderColor: 'border-fuchsia-500/30',
    badgeClass: 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/25',
    priceColor: 'text-fuchsia-400',
    dotColor: 'bg-fuchsia-500',
    illustrationColor: 'text-fuchsia-400',
    Illustration: _CocktailsLongdrinks,
    rotation: '-rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(217,70,239,0.04) 8px, rgba(217,70,239,0.04) 9px)',
  },
  {
    id: 'kurze-brände' as Kategorie,
    label: 'Kurze & Brände',
    emoji: '🥃',
    tagline: 'Phantasie & Klassiker die es in sich haben',
    colorClass: 'text-fuchsia-400',
    sectionBg: 'bg-gradient-to-br from-fuchsia-950/70 via-purple-900/40 to-slate-900/80',
    borderColor: 'border-fuchsia-500/30',
    badgeClass: 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/25',
    priceColor: 'text-fuchsia-400',
    dotColor: 'bg-fuchsia-500',
    illustrationColor: 'text-fuchsia-400',
    Illustration: _KurzeBraende,
    rotation: '-rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(217,70,239,0.04) 8px, rgba(217,70,239,0.04) 9px)',
  },
  {
    id: 'softdrinks' as Kategorie,
    label: 'Softdrinks',
    emoji: '🥤',
    tagline: 'Cool bleiben!',
    colorClass: 'text-cyan-400',
    sectionBg: 'bg-gradient-to-br from-cyan-950/70 via-blue-900/40 to-slate-900/80',
    borderColor: 'border-cyan-500/30',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
    priceColor: 'text-cyan-400',
    dotColor: 'bg-cyan-500',
    illustrationColor: 'text-cyan-400',
    Illustration: _Softdrinks,
    rotation: 'rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(34,211,238,0.04) 8px, rgba(34,211,238,0.04) 9px)',
  },
  {
    id: 'kaffee-tee' as Kategorie,
    label: 'Kaffee & Tee',
    emoji: '☕',
    tagline: 'Warm ums Herz',
    colorClass: 'text-orange-400',
    sectionBg: 'bg-gradient-to-br from-orange-950/70 via-amber-900/40 to-slate-900/80',
    borderColor: 'border-orange-500/30',
    badgeClass: 'bg-orange-500/15 text-orange-300 border border-orange-500/25',
    priceColor: 'text-orange-400',
    dotColor: 'bg-orange-500',
    illustrationColor: 'text-orange-400',
    Illustration: _CoffeeCup,
    rotation: '-rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(251,146,60,0.04) 8px, rgba(251,146,60,0.04) 9px)',
  },
  {
    id: 'snacks' as Kategorie,
    label: 'Snacks',
    emoji: '🥨',
    tagline: 'Klein aber oho',
    colorClass: 'text-lime-400',
    sectionBg: 'bg-gradient-to-br from-lime-950/70 via-green-900/40 to-slate-900/80',
    borderColor: 'border-lime-500/30',
    badgeClass: 'bg-lime-500/15 text-lime-300 border border-lime-500/25',
    priceColor: 'text-lime-400',
    dotColor: 'bg-lime-500',
    illustrationColor: 'text-lime-400',
    Illustration: _Snacks,
    rotation: 'rotate-1',
    headerPattern:
      'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(163,230,53,0.04) 8px, rgba(163,230,53,0.04) 9px)',
  },
]

// ── Static values hoisted outside component (rendering-hoist-jsx) ─────────────

const FONT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-sans, "Architects Daughter", cursive)',
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function GetraenkekarteComponent({ items }: { items: MenuItem[] }) {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const byCategory = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = items
        .filter((item) => item.kategorie === cat.id)
        .sort((a, b) => (a.sortierung ?? 99) - (b.sortierung ?? 99))
      return acc
    },
    {} as Record<Kategorie, MenuItem[]>,
  )

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div id="section-getraenkekarte" className="min-h-screen text-white" style={FONT_STYLE}>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950">
        {/* Chalk-grid background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          {/* Wobbly title badge */}

          <div className="inline-block mb-6 px-6 py-2 rounded-full border border-white/30 bg-white/5 text-sm tracking-widest text-gray-400 uppercase">
            Rettungsanker Freiburg
          </div>
          <h1 className="headingA text-6xl md:text-8xl lg:text-9xl leading-none mb-6 bg-linear-to-br from-white via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Getränke&shy;karte
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-xl mx-auto mb-10 text-center">
            Was darf&apos;s sein? Wir haben für jeden Durst das Richtige.
          </p>

          {/* Category quick-links */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg ${cat.badgeClass} cursor-pointer`}
              >
                <span className="mr-1.5">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Category Nav ───────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/5 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-150 hover:bg-white/10 cursor-pointer ${cat.colorClass}`}
              >
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Category Sections ─────────────────────────────────────────────────── */}
      <div className="bg-slate-950">
        {Array.from({ length: Math.ceil(CATEGORIES.length / 2) }, (_, i) =>
          CATEGORIES.slice(i * 2, i * 2 + 2),
        ).map((pair, pairIndex) => (
          <div
            key={pairIndex}
            className="md:grid md:grid-cols-2 md:divide-x md:divide-white/5 border-b border-white/5"
          >
            {pair.map((cat) => {
              const catItems = byCategory[cat.id] ?? []
              const { Illustration } = cat

              return (
                <section
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  ref={(el) => {
                    sectionRefs.current[cat.id] = el
                  }}
                  className={`relative overflow-hidden ${cat.sectionBg}`}
                >
                  {/* Subtle diagonal pattern overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: cat.headerPattern }}
                  />

                  <div className="relative px-4 py-14 md:py-6">
                    {/* Section header */}
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-4">
                      {/* Illustration circle */}
                      <div
                        className={`shrink-0 w-36 h-36 md:w-20 md:h-20 rounded-full flex items-center justify-center ${cat.illustrationColor} border-2 ${cat.borderColor} bg-black/20 shadow-2xl ${cat.rotation}`}
                        style={{ filter: 'drop-shadow(0 0 24px currentColor)' }}
                      >
                        <Illustration className="w-20 h-20 md:w-60 md:h-60 rounded-xl " />
                      </div>

                      {/* Title block */}
                      <div className="text-center md:text-left">
                        <h2
                          className={`text-4xl md:text-2xl lg:text-3xl font-bold ${cat.colorClass} leading-tight`}
                        >
                          {cat.label}
                        </h2>
                        <p className="text-gray-400 mt-1 text-lg md:text-xs italic">
                          {cat.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    {catItems.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-gray-600 text-lg italic">
                          Demnächst verfügbar — schau bald wieder vorbei! {cat.emoji}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 md:space-y-1">
                        {catItems.map((item, i) => (
                          <div
                            key={item.id}
                            className={`group relative flex items-start gap-3 p-4 md:p-2.5 rounded-xl border ${cat.borderColor} bg-black/20 hover:bg-black/35 transition-all duration-200 hover:-translate-y-0.5`}
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            {/* Left dot */}
                            <div
                              className={`shrink-0 w-2 h-2 rounded-full mt-2 ${cat.dotColor} opacity-70`}
                            />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                <h3 className="text-lg md:text-sm font-bold text-white leading-tight">
                                  {item.artikel}
                                </h3>
                                {item.volumen && (
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${cat.badgeClass}`}
                                  >
                                    {item.volumen}
                                  </span>
                                )}
                              </div>
                              {item.beschreibung && (
                                <p className="text-gray-400 text-sm md:text-xs mt-1 md:mt-0 leading-relaxed italic">
                                  {item.beschreibung}
                                </p>
                              )}
                            </div>

                            {/* Price */}
                            <div className="shrink-0 text-right">
                              <div
                                className={`text-2xl md:text-base font-bold ${cat.priceColor} leading-none`}
                              >
                                {item.preis}
                              </div>
                              <div className="text-gray-500 text-xs mt-0.5">€</div>
                            </div>

                            {/* Hover accent line */}
                            <div
                              className={`absolute inset-y-0 left-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${cat.dotColor}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        ))}
      </div>

       {/* ── Footer ── */}
      <footer className="mt-12 border-t py-8 px-4" style={{ borderColor: 'oklch(0.2 0.03 260)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="gold-divider max-w-xs mx-auto mb-5">
            <Image src={LogoNeu} alt="Logo Neu"className="w-4 h-4 shrink-0" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
             <Image src={LogoNeu} alt="Logo Neu"className="w-4 h-4 shrink-0" />
            <span
              className="font-bangers tracking-wider"
              style={{ fontSize: '1.4rem', color: 'oklch(0.78 0.18 75)' }}
            >
              Rettungsanker Freiburg
            </span>
          </div>
          <p className="font-body text-sm" style={{ color: 'oklch(0.45 0.02 80)' }}>
            Die Kiez-Kneipe im Herzen der Altstadt
          </p>
          <a
            href="https://rettungsanker-freiburg.de"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs mt-2 inline-block transition-colors hover:opacity-80"
            style={{ color: 'oklch(0.65 0.12 75)' }}
          >
            rettungsanker-freiburg.de
          </a>
        </div>
      </footer>
    </div>
  )
}
