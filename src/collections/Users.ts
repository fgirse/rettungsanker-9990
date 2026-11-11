import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // aktiviert Admin Login
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor'],
      defaultValue: 'editor',
    },
  ],
  access: {
    // Nur Team-Konten mit Rolle admin; Blog-Mitglieder (eigene Sammlung) nie
    admin: ({ req: { user } }) => user?.collection === 'users' && user.role === 'admin',
  },
}
