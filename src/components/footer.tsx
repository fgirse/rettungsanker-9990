'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import LogoNeu from '../../public/Assets/Img/LogoNeu.png'
import Lighthouse from '../../public/Assets/Img/lighthouse3.png'
import Waves from '@/components/waves'

interface Footer12Props {
  className?: string
}

const Footer12 = ({ className }: Footer12Props) => {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const navigation = [
    { name: 'Ueber uns', href: '/#section-about' },
    { name: 'Getraenkekarte', href: '/#section-getraenkekarte' },
    { name: 'Galerie', href: '/#section-gallery' },
    { name: 'Team', href: '/#section-team' },
    { name: 'Kontakt', href: '/#section-contact' },
    { name: 'Anfahrt', href: '/#section-wohin' },
  ]

  const social = [
    { name: 'Website', href: 'https://www.rettungsanker-freiburg.de' },
    { name: 'E-Mail', href: 'mailto:info@rettungsanker-freiburg.de' },
  ]

  const legal = [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ]

  return (
    <section className={cn('bg-stone-900 flex flex-col items-center gap-14 py-32', className)}>
      <nav className="container flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-yellow-500/80">
            Sitemap
          </p>
          <p className="mt-2 font-sans text-zinc-300">Alles Wichtige auf einen Blick</p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="inline-flex items-center rounded-full border border-yellow-500/30 bg-zinc-800/70 px-4 py-2 font-sans text-sm text-zinc-100 transition-all hover:-translate-y-0.5 hover:border-yellow-400/60 hover:bg-zinc-700/90 hover:text-yellow-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center justify-center gap-4">
          {social.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center gap-1 rounded-full bg-zinc-800/70 px-4 py-2 font-sans text-sm text-zinc-200 transition-all hover:bg-yellow-500/20 hover:text-yellow-300"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-sans text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-yellow-300 hover:underline"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-5 flex flex-col items-center justify-center">
        <Image src={LogoNeu} alt="Logo" width={128} height={128} priority className="mt-5 mb-12" />
        <div className="text-center text-[2rem] md:text-[4rem] lg:text-[10rem] headingA select-none pointer-events-none leading-none bg-linear-to-br from-yellow-700 to-yellow-500 bg-clip-text text-transparent opacity-70 tracking-tighter">
          RETTUNGSANKER
        </div>
        <Image
          src={Lighthouse}
          alt="Lighthouse"
          width={50}
          height={50}
          priority
          className="mt-16 relative right-36 z-10 -mb-8 w-20 md:w-32 md:-mb-12 md:right-60 lg:w-40 lg:-mb-32 lg:right-[40vw]"
        />
        <div className="w-screen">
          <Waves />
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          &copy; {year || '2024'}{' '}
          <span className="uppercase font-black text-lime-400">medicusdesing</span> Basel 🇨🇭 All
          rights reserved.
        </p>
      </div>
    </section>
  )
}

export { Footer12 }
