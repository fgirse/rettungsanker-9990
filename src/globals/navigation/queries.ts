import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { SprachCode } from '@/i18n/sprachen'

const slug = 'navigation'

export const CACHE_TAG = `global_${slug}`

export async function getNavigation(locale: SprachCode) {
  try {
    const payload = await getPayload({ config: configPromise })

    const global = await payload.findGlobal({
      slug,
      depth: 2,
      locale,
    })

    return global
  } catch (error) {
    console.error('[navigation] Failed to fetch navigation global:', error)
    return null
  }
}

// Die Sprache wird von unstable_cache automatisch in den Cache-Schlüssel aufgenommen,
// jede Sprache hat also ihren eigenen Eintrag. Speichern im Admin leert alle über den Tag.
export const getCachedNavigation = unstable_cache(
  async (locale: SprachCode) => getNavigation(locale),
  [slug],
  {
    tags: [CACHE_TAG],
    revalidate: 3600,
  },
)
