import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, notFound, useRouter } from '@tanstack/react-router'
import type { SelectPost } from 'drizzle/schema'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/post/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const post = await api.get(`/api/posts/${params.slug}`).json<SelectPost>()
    return { post }
  },
  onError: () => {
    throw notFound()
  },
})

function RouteComponent() {
  const { post } = Route.useLoaderData()

  const router = useRouter()

  const deletePost = useMutation({
    mutationFn: async () => {
      const confirm = window.confirm('Are you sure you want to delete this post?')
      if (!confirm) throw new Error('Cancelled')
      return await api.delete(`/api/posts/${post.slug}`).json<{ message: string }>()
    },
    onSuccess: (data) => {
      toast.success(data.message)
      router.navigate({ to: '/' })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <Button variant='destructive' onClick={() => deletePost.mutate()} disabled={deletePost.isPending}>
        <Trash />
      </Button>
    </>
  )
}
