import { NextResponse, type NextRequest } from 'next/server'
import {
  istSprachCode,
  pfadOhneSprache,
  SPRACH_COOKIE,
  STANDARD_SPRACHE,
} from '@/i18n/sprachen'

// Sorgt dafür, dass jede Seite unter /[locale]/… gerendert wird, obwohl
// Deutsch in der Adresse ohne Kürzel bleibt:
//   /impressum      → intern /de/impressum (Adresse bleibt sichtbar gleich)
//   /de/impressum   → Umleitung auf /impressum (keine doppelten Adressen für Google)
//   /fr/impressum   → unverändert
// Hat der Besucher früher eine andere Sprache gewählt, wird eine Adresse ohne
// Kürzel auf seine Sprache umgeleitet – so landen auch alte Links richtig.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const erster = pathname.split('/')[1]

  if (erster === STANDARD_SPRACHE) {
    const ziel = req.nextUrl.clone()
    ziel.pathname = pfadOhneSprache(pathname)
    return NextResponse.redirect(ziel)
  }

  if (istSprachCode(erster)) return NextResponse.next()

  const gewaehlt = req.cookies.get(SPRACH_COOKIE)?.value
  if (istSprachCode(gewaehlt) && gewaehlt !== STANDARD_SPRACHE) {
    const ziel = req.nextUrl.clone()
    ziel.pathname = `/${gewaehlt}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(ziel)
  }

  const ziel = req.nextUrl.clone()
  ziel.pathname = `/${STANDARD_SPRACHE}${pathname}`
  return NextResponse.rewrite(ziel)
}

export const config = {
  // Admin, API, Testroute, Next-Interna und alle Dateien mit Endung (Bilder, Videos, SVGs …) auslassen
  matcher: ['/((?!admin|api|my-route|_next|_vercel|.*\\..*).*)'],
}
