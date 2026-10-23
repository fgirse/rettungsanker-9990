import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import AstraLogo from '../../public/Assets/Svg/AstraLogo.svg'
import FlensLogo from '../../public/Assets/Svg/LogoFlens.svg'
import LogoNeu from '../../public/Assets/Svg/faviconLogoNeu.svg'

// Logos laufen über einheitliche Höhe statt Breite, damit sie optisch gleich groß wirken.
// Das sehr breite Flens-Logo bekommt etwas weniger Höhe, sonst dominiert es.
const LOGOS = [
  { src: LogoNeu, alt: 'Rettungsanker – Dein Treff', className: 'h-12 md:h-16' },
  { src: AstraLogo, alt: 'Astra', className: 'h-12 md:h-16' },
  { src: FlensLogo, alt: 'Flensburger', className: 'h-8 md:h-11' },
]

// autoFill wiederholt die Logos so oft, bis die Breite gefüllt ist; der Abstand sitzt pro Logo (mx),
// damit er auch an der Nahtstelle des Endlosbands gleich bleibt.
// Bei "Bewegung reduzieren" im Betriebssystem bleibt das Band stehen.
const LogoMarquee = () => (
  <section
    aria-label="Unsere Partner"
    className="bg-black py-6 md:py-10 motion-reduce:[&_.rfm-marquee]:[animation-play-state:paused]"
  >
    <Marquee autoFill pauseOnHover speed={40} gradient gradientColor="black" gradientWidth={80}>
      {LOGOS.map((logo) => (
        <Image
          key={logo.alt}
          src={logo.src}
          alt={logo.alt}
          className={`mx-8 w-auto md:mx-14 ${logo.className}`}
        />
      ))}
    </Marquee>
  </section>
)

export default LogoMarquee
