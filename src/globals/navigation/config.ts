import type { GlobalConfig } from 'payload'
import { afterChangeHook } from './hooks'
import { slugField } from '../../fields/slug/config'

export const Navigation: GlobalConfig = {
  slug: 'navigation',

  fields: [
    {
      name: 'menuItems',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/menu-item-row-label#MenuItemRowLabel',
        },
      },
      fields: [
        {
          name: 'URL',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'subItems',
          label: 'Sub-Menu Items',
          type: 'array',
          admin: {
            initCollapsed: true,
            description: 'Add dropdown sub-items for this menu item',
          },
          fields: [
            {
              name: 'URL',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'text',
              required: false,
              localized: true,
              admin: {
                description: 'Optional description for the sub-item',
              },
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    afterChange: [afterChangeHook],
  },
}
