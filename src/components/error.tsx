import { Button } from './ui/button'

export default function Error({ error }: { error: Error }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold'>Error</h1>
      <p>{error.message}</p>

      <pre className='text-pink-500'>{error.stack}</pre>

      <Button onClick={() => location.reload()}>Reload Page</Button>
    </div>
  )
}
