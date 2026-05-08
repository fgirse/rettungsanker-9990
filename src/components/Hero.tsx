import React from 'react'
import Image from 'next/image'
import LogoNeu from '../../public/Assets/Img/LogoAlt.png'
//import Marquee from '@/components/MarqueeCooperateComp';
import Angebot from '@/components/AngebotDesMonats'
import HeroAnimatedText from '@/components/HeroAnimatedText'

function Hero() {
  return (
    <section className='-mt-[5vh] relative overflow-hidden lg:mt-0 lg:bg-[url("/Assets/Svg/5555.svg")] lg:bg-contain lg:bg-no-repeat lg:bg-center h-screen w-full flex flex-col items-center justify-center'>
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
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative top-[-26vh] w-[74vw] md:w-[70vw] lg:hidden">
          <Image src={LogoNeu} alt="LogoAlt" className="mt-3 " />
        </div>
        <HeroAnimatedText />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Angebot />
      </div>
    </section>
  )
}

export default Hero
