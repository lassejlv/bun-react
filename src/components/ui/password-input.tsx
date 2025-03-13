import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className='relative'>
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} {...props} />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff className='h-4 w-4 text-muted-foreground cursor-pointer' /> : <Eye className='h-4 w-4 text-muted-foreground cursor-pointer' />}
      </Button>
    </div>
  )
}

export default function PasswordInputDemo() {
  return (
    <div className='w-full max-w-sm space-y-2'>
      <label htmlFor='password' className='text-sm font-medium'>
        Password
      </label>
      <PasswordInput id='password' placeholder='Enter your password' />
    </div>
  )
}
