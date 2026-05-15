'use client'

/**
 * RETTUNGSANKER FREIBURG – GETRÄNKEKARTE
 * Design: Neo-Retro Maritime Comic
 * Dark background (#0a0a0f) + Gold (#F5C518) + Amber + Navy
 * Fonts: Bangers | Oswald | Source Sans 3
 */

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// ── Image paths (uploaded via manus-upload-file --webdev) ──
const IMAGES = {
  bier: '/manus-storage/01_bier_vom_fass_b058b8ff.png',
  flaschen: '/manus-storage/02_flaschenpost_ecacc099.png',
  weine: '/manus-storage/03_weine_d0c24f2b.png',
  cocktails: '/manus-storage/04_cocktails_longdrinks_1095cb96.png',
  kurze: '/manus-storage/05_kurze_braende_2061a4af.png',
  soft: '/manus-storage/06_softdrinks_2ee04124.png',
  kaffee: '/manus-storage/07_kaffee_tee_31c2fb1c.png',
  snacks: '/manus-storage/08_snacks_78370bd2.png',
}

// ── Menu Data ──
type MenuItem = {
  name: string
  size?: string
  desc?: string
  badge?: string
  price: string
}

type Section = {
  id: string
  label: string
  emoji: string
  image: string
  subtitle: string
  items: MenuItem[]
}

