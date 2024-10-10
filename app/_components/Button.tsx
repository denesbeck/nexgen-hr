import { ReactElement } from 'react'

interface ButtonProps {
  variant:
    | 'primary-solid'
    | 'primary-outline'
    | 'secondary-solid'
    | 'secondary-outline'
  label: string
  action: () => void
  icon?: ReactElement
  iconPosition?: 'left' | 'right'
  wide?: boolean
}

const Button = ({
  variant = 'primary-solid',
  label,
  action,
  icon,
  iconPosition = 'left',
  wide = false,
}: ButtonProps) => {
  const VARIANTS = {
    'primary-solid': 'bg-cyan-500 text-white',
    'primary-outline': 'text-cyan-500 border border-cyan-500',
    'secondary-solid': 'bg-slate-400 text-white',
    'secondary-outline': 'text-slate-400 border border-slate-400',
  }

  return (
    <button
      onClick={action}
      className={`flex ${wide ? 'w-full' : 'w-max'} items-center justify-center rounded-full ${VARIANTS[variant]} px-4 py-2 text-lg shadow-md transition-all duration-150 ease-in-out hover:brightness-110`}
    >
      {iconPosition === 'left' && icon}
      <span>{label}</span>
      {iconPosition === 'right' && icon}
    </button>
  )
}

export default Button
