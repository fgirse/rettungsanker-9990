import HeroSection from '@/components/Hero'
//import Marquee from '@/components/Marquee';
import About from '@/components/About'
import Photogallery from '@/components/PhotoGallery'
import Bento from "@/components/GridLayout3";
import Marquee from '@/components/Marquee';

import Team from "@/components/Team";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
        <About />
        <Bento/>
        <Photogallery />
        <Team />
    </>
  )
}