const MENU: Section[] = [
  {
    id: 'bier',
    label: 'Bier vom Fass',
    emoji: '🍺',
    image: IMAGES.bier,
    subtitle: 'Frisch gezapft & nordisch herb',
    items: [
      { name: 'Flensburger Pils', size: '0,3 l', price: '3,80 €' },
      {
        name: 'Flensburger Pils',
        size: '0,4 l',
        desc: 'Das kühle, herbe Blonde von der Waterkant',
        price: '4,40 €',
      },
      {
        name: 'Waldhaus naturtrüb',
        size: '0,3 l',
        desc: 'Ohne Filter: das Urige aus dem Schwarzwald',
        price: '3,80 €',
      },
      {
        name: 'Waldhaus naturtrüb',
        size: '0,4 l',
        desc: 'Ohne Filter – das Urige Bier vom Schwarzwald',
        price: '4,40 €',
      },
      { name: 'Ganter Hefeweizen hell', size: '0,3 l', price: '3,80 €' },
      { name: 'Ganter Hefeweizen hell', size: '0,5 l', price: '4,80 €' },
      {
        name: 'Treibholz mit Bier',
        size: '6 × 0,33 l',
        desc: '6 × 0,33 Liter mit Bier nach Wahl',
        price: '20,00 €',
      },
    ],
  },
  {
    id: 'flaschen',
    label: 'Flaschenpost',
    emoji: '🍻',
    image: IMAGES.flaschen,
    subtitle: 'Vielfältig & für jeden Geschmack',
    items: [
      { name: 'Astra', size: '0,33 l', desc: 'Das Kultbier vom Kiez', price: '3,30 €' },
      { name: 'Freiburger Bierle naturtrüb', size: '0,33 l', price: '3,80 €' },
      { name: 'Ganter Badisch hell', size: '0,33 l', price: '3,80 €' },
      { name: 'Ganter Magisch dunkel', size: '0,33 l', price: '4,20 €' },
      { name: 'Augustiner hell', size: '0,5 l', price: '4,80 €' },
      { name: 'Ganter Weizen dunkel', size: '0,5 l', price: '4,80 €' },
      { name: 'Augustiner Edelstoff', size: '0,5 l', price: '4,80 €' },
      { name: 'Ganter Kristallweizen', size: '0,5 l', price: '4,80 €' },
      { name: 'Flens frei', size: '0,33 l', badge: 'alkoholfrei', price: '3,80 €' },
      {
        name: 'Freiburger Bierle naturtrüb 0.0',
        size: '0,33 l',
        badge: 'alkoholfrei',
        price: '3,80 €',
      },
      {
        name: 'Ganter Weizen alkoholfrei 0.0',
        size: '0,5 l',
        badge: 'alkoholfrei',
        price: '4,80 €',
      },
    ],
  },
  {
    id: 'weine',
    label: 'Weine',
    emoji: '🍷',
    image: IMAGES.weine,
    subtitle: 'Regional & handverlesen',
    items: [
      { name: 'Gutedel', size: '0,25 l', desc: 'Weingut Heinemann, Scherzingen', price: '5,20 €' },
      {
        name: 'Weisser Burgunder',
        size: '0,25 l',
        desc: 'Weingut Heinemann, Scherzingen',
        price: '5,80 €',
      },
      {
        name: 'Grauer Burgunder',
        size: '0,25 l',
        desc: 'Weingut Heinemann, Scherzingen',
        price: '5,80 €',
      },
      {
        name: 'Spätburgunder Rosé',
        size: '0,25 l',
        desc: 'Weingut Heinemann, Scherzingen',
        price: '5,80 €',
      },
      {
        name: 'Blauer Spätburgunder',
        size: '0,25 l',
        desc: 'Weingut Heinemann, Scherzingen',
        price: '6,00 €',
      },
      { name: 'Merlot', size: '0,25 l', desc: 'Weingut Heinemann, Scherzingen', price: '6,20 €' },
      {
        name: 'Weinschorle vom Gutedel',
        size: '0,25 l',
        desc: 'Gutedel und Mineralwasser',
        price: '3,80 €',
      },
      {
        name: 'Weinschorle vom Burgunder',
        size: '0,25 l',
        desc: 'Weiß, grau, rosé oder rot',
        price: '3,90 €',
      },
      {
        name: 'Weisser Burgunder Sekt',
        size: '0,1 l',
        desc: 'Weingut Heinemann, Scherzingen',
        price: '4,00 €',
      },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails & Longdrinks',
    emoji: '🍹',
    image: IMAGES.cocktails,
    subtitle: 'Gemixt mit Liebe & einer Prise Wahnsinn',
    items: [
      {
        name: 'Aperol Sprizz',
        size: '0,3 l',
        desc: 'Aperol / Gutedel / Mineralwasser',
        price: '7,00 €',
      },
      { name: 'Seemanshugo (Andalö Sprizz)', price: '7,00 €' },
      { name: 'Campari', price: '7,00 €' },
      { name: 'Wodka Lemon', price: '7,00 €' },
      { name: 'Sekt Mate', price: '7,00 €' },
      { name: 'Turbo Mate', price: '7,00 €' },
      { name: 'Skinny Bitch', desc: 'Wodka Soda', price: '7,00 €' },
      { name: 'Moscow / London Mule', price: '7,80 €' },
      { name: 'Captains Mule / Libre', price: '7,80 €' },
      { name: 'Cuba Libre', price: '7,80 €' },
      { name: 'Jacky Cola', price: '7,80 €' },
      { name: 'Johnny Walker Cola', price: '7,80 €' },
      { name: 'Dark and Stormy', price: '9,90 €' },
      { name: 'Smokey Sour', price: '9,90 €' },
      { name: 'San Bitter 0,0', badge: 'alkoholfrei', price: '6,50 €' },
      { name: 'Gin Tonic 0,0', badge: 'alkoholfrei', price: '7,80 €' },
      { name: 'Cuba Libre 0,0', badge: 'alkoholfrei', price: '7,80 €' },
    ],
  },
  {
    id: 'kurze',
    label: 'Kurze & Brände',
    emoji: '🥃',
    image: IMAGES.kurze,
    subtitle:
      'Gemäß Aushang – Brände von der Elztalbrennerei Weis, Weingut Heinemann & Hausbrennerei Steiger',
    items: [
      {
        name: 'Kurzer (kleiner)',
        desc: 'Elztalbrennerei Weis / Weingut Heinemann / Hausbrennerei Steiger',
        price: '1,50 €',
      },
      {
        name: 'Kurzer (großer)',
        desc: 'Elztalbrennerei Weis / Weingut Heinemann / Hausbrennerei Steiger',
        price: '3,00 €',
      },
    ],
  },
  {
    id: 'soft',
    label: 'Softdrinks',
    emoji: '🥤',
    image: IMAGES.soft,
    subtitle: 'Cool bleiben!',
    items: [
      { name: 'Afri Cola', size: '0,33 l', price: '3,50 €' },
      { name: 'Afri Cola Zero', size: '0,33 l', price: '3,50 €' },
      { name: 'Afri Cola Mix', size: '0,33 l', price: '3,50 €' },
      { name: 'Bluna Orange', size: '0,33 l', price: '3,50 €' },
      { name: 'Energy Drink', size: '0,33 l', price: '4,20 €' },
      { name: 'Club Mate', size: '0,33 l', price: '3,50 €' },
      { name: 'Tonic Water', size: '0,3 l', price: '3,50 €' },
      { name: 'Bitter Lemon', size: '0,3 l', price: '3,50 €' },
      { name: 'Spicy Ginger', size: '0,3 l', price: '3,50 €' },
      { name: 'Tafelwasser', size: '0,4 l', price: '2,50 €' },
      { name: 'Saft Schorle', size: '0,3 l', price: '3,50 €' },
      { name: 'Saft Schorle', size: '0,4 l', price: '3,90 €' },
    ],
  },
  {
    id: 'kaffee',
    label: 'Kaffee & Tee',
    emoji: '☕',
    image: IMAGES.kaffee,
    subtitle: 'Warm ums Herz',
    items: [
      { name: 'Espresso', size: 'Tasse', price: '2,50 €' },
      { name: 'Cappuccino', size: 'Tasse', price: '4,50 €' },
      { name: 'Café Crème', size: 'Tasse', price: '3,00 €' },
      { name: 'Kaffee', size: 'Tasse', price: '3,00 €' },
      { name: 'Tee', size: 'Tasse', desc: 'Earl Grey · Pfefferminz · Hagebutte', price: '2,50 €' },
    ],
  },
  {
    id: 'snacks',
    label: 'Snacks',
    emoji: '🥨',
    image: IMAGES.snacks,
    subtitle: 'Klein aber oho',
    items: [
      { name: 'Elsässer Flammkuchen', desc: 'Klassisch', price: '9,20 €' },
      { name: 'Elsässer Flammkuchen', desc: 'Waterkant (mit Lachs)', price: '9,20 €' },
      { name: 'Elsässer Flammkuchen', desc: 'Vegetarisch', price: '9,20 €' },
    ],
  },
]

// ── Anchor SVG ──
function AnchorSvg({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-1 5h2v1.27A9.004 9.004 0 0 1 21 19h-2a7 7 0 0 0-6-6.93V19h2l-3 3-3-3h2V12.07A7 7 0 0 0 5 19H3a9.004 9.004 0 0 1 8-8.73V9z" />
    </svg>
  )
}

// ── Menu Item Row ──
function MenuRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      className="menu-item"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline flex-wrap gap-x-2">
          <span className="menu-item-name">{item.name}</span>
          {item.size && (
            <span className="text-xs font-body" style={{ color: 'oklch(0.55 0.02 80)' }}>
              {item.size}
            </span>
          )}
          {item.badge && <span className="menu-item-badge">{item.badge}</span>}
        </div>
        {item.desc && <p className="menu-item-desc">{item.desc}</p>}
      </div>
      <span className="menu-item-price">{item.price}</span>
    </motion.div>
  )
}

