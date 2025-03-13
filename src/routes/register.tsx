import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <form className='container mx-auto py-12 flex flex-col gap-2'>
      <Input type='text' name='name' placeholder='Name' required />
      <Input type='email' name='email' placeholder='Email' required />

      <PasswordInput name='password' placeholder='Password' required />

      <Button type='submit'>Register</Button>
    </form>
  )
}
