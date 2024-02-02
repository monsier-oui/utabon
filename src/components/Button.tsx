import React from 'react'
import { tv } from 'tailwind-variants'

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  color?: 'primary' | 'normal'
  size?: 'sm' | 'md'
  children?: React.ReactNode
}

const style = tv({
  base: 'rounded-md border text-center font-medium transition-all',
  variants: {
    color: {
      normal:
        'border-neutral-100 bg-neutral-100 text-neutral-500 hover:border-neutral-200 hover:bg-neutral-200 disabled:border-neutral-50 disabled:bg-neutral-50 disabled:text-neutral-400',
      primary:
        'border-primary-500 bg-primary-500 text-white hover:border-primary-600 hover:bg-primary-600 disabled:border-primary-300 disabled:bg-primary-300',
    },
    size: {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
    },
  },
  defaultVariants: {
    color: 'normal',
    size: 'md',
  },
})

const Button: React.FC<Props> = ({
  type = 'button',
  color = 'normal',
  size = 'md',
  onClick,
  children,
  ...props
}) => (
  <button
    type={type}
    className={style({ color, size })}
    onClick={onClick}
    {...props}>
    {children}
  </button>
)

export default Button
