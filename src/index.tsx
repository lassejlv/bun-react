import { env, serve } from 'bun'
import { db } from 'drizzle'
import { err, json } from './helpers/http'
import index from './index.html'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { post } from 'drizzle/schema'

const PostSchema = z.object({
  title: z.string().min(5).max(150),
  content: z.string().min(5).max(3000),
})

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    // Post routes
    '/api/posts': {
      GET: async () => json(await db.query.post.findMany()),
      POST: async (req) => {
        const body = await req.json()

        const parsed = PostSchema.safeParse(body)
        if (!parsed.success) {
          return json({ message: 'Invalid request body' }, 400)
        }

        const slug = parsed.data.title.toLowerCase().replace(/\s/g, '-')

        const slug_in_use = await db.query.post.findFirst({
          where: eq(post.slug, slug),
        })

        if (slug_in_use) {
          return err('Slug already in use', 400)
        }

        const new_post = await db
          .insert(post)
          .values({
            slug,
            title: parsed.data.title,
            content: parsed.data.content,
          })
          .returning({ slug: post.slug })

        return json({ message: 'Your post was created', data: new_post[0] })
      },
    },
    '/api/posts/:slug': {
      GET: async (req) => {
        const post_data = await db.query.post.findFirst({
          where: eq(post.slug, req.params.slug),
        })

        if (!post_data) {
          return err('Post not found', 404)
        }

        return json(post_data)
      },
      DELETE: async (req) => {
        const post_data = await db.query.post.findFirst({
          where: eq(post.slug, req.params.slug),
        })

        if (!post_data) {
          return err('Post not found', 404)
        }

        await db.delete(post).where(eq(post.slug, req.params.slug))

        return json({ message: 'Your post was deleted' })
      },
    },
  },

  development: env.NODE_ENV !== 'production',
})

console.log(`🚀 Server running at ${server.url}`)
