import Image from 'next/image'
import MatroseImSeil from '../../public/Assets/Img/matroseimseil.png'
import LogoAlt from '../../public/Assets/Img/LogoAlt.png'
import type { SprachCode } from '@/i18n/sprachen'
import { START, type StartTexte } from '@/i18n/inhalte/start'

type Rolle = keyof StartTexte['team']['rollen']

// rolle verweist auf die übersetzte Bezeichnung in START.team.rollen
const people: { name: string; rolle: Rolle; imageUrl: string }[] = [
  {
    name: 'Mick',
    rolle: 'captain',
    imageUrl: '/Assets/Img/portraitmick.png',
  },
  {
    name: 'Simon',
    rolle: 'obermaat',
    imageUrl: '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'Anne',
    rolle: 'offizierin1',
    imageUrl: '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'Leonie',
    rolle: 'offizierin2',
    imageUrl: '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'Emelie',
    rolle: 'offizierin2',
    imageUrl: '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'Jannis',
    rolle: 'offizier2',
    imageUrl: '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'Max',
    rolle: 'steward',
    imageUrl: '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'James',
    rolle: 'funker',
    imageUrl: '/Assets/Svg/ankerIcon.svg',
  },
]

export default function Team({ sprache }: { sprache: SprachCode }) {
  const t = START[sprache].team
  return (
    // Läuft unten in die Startfarbe des Kontaktbereichs (#1b252d) aus, damit dort keine harte Kante entsteht
    <div
      id="section-team"
      className="bg-linear-to-b from-black from-55% to-[#1b252d] py-24 sm:py-32"
    >
      <div className="flex flex-col justify-between mx-auto max-w-9xl lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[12vw] md:text-[10vw] headingA tracking-tight lg:text-[7.0rem] text-yellow-500 sm:text-4xl">
            {t.titel}
          </p>
          <div className="mx-36 flex flex-row items-center justify-center gap-3">
            <Image src={LogoAlt} alt="Logo" width={800} height={20} />
            <Image src={MatroseImSeil} alt="Logo" width={100} height={100} className="mb-24" />
          </div>
          <p className="w-3/4 mt-36 mx-24 text-center font-sans text-xl lg:text-3xl text-neutral-200">
            {t.text}
          </p>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <Image
                    alt=""
                    src={person.imageUrl}
                    width={224}
                    height={224}
                    // Kleinere Bilder unterhalb lg, damit Bild und Name in die (halbe) Spaltenbreite passen
                    className="size-40 sm:size-32 md:size-40 lg:size-56 rounded-full outline-1 -outline-offset-1 outline-black/5"
                  />
                  <div>
                    <p className="text-3xl font-sans tracking-tight text-gray-50">{person.name}</p>
                    <p className="text-sm/ font-sans text-yellow-500">{t.rollen[person.rolle]}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
