import { env } from 'bun'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

export const db = drizzle({
  connection: {
    url: env.TURSO_URL,
    authToken: env.TURSO_TOKEN,
  },
  schema,
  logger: true,
})