// ── Main Component ──
export default function Home() {
  const [activeId, setActiveId] = useState<string>(MENU[0].id)
  const tabsRef = useRef<HTMLDivElement>(null)
  const activeSection = MENU.find((s) => s.id === activeId)!

  // Scroll active tab into view
  useEffect(() => {
    const el = tabsRef.current?.querySelector(`[data-tab="${activeId}"]`) as HTMLElement | null
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeId])

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.08 0.01 260)' }}>
      {/* ── Hero Header ── */}
      <header className="relative overflow-hidden pt-10 pb-8 px-4">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.78 0.18 75 / 0.12) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Anchor + Logo row */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <AnchorSvg className="w-7 h-7" style={{ color: 'oklch(0.78 0.18 75)' }} />
            <span
              className="font-oswald text-sm tracking-[0.25em] uppercase"
              style={{ color: 'oklch(0.6 0.02 80)' }}
            >
              Rettungsanker Freiburg
            </span>
            <AnchorSvg className="w-7 h-7" style={{ color: 'oklch(0.78 0.18 75)' }} />
          </div>

          {/* Main title */}
          <h1
            className="font-bangers text-gold-shimmer"
            style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1.05 }}
          >
            Getränkekarte
          </h1>

          {/* Subtitle */}
          <p
            className="font-body mt-2 text-base md:text-lg"
            style={{ color: 'oklch(0.6 0.02 80)' }}
          >
            Was darf&lsquo;s sein? Wir haben für jeden Durst das Richtige.
          </p>

          {/* Gold divider */}
          <div className="gold-divider mt-5 max-w-xs mx-auto">
            <AnchorSvg className="w-4 h-4 shrink-0" />
          </div>
        </div>
      </header>

      {/* ── Sticky Tab Navigation ── */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{
          background: 'oklch(0.08 0.01 260 / 0.92)',
          backdropFilter: 'blur(12px)',
          borderColor: 'oklch(0.25 0.03 260)',
        }}
      >
        <div
          ref={tabsRef}
          className="tab-scroll flex gap-1 px-3 py-2 overflow-x-auto max-w-5xl mx-auto"
          style={{ scrollbarWidth: 'thin' }}
        >
          {MENU.map((section) => (
            <button
              key={section.id}
              data-tab={section.id}
              className={`tab-btn ${activeId === section.id ? 'active' : ''}`}
              onClick={() => setActiveId(section.id)}
            >
              <Image
                src={section.image}
                alt={section.label}
                width={48}
                height={48}
                className="tab-img"
              />
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Section Content ── */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Section Banner */}
            <div className="section-banner mb-8">
              <Image
                src={activeSection.image}
                alt={activeSection.label}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="section-banner-overlay">
                <div
                  className="font-oswald text-sm tracking-widest uppercase mb-1"
                  style={{ color: 'oklch(0.78 0.18 75 / 0.8)' }}
                >
                  {activeSection.emoji} Rubrik
                </div>
                <h2
                  className="font-bangers"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    color: 'oklch(0.78 0.18 75)',
                    lineHeight: 1.1,
                    textShadow: '0 2px 12px oklch(0 0 0 / 0.6)',
                  }}
                >
                  {activeSection.label}
                </h2>
                <p
                  className="font-body mt-1 text-sm md:text-base max-w-sm"
                  style={{ color: 'oklch(0.85 0.02 80 / 0.85)' }}
                >
                  {activeSection.subtitle}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: 'oklch(0.11 0.015 260)',
                border: '1px solid oklch(0.22 0.03 260)',
              }}
            >
              {activeSection.items.map((item, i) => (
                <MenuRow key={`${item.name}-${i}`} item={item} index={i} />
              ))}
            </div>

            {/* Footer note */}
            <p
              className="text-center font-body text-xs mt-6"
              style={{ color: 'oklch(0.45 0.02 80)' }}
            >
              Alle Preise inkl. MwSt. · Weitere Specials auf Anfrage!
            </p>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-12 border-t py-8 px-4" style={{ borderColor: 'oklch(0.2 0.03 260)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="gold-divider max-w-xs mx-auto mb-5">
            <AnchorSvg className="w-4 h-4 shrink-0" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <AnchorSvg className="w-5 h-5" style={{ color: 'oklch(0.78 0.18 75)' }} />
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
