import React from 'react'
import type { Metadata } from 'next'
import './styles.css'
import { Navbar9 } from '@/components/navbar'
import { getCachedNavigation } from '@/globals/navigation/queries'
import type { Navigation as NavigationType } from '@/payload-types'
import { Footer12 } from '@/components/footer'
import ScrollToTop from '@/components/BackToTop/ScrollToTop'

export const metadata: Metadata = {
  description: 'Die Kiezkneipe',
  title: 'Rettungsanker-Freiburg',
  icons: {
    icon: '/Assets/Svg/faviconLogoNeu.svg',
  },
}

function mapGlobalToMenuItems(navigation: NavigationType) {
  if (!navigation?.menuItems || navigation.menuItems.length === 0) {
    return []
  }

  return navigation.menuItems.map((item) => {
    // If item has subItems, it's a dropdown menu
    if (item.subItems && item.subItems.length > 0) {
      return {
        title: item.label,
        links: item.subItems.map((sub) => ({
          label: sub.label,
          url: sub.URL,
          description: sub.description || undefined,
        })),
      }
    }
    // Otherwise it's a simple link
    return {
      title: item.label,
      url: item.URL,
    }
  })
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const navigation = await getCachedNavigation()
  const menuItems = mapGlobalToMenuItems(navigation)

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar9 navigation={menuItems} />
        <main>{children}</main>
        <ScrollToTop />
        <Footer12 />
      </body>
    </html>
  )
}
