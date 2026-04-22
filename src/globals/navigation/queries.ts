import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

const slug = 'navigation'

export const CACHE_TAG = `global_${slug}`

export async function getNavigation() {
  try {
    const payload = await getPayload({ config: configPromise })

    const global = await payload.findGlobal({
      slug,
      depth: 2,
    })

    return global
  } catch (error) {
    console.error('[navigation] Failed to fetch navigation global:', error)
    return null
  }
}

export const getCachedNavigation = unstable_cache(async () => getNavigation(), [slug], {
  tags: [CACHE_TAG],
  revalidate: 3600,
})
