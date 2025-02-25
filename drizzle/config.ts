import { env } from 'bun'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: 'drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_TOKEN,
  },
  verbose: true,
  strict: true,
})
