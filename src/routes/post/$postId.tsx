import { api } from '@/lib/api'
import { createFileRoute, notFound } from '@tanstack/react-router'
import type { SelectPost } from 'drizzle/schema'

export const Route = createFileRoute('/post/$postId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const post = await api.get(`/api/posts/${params.postId}`).json<SelectPost>()
    return { post }
  },
  onError: () => {
    throw notFound()
  },
})

function RouteComponent() {
  const { post } = Route.useLoaderData()
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  )
}
