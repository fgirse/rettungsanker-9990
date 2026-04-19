import Marquee from 'react-fast-marquee'
import Image from 'next/image'

// ── Types ──────────────────────────────────────────────────────────────────────

type BundesligaTeam = {
  teamName: string
  shortName: string
  teamIconUrl: string
  points: number
  opponentGoals: number
  goals: number
  matches: number
  won: number
  lost: number
  draw: number
  goalDiff: number
}

type CurrentGroup = {
  groupName: string
  groupOrderID: number
}

type ItemProps = {
  team: BundesligaTeam
  rank: number
  matchday: number
}

// ── Module-level sub-components (rerender-no-inline-components) ───────────────

function Dot() {
  return <span className="opacity-40 px-1">·</span>
}

function MarqueeItem({ team, rank, matchday }: ItemProps) {
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

// ── Server component ───────────────────────────────────────────────────────────

export default async function FreiburgMarquee() {
  let table: BundesligaTeam[] = []
  let currentGroup: CurrentGroup = { groupName: '', groupOrderID: 0 }

  try {
    ;[table, currentGroup] = await Promise.all([
      fetch('https://api.openligadb.de/getbltable/bl1/2025', {
        next: { revalidate: 1800 },
      }).then((r) => r.json()),
      fetch('https://api.openligadb.de/getcurrentgroup/bl1', {
        next: { revalidate: 1800 },
      }).then((r) => r.json()),
    ])
  } catch {
    return null
  }

  const rank = table.findIndex((t) => t.shortName === 'Freiburg') + 1
  const team = table.find((t) => t.shortName === 'Freiburg')

  if (!team || rank === 0) return null

  const matchday = currentGroup.groupOrderID

  return (
    <div className="bg-red-700 text-white py-2.5 overflow-hidden">
      <Marquee speed={50} gradient={true} pauseOnHover>
        <MarqueeItem team={team} rank={rank} matchday={matchday} />
        <MarqueeItem team={team} rank={rank} matchday={matchday} />
        <MarqueeItem team={team} rank={rank} matchday={matchday} />
        <MarqueeItem team={team} rank={rank} matchday={matchday} />
      </Marquee>
    </div>
  )
}
