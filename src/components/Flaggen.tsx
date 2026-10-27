import type { SVGProps } from 'react'
import type { SprachCode } from '@/i18n/sprachen'

type FlaggenProps = SVGProps<SVGSVGElement>

const Deutschland = (props: FlaggenProps) => (
  <svg viewBox="0 0 5 3" {...props}>
    <rect width="5" height="3" fill="#000" />
    <rect width="5" height="2" y="1" fill="#DD0000" />
    <rect width="5" height="1" y="2" fill="#FFCE00" />
  </svg>
)

// Sterne-Feld in 9 Reihen (abwechselnd 6 und 5 Sterne) wie beim Original, nur vereinfacht gezeichnet
const US_STERNE = Array.from({ length: 9 }, (_, reihe) =>
  Array.from({ length: reihe % 2 === 0 ? 6 : 5 }, (_, spalte) => ({
    x: 6.33 + spalte * 12.67 + (reihe % 2 === 0 ? 0 : 6.33),
    y: 5.38 + reihe * 5.38,
  })),
).flat()

const USA = (props: FlaggenProps) => (
  <svg viewBox="0 0 190 100" {...props}>
    <rect width="190" height="100" fill="#B22234" />
    {[1, 3, 5, 7, 9, 11].map((i) => (
      <rect key={i} y={(i * 100) / 13} width="190" height={100 / 13} fill="#fff" />
    ))}
    <rect width="76" height={(7 * 100) / 13} fill="#3C3B6E" />
    <defs>
      <path id="us-stern" d="M0,-2 0.59,-0.81 1.9,-0.62 0.95,0.31 1.18,1.62 0,1 -1.18,1.62 -0.95,0.31 -1.9,-0.62 -0.59,-0.81Z" fill="#fff" />
    </defs>
    {US_STERNE.map(({ x, y }) => (
      <use key={`${x}-${y}`} href="#us-stern" x={x} y={y} />
    ))}
  </svg>
)

const Frankreich = (props: FlaggenProps) => (
  <svg viewBox="0 0 3 2" {...props}>
    <rect width="3" height="2" fill="#ED2939" />
    <rect width="2" height="2" fill="#fff" />
    <rect width="1" height="2" fill="#002654" />
  </svg>
)

const Italien = (props: FlaggenProps) => (
  <svg viewBox="0 0 3 2" {...props}>
    <rect width="3" height="2" fill="#CE2B37" />
    <rect width="2" height="2" fill="#F1F2F1" />
    <rect width="1" height="2" fill="#009246" />
  </svg>
)

const Russland = (props: FlaggenProps) => (
  <svg viewBox="0 0 9 6" {...props}>
    <rect width="9" height="6" fill="#D52B1E" />
    <rect width="9" height="4" fill="#0039A6" />
    <rect width="9" height="2" fill="#fff" />
  </svg>
)

const FLAGGEN: Record<SprachCode, (props: FlaggenProps) => React.JSX.Element> = {
  de: Deutschland,
  en: USA,
  fr: Frankreich,
  it: Italien,
  ru: Russland,
}

export function Flagge({ code, ...props }: FlaggenProps & { code: SprachCode }) {
  const Komponente = FLAGGEN[code]
  return <Komponente aria-hidden="true" focusable="false" {...props} />
}
