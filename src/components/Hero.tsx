import React from 'react'
import Image from 'next/image'
import LogoNeu from '../../public/Assets/Img/LogoAlt.png'
//import Marquee from '@/components/MarqueeCooperateComp';
import Angebot from '@/components/AngebotDesMonats'
import HeroAnimatedText from '@/components/HeroAnimatedText'
import HeroFilmkamera from '@/components/HeroFilmkamera'

function Hero() {
  return (
    <section className="-mt-[5vh] relative overflow-hidden lg:mt-0 h-screen w-full flex flex-col items-center justify-center">
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
        className="absolute inset-0 w-full h-full object-contain hidden lg:block -z-10"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/Assets/Img/hans_flying_music.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative top-[-26vh] w-[74vw] md:w-[70vw] lg:hidden">
          <Image src={LogoNeu} alt="LogoAlt" className="mt-3 " />
        </div>
        <HeroAnimatedText />
      </div>
      {/* Ab Tablet als Sticker abseits des Schriftzugs, damit das gedrehte Band ihn nicht überdeckt:
          Tablet unten rechts, Desktop rechts neben dem Schriftzug. Auf dem Handy bleibt es darunter. */}
      {/* Filmkamera: Handy und Tablet unten links, wo das schräge Angebots-Band am höchsten steht;
          Desktop links auf der Bühne. Auf dem Handy ragt der Hero um Kopfzeile (7rem) minus 5vh unter den
          Bildschirmrand, daher der berechnete Abstand nach unten. */}
      <div className="absolute bottom-[calc(7rem-2vh)] left-[5vw] z-10 md:bottom-[12vh] md:left-[4vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
        <HeroFilmkamera />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center md:absolute md:right-[4vw] md:bottom-[12vh] lg:right-[2vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
        <Angebot />
      </div>
    </section>
  )
}

export default Hero
