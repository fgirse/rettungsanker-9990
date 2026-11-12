// Blog-Knopf als rot-weißer Rettungsring, der an einem Haken hängt.
// Beim Drüberfahren (oder Fokus per Tastatur) pendelt er aus; die Animation steht in styles.css
// unter „Rettungsring“ und wird von der Elternklasse .rettungsring ausgelöst.
// „klein“ zeigt den Ring ohne Haken, z. B. neben dem Wort „Blog“ im Handy-Menü.
export function Rettungsring({ klein = false }: { klein?: boolean }) {
  return (
    <svg
      className={klein ? 'rettungsring-bild rettungsring-klein' : 'rettungsring-bild'}
      viewBox={klein ? '0 6 64 64' : '0 0 64 70'}
      aria-hidden="true"
    >
      {/* Haken oben, an dem der Ring pendelt */}
      {!klein && <path d="M32 0 v4 q0 3 -3 3" stroke="#a8a29e" strokeWidth="1.6" fill="none" />}
      <g className="rettungsring-schwinger" transform="translate(0 6)">
        {/* Weißer Ring, darüber rote Felder als Strichmuster: Umfang 2π·20 ≈ 125,7 → 8 Felder à 15,7 */}
        <circle cx="32" cy="32" r="20" fill="none" stroke="#f7f3ea" strokeWidth="12" />
        <circle
          cx="32"
          cy="32"
          r="20"
          fill="none"
          stroke="#d3202e"
          strokeWidth="12"
          strokeDasharray="15.71 15.71"
          transform="rotate(-112.5 32 32)"
        />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#7a1d14" strokeOpacity=".35" strokeWidth=".8" />
        <circle cx="32" cy="32" r="14" fill="none" stroke="#7a1d14" strokeOpacity=".35" strokeWidth=".8" />
        {/* Greifleine mit vier Bindungen */}
        <circle cx="32" cy="32" r="23" fill="none" stroke="#c9a46a" strokeWidth="1.6" strokeDasharray="2.2 1" />
        <g fill="#c9a46a">
          <rect x="30.5" y="5" width="3" height="7" rx="1" />
          <rect x="30.5" y="52" width="3" height="7" rx="1" />
          <rect x="5" y="30.5" width="7" height="3" rx="1" />
          <rect x="52" y="30.5" width="7" height="3" rx="1" />
        </g>
        {/* Messingschild mit Aufschrift, damit der Zweck auch klein erkennbar ist */}
        <rect x="17.5" y="26.5" width="29" height="11" rx="2.5" fill="#e0a62a" stroke="#7a5212" strokeWidth=".8" />
        <text
          x="32"
          y="35"
          textAnchor="middle"
          fontSize="8.4"
          fontWeight="700"
          fill="#2a1a08"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          BLOG
        </text>
      </g>
    </svg>
  )
}
