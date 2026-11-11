import { APIError, type CollectionConfig } from 'payload'
import { bestaetigungsMail, passwortMail } from './mails'
import { istMitglied, istTeam } from './zugriff'

// Registrierte Blog-Schreiber. Bewusst getrennt von „users“ (Team mit Admin-Zugang):
// Mitglieder können sich nur im Blog anmelden, nie im Admin.
export const Mitglieder: CollectionConfig = {
  slug: 'mitglieder',
  labels: { singular: 'Blog-Mitglied', plural: 'Blog-Mitglieder' },
  admin: {
    useAsTitle: 'name',
    group: 'Blog',
    defaultColumns: ['name', 'email', '_verified', 'createdAt'],
  },
  auth: {
    // Login erst nach Klick auf den Bestätigungslink – so gibt es keine Konten mit Fantasie-Adressen
    verify: bestaetigungsMail,
    forgotPassword: passwortMail,
    // Schutz gegen Passwort-Raten: nach 5 Fehlversuchen 10 Minuten Sperre
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    // Angemeldet bleiben für 14 Tage
    tokenExpiration: 60 * 60 * 24 * 14,
  },
  access: {
    admin: () => false,
    // Registrieren darf nur, wer nicht angemeldet ist (oder das Team im Admin).
    // Sonst könnte ein Mitglied über die API weitere, schon „bestätigte“ Konten anlegen.
    create: ({ req }) => !req.user || istTeam(req),
    read: ({ req }) =>
      istTeam(req) ? true : istMitglied(req) ? { id: { equals: req.user!.id } } : false,
    update: ({ req }) =>
      istTeam(req) ? true : istMitglied(req) ? { id: { equals: req.user!.id } } : false,
    delete: ({ req }) => istTeam(req),
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Mindestlänge auch serverseitig prüfen, das Formular allein reicht nicht
        if (
          operation === 'create' &&
          typeof data?.password === 'string' &&
          data.password.length < 8
        ) {
          throw new APIError(
            'Passwort zu kurz',
            400,
            [{ path: 'password', message: 'min 8' }],
            true,
          )
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Anzeigename',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 60,
    },
  ],
}
