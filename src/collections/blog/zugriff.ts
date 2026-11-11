import type { CollectionConfig, GlobalConfig, PayloadRequest, Where } from 'payload'

// Wer ist angemeldet? Zwei Sorten Konten teilen sich den Login-Cookie:
// „users“ = Team im Admin, „mitglieder“ = registrierte Blog-Schreiber.
export const istTeam = (req: PayloadRequest) => req.user?.collection === 'users'
export const istMitglied = (req: PayloadRequest) => req.user?.collection === 'mitglieder'
export const istAngemeldet = (req: PayloadRequest) => Boolean(req.user)

// Lesen: Team sieht alles, Mitglieder sehen Sichtbares und ihre eigenen Einträge, Gäste nichts.
export const lesenSichtbarOderEigen = ({ req }: { req: PayloadRequest }): boolean | Where => {
  if (istTeam(req)) return true
  if (istMitglied(req)) {
    return { or: [{ status: { equals: 'sichtbar' } }, { autor: { equals: req.user!.id } }] }
  }
  return false
}

// Ändern/Löschen: Team immer, Mitglieder nur ihre eigenen Einträge
export const nurEigeneOderTeam = ({ req }: { req: PayloadRequest }): boolean | Where => {
  if (istTeam(req)) return true
  if (istMitglied(req)) return { autor: { equals: req.user!.id } }
  return false
}

export const anlegenAngemeldet = ({ req }: { req: PayloadRequest }) =>
  istTeam(req) || istMitglied(req)

export const nurTeam = ({ req }: { req: PayloadRequest }) => istTeam(req)

// Setzt Autor und Status serverseitig, egal was der Browser mitschickt.
// Mitglieder können sich so weder als jemand anderes ausgeben noch ausgeblendete Einträge wieder einblenden.
export function autorUndStatusSichern({
  data,
  operation,
  originalDoc,
  req,
}: {
  data: Record<string, unknown>
  operation: 'create' | 'update'
  originalDoc?: Record<string, unknown>
  req: PayloadRequest
}) {
  if (operation === 'create' && req.user) {
    const user = req.user as { id: string; name?: string | null; collection: string }
    data.autor = istMitglied(req) ? user.id : undefined
    data.autorName = user.name || 'Rettungsanker-Team'
    if (!istTeam(req)) data.status = 'sichtbar'
  }
  if (operation === 'update' && !istTeam(req) && originalDoc) {
    data.autor = originalDoc.autor
    data.autorName = originalDoc.autorName
    data.status = originalDoc.status
  }
  return data
}

// Payload erlaubt jede Aktion ohne eigene Regel automatisch allen angemeldeten Konten.
// Seit es Blog-Mitglieder gibt, wären das auch sie (z. B. Getränkekarte ändern oder
// ein Admin-Konto anlegen). Diese Hülle setzt für alle fehlenden Regeln „nur Team“.
const COLLECTION_AKTIONEN = [
  'create',
  'read',
  'update',
  'delete',
  'readVersions',
  'unlock',
] as const
const GLOBAL_AKTIONEN = ['read', 'update', 'readVersions'] as const

export function teamStandard<T extends CollectionConfig>(config: T): T {
  const access = { ...config.access }
  for (const aktion of COLLECTION_AKTIONEN) access[aktion] ??= nurTeam
  return { ...config, access }
}

export function teamStandardGlobal<T extends GlobalConfig>(config: T): T {
  const access = { ...config.access }
  for (const aktion of GLOBAL_AKTIONEN) access[aktion] ??= nurTeam
  return { ...config, access }
}
