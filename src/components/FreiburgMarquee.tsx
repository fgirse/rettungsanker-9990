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

type CurrentMatch = {
  leagueSeason: number
  group: { groupOrderID: number }
}

export type FreiburgMarqueeData = {
  team: BundesligaTeam
  rank: number
  matchday: number
}

// ── Server component ───────────────────────────────────────────────────────────

export default async function FreiburgMarquee() {
  let table: BundesligaTeam[] = []
  let matchday = 0

  try {
    // Saison und Spieltag aus den Spielen des aktuellen Spieltags lesen.
    // Vorher war die Saison fest eingetragen, nach dem Saisonwechsel kam so die alte Tabelle.
    const matches: CurrentMatch[] = await fetch('https://api.openligadb.de/getmatchdata/bl1', {
      next: { revalidate: 1800 },
    }).then((r) => r.json())

    // Ersatzwert: Die Saison beginnt im Juli und heißt nach ihrem Startjahr
    const now = new Date()
    const season =
      matches[0]?.leagueSeason ?? (now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1)
    matchday = matches[0]?.group.groupOrderID ?? 0

    table = await fetch(`https://api.openligadb.de/getbltable/bl1/${season}`, {
      next: { revalidate: 1800 },
    }).then((r) => r.json())
  } catch {
    return null
  }

  const rank = table.findIndex((t) => t.shortName === 'Freiburg') + 1
  const team = table.find((t) => t.shortName === 'Freiburg')

  if (!team || rank === 0) return null

  const data: FreiburgMarqueeData = {
    team,
    rank,
    matchday,
  }

  return <FreiburgMarqueeClient data={data} />
}
