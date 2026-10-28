import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import './styles.css'
import { Navbar9 } from '@/components/navbar'
import { getCachedNavigation } from '@/globals/navigation/queries'
import type { Navigation as NavigationType } from '@/payload-types'
import { Footer12 } from '@/components/footer'
import ScrollToTop from '@/components/BackToTop/ScrollToTop'
import { SprachProvider } from '@/i18n/SprachProvider'
import { istSprachCode, lokalisierterPfad, SPRACH_CODES, type SprachCode } from '@/i18n/sprachen'
import { texte } from '@/i18n/texte'

export const metadata: Metadata = {
  description: 'Die Kiezkneipe',
  title: 'Rettungsanker-Freiburg',
  icons: {
    icon: '/Assets/Svg/faviconLogoNeu.svg',
  },
}

// Alle Sprachen beim Build vorbereiten, damit jede Sprachversion statisch ausgeliefert werden kann
export function generateStaticParams() {
  return SPRACH_CODES.map((locale) => ({ locale }))
}

// Interne Links zeigen auf die gleiche Seite in der aktuellen Sprache ("/impressum" → "/fr/impressum")
function mapGlobalToMenuItems(navigation: NavigationType | null, sprache: SprachCode) {
  const kontakt = { title: texte(sprache).kontakt, url: lokalisierterPfad('/#section-contact', sprache) }

  if (!navigation?.menuItems || navigation.menuItems.length === 0) {
    return [kontakt]
  }

  const mappedItems = navigation.menuItems.map((item) => {
    // If item has subItems, it's a dropdown menu
    if (item.subItems && item.subItems.length > 0) {
      return {
        title: item.label,
        links: item.subItems.map((sub) => ({
          label: sub.label,
          url: lokalisierterPfad(sub.URL, sprache),
          description: sub.description || undefined,
        })),
      }
    }
    // Otherwise it's a simple link
    return {
      title: item.label,
      url: lokalisierterPfad(item.URL, sprache),
    }
  })

  const hasContactLink = mappedItems.some(
    (item) => item.url === kontakt.url || item.title.toLowerCase() === kontakt.title.toLowerCase(),
  )

  if (!hasContactLink) {
    mappedItems.push(kontakt)
  }

  return mappedItems
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { children } = props
  const { locale } = await props.params
  // Unbekanntes Kürzel wie /xy/… → 404 statt einer leeren Seite
  if (!istSprachCode(locale)) notFound()

  const navigation = await getCachedNavigation(locale)
  const menuItems = mapGlobalToMenuItems(navigation, locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Sprache kommt aus der Adresse; der Provider reicht sie an alle Client-Bausteine weiter */}
        <SprachProvider sprache={locale}>
          <Navbar9 navigation={menuItems} />
          <main>{children}</main>
          <ScrollToTop />
          <Footer12 />
        </SprachProvider>
        {/* Cookiefreie Besucherstatistik von Vercel, sichtbar im Dashboard unter „Analytics" */}
        <Analytics />
      </body>
    </html>
  )
}
