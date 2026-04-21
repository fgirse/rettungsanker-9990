import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

declare global {
  var contactFormRedis: Redis | undefined
  var contactFormRateLimit: Ratelimit | undefined
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

export function getContactRateLimit(): Ratelimit | null {
  if (!redisUrl || !redisToken) {
    return null
  }

  if (!globalThis.contactFormRedis) {
    globalThis.contactFormRedis = Redis.fromEnv()
  }

  if (!globalThis.contactFormRateLimit) {
    globalThis.contactFormRateLimit = new Ratelimit({
      redis: globalThis.contactFormRedis,
      limiter: Ratelimit.slidingWindow(3, '10 m'),
      analytics: true,
      prefix: 'ratelimit:contact-form',
    })
  }

  return globalThis.contactFormRateLimit
}
