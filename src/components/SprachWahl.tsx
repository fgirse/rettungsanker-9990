'use client'

import { Check, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Flagge } from '@/components/Flaggen'
import { MastFlagge } from '@/components/MastFlagge'
import { useSprache } from '@/i18n/SprachProvider'
import { findeSprache, SPRACHEN } from '@/i18n/sprachen'
import { texte } from '@/i18n/texte'

export function SprachWahl() {
  const { sprache, setzeSprache } = useSprache()

  return (
    <DropdownMenu modal={false}>
      {/* Das Mastbild selbst ist der Auslöser – spart in der vollen Kopfzeile einen eigenen Knopf */}
      <DropdownMenuTrigger
        aria-label={`${texte(sprache).spracheWaehlen} ${findeSprache(sprache).name}`}
        className="group relative rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
      >
        <MastFlagge className="h-16 transition-transform group-hover:scale-105 group-data-[state=open]:scale-105 2xl:h-20" />
        {/* Abzeichen unten rechts: zeigt, dass sich hier ein Menü öffnet */}
        <span className="absolute -right-1.5 -bottom-1.5 flex items-center gap-0.5 rounded-md bg-stone-800 px-1 py-0.5 text-foreground shadow ring-1 ring-yellow-600/80 group-hover:bg-yellow-600 group-data-[state=open]:bg-yellow-600">
          <Flagge code={sprache} className="h-2.5 w-4 rounded-[1px]" />
          <ChevronDown className="size-3" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark z-[110] min-w-44 rounded-xl border-stone-600 bg-stone-800 p-1.5">
        {SPRACHEN.map((s) => (
          <DropdownMenuItem
            key={s.code}
            lang={s.code}
            onSelect={() => setzeSprache(s.code)}
            className="gap-3 rounded-md py-2 font-sans text-base text-foreground focus:bg-yellow-600"
          >
            <Flagge code={s.code} className="h-4 w-6 shrink-0 rounded-[2px] ring-1 ring-black/30" />
            <span className="flex-1">{s.name}</span>
            {s.code === sprache && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
