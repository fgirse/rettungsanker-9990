'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function HeroAnimatedText() {
  const dieRef = useRef<HTMLParagraphElement>(null)
  const kiezkneipeRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    // Animate "die" from left with blend in
    gsap.from(dieRef.current, {
      x: -500,
      opacity: 0,
      duration: 2.2,
      ease: 'power3.out',
      delay: 0.3,
    })

    // Animate "kiezkneipe" from right with blend in
    gsap.from(kiezkneipeRef.current, {
      x: 500,
      opacity: 0,
      duration: 2.2,
      ease: 'power3.out',
      delay: 0.6,
    })
  }, [])

  return (
    <>
      {/* flach: feste Zeilenhöhe und Verschiebungen aufheben, Größe nach Fensterhöhe (siehe styles.css) */}
      <p
        ref={dieRef}
        id="1"
        className="mb-12 relative text-[45vw] headingE text-amber-50 text-center top-[-16vh] md:text-[43vw] md:top-[-14vh] lg:top-[1vh] lg:text-[22vw] flach:top-0! flach:my-0! flach:text-[34svh]! flach:leading-none!"
      >
        die
      </p>
      <p
        ref={kiezkneipeRef}
        id="2"
        className="relative text-[12vw] top-[-8vh] headingA text-red-800 text-center md:top-[2vh] lg:text-[6vw] lg:top-[8vw] flach:top-0! flach:mt-[3svh]! flach:mb-0! flach:text-[9svh]! flach:leading-none!"
      >
        kiezkneipe
      </p>
    </>
  )
}
