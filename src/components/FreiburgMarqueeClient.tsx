'use client'

import Image from 'next/image'
import Marquee from 'react-fast-marquee'

import type { FreiburgMarqueeData } from './FreiburgMarquee'

type FreiburgMarqueeClientProps = {
  data: FreiburgMarqueeData
}

function Dot() {
  return <span className="opacity-40 px-1">·</span>
}

function MarqueeItem({ data }: FreiburgMarqueeClientProps) {
  const { team, rank, matchday } = data

  return (
    <div className="flex items-center gap-5 px-10 text-sm font-medium tracking-wide">
      <Image
        src={team.teamIconUrl}
        alt="SC Freiburg"
        width={50}
        height={50}
        className="object-contain drop-shadow-sm"
        unoptimized
      />

      <span className="font-black uppercase tracking-widest text-xl">SC Freiburg</span>

      <Dot />

      <span>
        <span className="opacity-80 font-bold">Spieltag </span>
        <span className="font-semibold">{matchday}</span>
      </span>

      <Dot />

      <span>
        <span className="opacity-80">Rang </span>
        <span className="font-semibold">{rank}.</span>
      </span>

      <Dot />

      <span>
        <span className="opacity-80">Punkte </span>
        <span className="font-semibold">{team.points}</span>
        <span className="opacity-50 text-xs ml-1">
          ({team.won}S {team.draw}U {team.lost}N)
        </span>
      </span>

      <Dot />

      <span>
        <span className="opacity-80">Tore </span>
        <span className="font-semibold">
          {team.goals}:{team.opponentGoals}
        </span>
        <span
          className={`ml-1 text-xs font-semibold ${team.goalDiff >= 0 ? 'text-white/80' : 'text-red-200'}`}
        >
          ({team.goalDiff >= 0 ? '+' : ''}
          {team.goalDiff})
        </span>
      </span>
    </div>
  )
}

export default function FreiburgMarqueeClient({ data }: FreiburgMarqueeClientProps) {
  return (
    <div className="bg-red-700 text-white py-2.5 overflow-hidden">
      <Marquee speed={50} gradient pauseOnHover>
        <MarqueeItem data={data} />
        <MarqueeItem data={data} />
        <MarqueeItem data={data} />
        <MarqueeItem data={data} />
      </Marquee>
    </div>
  )
}
