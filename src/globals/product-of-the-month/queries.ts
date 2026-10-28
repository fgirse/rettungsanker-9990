import { getPayload } from 'payload'
import config from '@/payload.config'
import type { SprachCode } from '@/i18n/sprachen'

export async function getProductOfTheMonth(locale: SprachCode) {
  const payload = await getPayload({ config })

  try {
    const productOfTheMonth = await payload.findGlobal({
      slug: 'productOfTheMonth' as any,
      // depth 1 liefert das Bild als Objekt mit url, bei 0 käme nur die ID
      depth: 1,
      locale,
    })

    return productOfTheMonth
  } catch (error) {
    console.error('Error fetching product of the month:', error)
    return null
  }
}
