// Kleine Helfer für die Blog-Formulare im Browser. Sie sprechen direkt die REST-API von
// Payload an (/api/…); der Login-Cookie wird automatisch mitgeschickt.

export type ApiAntwort<T = unknown> = { ok: boolean; status: number; daten: T | null }

export async function api<T = unknown>(
  pfad: string,
  init: RequestInit = {},
): Promise<ApiAntwort<T>> {
  const istFormular = init.body instanceof FormData
  try {
    const res = await fetch(pfad, {
      credentials: 'include',
      ...init,
      // Bei FormData setzt der Browser den Content-Type samt Trennzeichen selbst
      headers: istFormular ? init.headers : { 'Content-Type': 'application/json', ...init.headers },
    })
    const daten = (await res.json().catch(() => null)) as T | null
    return { ok: res.ok, status: res.status, daten }
  } catch {
    return { ok: false, status: 0, daten: null }
  }
}

// Sammelt Feldnamen und Meldungen aus einer Payload-Fehlerantwort,
// z. B. ["email"] wenn die Adresse schon vergeben ist
export function fehlerDetails(daten: unknown): { pfade: string[]; text: string } {
  const fehler = (
    daten as { errors?: { message?: string; data?: { errors?: { path?: string }[] } }[] }
  )?.errors
  const pfade = fehler?.flatMap((f) => f.data?.errors?.map((e) => e.path ?? '') ?? []) ?? []
  const text = fehler?.map((f) => f.message ?? '').join(' ') ?? ''
  return { pfade, text }
}

// Nur interne Weiterleitungsziele zulassen, sonst könnte ein präparierter Link nach dem Login
// auf eine fremde Seite führen
export function sicheresZiel(ziel: string | null | undefined, ersatz: string) {
  return ziel && ziel.startsWith('/') && !ziel.startsWith('//') ? ziel : ersatz
}

// Fotos vor dem Hochladen verkleinern und von Kameradaten befreien: Handyfotos haben oft
// 5–10 MB, Vercel nimmt aber höchstens 4,5 MB pro Anfrage an. SVGs bleiben unverändert.
const ERLAUBT = ['image/jpeg', 'image/png', 'image/svg+xml']
const MAX_KANTE = 2400
const ZIEL_BYTES = 3.5 * 1024 * 1024

export class BildFehler extends Error {
  constructor(
    public art: 'typ' | 'gross',
    public datei: string,
  ) {
    super(art)
  }
}

export async function bildVorbereiten(datei: File): Promise<File> {
  if (!ERLAUBT.includes(datei.type)) throw new BildFehler('typ', datei.name)
  if (datei.type === 'image/svg+xml') {
    if (datei.size > 4 * 1024 * 1024) throw new BildFehler('gross', datei.name)
    return datei
  }

  const bitmap = await createImageBitmap(datei)
  const faktor = Math.min(1, MAX_KANTE / Math.max(bitmap.width, bitmap.height))
  // Jedes Foto wird neu gezeichnet und gespeichert, auch kleine. Dabei fallen die eingebetteten
  // Kameradaten (EXIF, oft mit Aufnahmeort) weg – so steht es auch in der Datenschutzerklärung.
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * faktor)
  canvas.height = Math.round(bitmap.height * faktor)
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const alsBlob = (typ: string, qualitaet?: number) =>
    new Promise<Blob | null>((ok) => canvas.toBlob(ok, typ, qualitaet))

  let typ = datei.type
  let blob = await alsBlob(typ, 0.85)
  // PNG-Fotos bleiben oft zu groß; dann als JPEG speichern (Transparenz geht dabei verloren)
  if (!blob || blob.size > ZIEL_BYTES) {
    typ = 'image/jpeg'
    blob = await alsBlob(typ, 0.8)
  }
  if (!blob || blob.size > 4 * 1024 * 1024) throw new BildFehler('gross', datei.name)

  const name = typ === datei.type ? datei.name : datei.name.replace(/\.\w+$/, '') + '.jpg'
  return new File([blob], name, { type: typ })
}
