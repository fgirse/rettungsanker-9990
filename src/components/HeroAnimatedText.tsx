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
      {/* Sichtbarer Abstand zwischen „die“ und „kiezkneipe“ überall 8px. Zeilenhöhe und Außenabstand sind
          fest gesetzt (gleiche Werte wie zuvor geerbt), damit sich der Versatz von „kiezkneipe“ berechnen lässt:
          top = top(die) + 0,332·Größe(die) + 0,345·Größe(kiez) − Zeilenhöhe − Außenabstände + 8px + Konturen.
          Die Faktoren stammen aus den Schriftmaßen von Bowlby One SC (Oberlänge 1,098 em, Kapitälchen 0,69 em),
          bei „die“ um die gemessene künstliche Fettung (Gewicht 800) korrigiert.
          flach: Zeilenhöhe 1, Größe nach Fensterhöhe (siehe styles.css), Abstand über margin-top. */}
      <p
        ref={dieRef}
        id="1"
        className="relative text-[45vw] headingE text-amber-50 text-center top-[-16vh] leading-[24px] my-0! md:text-[43vw] md:top-[-14vh] lg:top-[1vh] lg:text-(length:--die) lg:leading-[32px] lg:my-[24px]! flach:top-0! flach:my-0! flach:text-[34svh]! flach:leading-none! lg:flach:text-(length:--die)!"
      >
        die
      </p>
      <p
        ref={kiezkneipeRef}
        id="2"
        className="relative text-[12vw] top-[calc(19.08vw-16vh-12.33px)] headingA text-red-800 text-center leading-[24px] my-0! md:top-[calc(18.416vw-14vh-13.83px)] lg:text-[calc(var(--die)*3/11)] lg:top-[calc(var(--die)*0.4261+1vh-68.83px)] lg:leading-[32px] lg:my-[24px]! flach:top-0! flach:mt-[calc(11.17px-7.107svh)]! flach:mb-0! flach:text-[9svh]! flach:leading-none! lg:flach:text-[calc(var(--die)*9/34)]! lg:flach:mt-[calc(11.17px-var(--die)*0.209)]!"
      >
        kiezkneipe
      </p>
    </>
  )
}
