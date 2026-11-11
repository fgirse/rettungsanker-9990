'use client'

import { useState } from 'react'
import { api } from '@/lib/blog/api'

// Meldet ab und lädt die Anmeldeseite komplett neu, damit keine Blog-Inhalte im Speicher bleiben
export function AbmeldenKnopf({ text, ziel }: { text: string; ziel: string }) {
  const [laeuft, setLaeuft] = useState(false)
  return (
    <button
      type="button"
      disabled={laeuft}
      onClick={async () => {
        setLaeuft(true)
        // Abmelden über die Sammlung des angemeldeten Kontos; „users“ als Ersatz fürs Team
        const res = await api('/api/mitglieder/logout', { method: 'POST' })
        if (!res.ok) await api('/api/users/logout', { method: 'POST' })
        window.location.assign(ziel)
      }}
      className="rounded-lg border border-zinc-600 px-4 py-1.5 font-sans text-sm text-zinc-300 transition-colors hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-50"
    >
      {text}
    </button>
  )
}
