import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Error from '@/components/error'
import Loading from '@/components/loading'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
  component: Root,
  errorComponent: Error,
  pendingComponent: Loading,
})

function Root() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='bottom-center' />
      <Outlet />
    </QueryClientProvider>
  )
}
