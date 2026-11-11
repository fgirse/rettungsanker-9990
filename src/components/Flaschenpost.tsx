import { useId } from 'react'

// Blog-Knopf als Flaschenpost: Die Flasche schaukelt auf kleinen Wellen. Beim Drüberfahren
// (oder Fokus per Tastatur) ploppt der Korken und ein Zettel rollt nach unten aus dem Hals.
// Die Animationen stehen in styles.css unter „Flaschenpost“; die Elternklasse .flaschenpost löst sie aus.
export function Flaschenpost({ zettel, klein = false }: { zettel?: string; klein?: boolean }) {
  // Eindeutige Verlaufs-ID, falls die Flasche mehrfach auf der Seite steht (Desktop und Handy-Menü)
  const verlauf = `flaschenglas-${useId().replace(/:/g, '')}`
  return (
    <span className={`flaschenpost-buehne ${klein ? 'flaschenpost-klein' : ''}`} aria-hidden="true">
      <svg className="flaschenpost-flasche" viewBox="0 0 104 44">
        <defs>
          <linearGradient id={verlauf} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5fbf93" stopOpacity=".85" />
            <stop offset=".5" stopColor="#2f7d5a" stopOpacity=".8" />
            <stop offset="1" stopColor="#1c4d37" stopOpacity=".9" />
          </linearGradient>
        </defs>
        <path
          d="M6 10 Q2 10 2 22 Q2 34 6 34 L58 34 Q66 34 72 28 L84 26 L84 18 L72 16 Q66 10 58 10 Z"
          fill={`url(#${verlauf})`}
          stroke="#a7f3d0"
          strokeOpacity=".5"
        />
        {/* Eingerollter Brief mit Aufschrift, damit man die Flasche auch ohne Drüberfahren versteht */}
        <rect x="11" y="14" width="46" height="16" rx="8" fill="#f1e3c2" />
        <text
          x="34"
          y="25.5"
          textAnchor="middle"
          fontSize="10"
          fill="#7a1d0e"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          BLOG
        </text>
        <path
          d="M8 14 Q20 12 40 13"
          stroke="#fff"
          strokeOpacity=".5"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          className="flaschenpost-korken"
          x="84"
          y="17"
          width="12"
          height="10"
          rx="2"
          fill="#b07a3c"
          stroke="#6b4520"
        />
      </svg>
      {zettel && <span className="flaschenpost-zettel">{zettel}</span>}
      <span className="flaschenpost-welle" />
    </span>
  )
}
