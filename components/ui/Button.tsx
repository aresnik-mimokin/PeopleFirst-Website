import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full',
    'text-sm font-semibold font-display tracking-wide',
    'transition-all duration-200 focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-purple-700 text-white hover:bg-purple-600 shadow-lg shadow-purple-700/25 hover:shadow-purple-600/30',
        outline:
          'border border-purple-700/50 text-purple-400 hover:bg-purple-700/10 hover:border-purple-600',
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'text-purple-400 underline-offset-4 hover:underline p-0 h-auto',
        gradient:
          'bg-gradient-to-r from-purple-700 to-blue-500 text-white hover:from-purple-600 hover:to-blue-400 shadow-lg shadow-purple-700/25',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-8 text-base',
        xl: 'h-14 px-10 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
