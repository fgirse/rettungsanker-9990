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
      <p
        ref={dieRef}
        id="1"
        className="mb-5 relative text-[45vw] headingE text-white text-center top-[-35vw] md:text-[43vw] md:top-[-27vw] lg:top-[1vw] lg:text-[22vw]"
      >
        die
      </p>
      <p
        ref={kiezkneipeRef}
        id="2"
        className="relative text-[12vw] top-[-18vw] headingA text-red-800 text-center md:top-[-10vw] lg:text-[6vw] lg:top-[8vw]"
      >
        kiezkneipe
      </p>
    </>
  )
}
