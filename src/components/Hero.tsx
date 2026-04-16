import React from 'react'
import Image from 'next/image'
import LogoNeu from '../../public/Assets/Img/LogoAlt.png'
//import Marquee from '@/components/MarqueeCooperateComp';
import Angebot from '@/components/AngebotDesMonats'
//import HeroAnimatedText from '@/components/HeroAnimatedText'
import Kiezkneipetitel from '@/components/Kiezkneipetitel'



function Hero() {
  return (
    <section className='-mt-[5vh] bg-[url("/Assets/Img/lighthouse.png")] bg-contain bg-no-repeat bg-center lg:mt-0 lg:bg-[url("/Assets/Svg/5555.svg")] lg:bg-contain lg:bg-no-repeat lg:bg-center h-screen w-full flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center">
        <div className="relative top-[-30vh] w-[74vw] md:w-[70vw] lg:hidden">
          <Image src={LogoNeu} alt="LogoAlt" className="mt-3 " />
        </div>
        <Kiezkneipetitel />
      </div>
      <div className=" flex flex-col items-center justify-center">
        <Angebot/>
      </div>
    </section>
  )
}

export default Hero
