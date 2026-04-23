/**
 * Promotes a user to the 'admin' role by email.
 * Usage: bun run promote:admin [email]
 * Default email: admin@rettungsanker-freiburg.de
 */
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const email = process.argv[2] ?? 'admin@rettungsanker-freiburg.de'

const payload = await getPayload({ config })

const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})

if (!docs.length) {
  console.error(`No user found with email: ${email}`)
  process.exit(1)
}

const user = docs[0]

if (user.role === 'admin') {
  console.log(`User ${email} already has role 'admin'. Nothing to do.`)
  process.exit(0)
}

await payload.update({
  collection: 'users',
  id: user.id,
  data: { role: 'admin' },
})

console.log(`Successfully promoted ${email} to 'admin'.`)
process.exit(0)
