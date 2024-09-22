'use client'
import { ChangeEvent, useState } from 'react'
import { FaRegEye, FaCircleNotch, FaRegEyeSlash } from 'react-icons/fa'

interface InputFieldProps {
  label: string
  autoFocus?: boolean
  disabled?: boolean
  isPassword?: boolean
  uppercase?: boolean
  value: string
  handler: (value: string) => void
  handlerEnter?: () => void
  minLength?: number
  maxLength?: number
  lengthIndicator?: boolean
  loading?: boolean
}

const InputField = ({
  label,
  autoFocus = false,
  disabled = false,
  isPassword = false,
  uppercase,
  value,
  handler,
  handlerEnter,
  minLength,
  maxLength,
  lengthIndicator = false,
  loading = false,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isExposed, setIsExposed] = useState(!isPassword)

  const exposeSwitch = (
    <button
      onClick={() => setIsExposed((currentState) => !currentState)}
      className="absolute right-2 bottom-2 z-20 px-0.5 w-7 h-7 text-gray-500 rounded-full outline-none hover:bg-gray-100 focus-visible:outline-carbon-outline"
    >
      {isExposed ? (
        <FaRegEyeSlash className="w-full h-full" />
      ) : (
        <FaRegEye className="w-full h-full" />
      )}
    </button>
  )

  return (
    <div className="grid relative w-full h-max">
      {loading && (
        <FaCircleNotch className="absolute right-2 bottom-2 w-5 h-5 text-blue-400 animate-spin" />
      )}
      <input
        onKeyDown={(e) => e.key === 'Enter' && handlerEnter && handlerEnter()}
        minLength={minLength}
        maxLength={maxLength}
        autoFocus={autoFocus}
        autoCorrect="off"
        autoComplete="off"
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={uppercase ? value.toUpperCase() : value}
        type={isExposed ? 'text' : 'password'}
        className={`relative z-10 box-border h-[3.5rem] w-full rounded-md border border-gray-300 bg-transparent px-2 pt-4 text-base text-gray-500 outline-none focus:border-blue-400 disabled:border-transparent disabled:bg-gray-100 disabled:text-gray-400 ${
          isPassword && 'pr-10'
        } ${typeof loading !== 'undefined' && 'pr-10'}`}
        onChange={(e: ChangeEvent) =>
          handler(
            uppercase
              ? (e.target as HTMLInputElement).value.toUpperCase()
              : (e.target as HTMLInputElement).value
          )
        }
      />
      <label
        className={`absolute left-2 top-[1rem] block w-full text-base font-normal transition-all duration-200 ease-in-out ${
          (isFocused || value?.length) && '-translate-y-2.5 text-xs'
        } ${isFocused && !disabled ? 'text-blue-400' : 'text-gray-500'} ${disabled && 'z-20 text-gray-500'}`}
      >
        {label}
      </label>
      {isPassword && exposeSwitch}
      {lengthIndicator && maxLength && (
        <span className="absolute right-1 -bottom-5 text-xs text-gray-500">{`${value.length}/${maxLength}`}</span>
      )}
    </div>
  )
}

export default InputField
