import FreiburgMarqueeClient from './FreiburgMarqueeClient'

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

export type FreiburgMarqueeData = {
  team: BundesligaTeam
  rank: number
  matchday: number
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
  const data: FreiburgMarqueeData = {
    team,
    rank,
    matchday,
  }

  return <FreiburgMarqueeClient data={data} />
}
