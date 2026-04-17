import type { CollectionConfig } from 'payload'

export const Getraenkekarte: CollectionConfig = {
  slug: 'getraenkekarte',
  labels: {
    singular: 'Getränk / Speise',
    plural: 'Getränkekarte',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'artikel',
    group: 'Getränkekarte',
    defaultColumns: ['artikel', 'kategorie', 'volumen', 'preis'],
  },
  fields: [
    {
      name: 'kategorie',
      type: 'select',
      required: true,
      label: 'Kategorie',
      options: [
        { label: 'Biere', value: 'biere' },
        { label: 'Weine', value: 'weine' },
        { label: 'Cocktails & Longdrinks', value: 'cocktails-longdrinks' },
        { label: 'Softdrinks', value: 'softdrinks' },
        { label: 'Kaffee & Tee', value: 'kaffee-tee' },
        { label: 'Snacks', value: 'snacks' },
      ],
    },
    {
      name: 'artikel',
      type: 'text',
      required: true,
      label: 'Artikel',
    },
    {
      name: 'beschreibung',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'volumen',
      type: 'text',
      label: 'Volumen / Menge',
      admin: {
        placeholder: 'z.B. 0,5 Liter · 1 Tasse · 100g',
      },
    },
    {
      name: 'preis',
      type: 'text',
      required: true,
      label: 'Preis (€)',
      admin: {
        placeholder: 'z.B. 4,90',
      },
    },
    {
      name: 'sortierung',
      type: 'number',
      label: 'Sortierung',
      defaultValue: 99,
      admin: {
        description: 'Niedrigere Zahl = weiter oben in der Liste',
      },
    },
  ],
}
