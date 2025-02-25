import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

const generateDate = () => sql`current_timestamp`

export const post = sqliteTable('posts', () => ({
  id: text()
    .primaryKey()
    .$defaultFn(() => Bun.randomUUIDv7()),
  slug: text().notNull().unique(),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: text().notNull().$defaultFn(generateDate),
  updatedAt: text().notNull().$defaultFn(generateDate).$onUpdateFn(generateDate),
}))

export type SelectPost = typeof post.$inferSelect
export type InsertPost = typeof post.$inferInsert
