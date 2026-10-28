import React from 'react'
import Image from 'next/image'
import LogoNeu from '../../public/Assets/Img/LogoAlt.png'
//import Marquee from '@/components/MarqueeCooperateComp';
import Angebot from '@/components/AngebotDesMonats'
import HeroAnimatedText from '@/components/HeroAnimatedText'
import HeroFilmkamera from '@/components/HeroFilmkamera'
import type { SprachCode } from '@/i18n/sprachen'
import { START } from '@/i18n/inhalte/start'

function Hero({ sprache }: { sprache: SprachCode }) {
  return (
    // flach: Hero genau so hoch wie der sichtbare Bereich unter der Kopfzeile (--kopfzeile aus styles.css)
    <section className="-mt-[5vh] relative overflow-hidden lg:mt-0 h-screen w-full flex flex-col items-center justify-center flach:mt-0 flach:h-[calc(100svh-var(--kopfzeile))]">
      {/* Background video for mobile and tablet only */}
      <video
        className="absolute inset-0 w-full h-full object-cover lg:hidden -z-10"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Assets/Img/lighthouse_animated.mp4" type="video/mp4" />
      </video>
      {/* Background video for desktop only */}
      <video
        className="absolute inset-0 w-full h-full object-contain hidden lg:block -z-10 flach:object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Assets/Img/hans_flying_music.mp4" type="video/mp4" />
      </video>
      {/* Desktop: weicher dunkler Schein hinter Schriftzug und i-Punkt, damit beide sich vom bunten Video abheben.
          Mittelpunkt bei 45 % Höhe, dort liegt der Schriftzug samt Logo. -z-5 legt ihn über die Videos (-z-10). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-5 hidden bg-[radial-gradient(ellipse_34%_44%_at_50%_45%,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.7)_60%,transparent_100%)] lg:block"
      />
      {/* Handy: Logo und Schriftzug gemeinsam nach unten, damit sie mittig zwischen Kopfzeile und Bierdeckel
          stehen (gemessen 360–430 px Breite, jeweils rund 74 px). Die vh-Versätze darin bleiben unberührt. */}
      <div className="relative z-10 flex flex-col items-center translate-y-16.5 md:translate-y-0 flach:translate-y-0!">
        <div className="relative top-[-26vh] w-[74vw] md:w-[70vw] lg:hidden flach:top-0! flach:w-[60svh]!">
          <Image src={LogoNeu} alt={START[sprache].hero.logoAlt} className="mt-3 flach:mt-0" />
        </div>
        <HeroAnimatedText />
      </div>
      {/* Filmkamera: Handy und Tablet unten links, wo das schräge Angebots-Band am höchsten steht;
          Desktop links auf der Bühne. Auf dem Handy ragt der Hero um die Kopfzeilenhöhe minus 5vh unter den
          Bildschirmrand, daher der berechnete Abstand nach unten. In flachen Fenstern immer unten links. */}
      <div className="absolute bottom-[calc(var(--kopfzeile)-2vh)] left-[5vw] z-10 md:bottom-[12vh] md:left-[4vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 flach:top-auto! flach:bottom-[4svh]! flach:left-[3vw]! flach:translate-y-0!">
        <HeroFilmkamera />
      </div>
      {/* Ab Tablet als Sticker abseits des Schriftzugs, damit das gedrehte Band ihn nicht überdeckt:
          Tablet unten rechts, Desktop rechts neben dem Schriftzug. Auf dem Handy bleibt es darunter,
          etwas nach rechts unten versetzt.
          In flachen Fenstern immer unten rechts. */}
      <div className="relative z-10 flex flex-col items-center justify-center translate-x-[18vw] translate-y-[5vh] md:translate-x-0 md:translate-y-0 md:absolute md:right-[4vw] md:bottom-[12vh] lg:right-[2vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 flach:absolute! flach:top-auto! flach:right-[3vw]! flach:bottom-[2svh]! flach:translate-x-0! flach:translate-y-0! flach:origin-bottom-right flach:scale-75">
        <Angebot sprache={sprache} />
      </div>
    </section>
  )
}

export default Hero
