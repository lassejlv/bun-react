import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import type { SelectPost } from 'drizzle/schema'
import { toast } from 'sonner'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const posts = await api.get('/api/posts').json<SelectPost[]>()
    return { posts }
  },
})

function RouteComponent() {
  const router = useRouter()
  const { posts } = Route.useLoaderData()

  const CreatePost = useMutation({
    mutationFn: async (data: any) => {
      return await api.post('/api/posts', { json: data }).json<{ message: string; data: { id: string } }>()
    },
    onSuccess: (data) => {
      router.navigate({ to: '/post/$postId', params: { postId: data.data.id } })
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      <form
        className='container mx-auto py-12 flex flex-col gap-2'
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const title = formData.get('title') as string
          const content = formData.get('content') as string
          CreatePost.mutate({ title, content })
        }}
      >
        <Input type='text' name='title' placeholder='Title' />
        <Textarea cols={10} name='content' placeholder='Content' />
        <Button type='submit' disabled={CreatePost.isPending}>
          {CreatePost.isPending ? 'Creating...' : 'Create Post'}
        </Button>

        <h3 className='text-2xl font-bold'>Posts</h3>
        <p>Here is a list of posts</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to='/post/$postId' params={{ postId: post.id }}>
                      <Button>Read more</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : (
            <>No posts found</>
          )}
        </div>
      </form>
    </>
  )
}
