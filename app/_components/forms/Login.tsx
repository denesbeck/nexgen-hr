'use client'
import { Backdrop, Button, InputField } from '@/_components'
import { MdLockOutline } from 'react-icons/md'
import { IoMdArrowDroprightCircle } from 'react-icons/io'
import { useClickOutside } from '@/_hooks'
import { useState } from 'react'

interface LoginProps {
  close: () => void
}

const Login = ({ close }: LoginProps) => {
  const ref = useClickOutside<HTMLDivElement>(close)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Backdrop>
      <div
        ref={ref}
        className="flex flex-col p-8 bg-white rounded-md w-[30rem] max-w-[90vw] animate-slideInFromBottom"
      >
        <div className="flex items-center space-x-3">
          <div className="p-4 w-max bg-cyan-500 rounded-full">
            <MdLockOutline className="text-white min-h-6 min-w-6" />
          </div>
          <h1 className="text-2xl text-slate-800">Sign in</h1>
        </div>
        <p className="my-2 text-slate-400">
          Sign in to your account to access your workspace.
        </p>
        <div className="flex flex-col gap-3">
          <InputField
            label="Email"
            value={email}
            handler={(value: string) => setEmail(value)}
          />
          <InputField
            label="Password"
            value={password}
            handler={(value: string) => setPassword(value)}
            isPassword={true}
          />
        </div>
        <div className="flex justify-end items-start mt-4 w-full">
          <p className="mr-auto text-left text-blue-400">
            Forgot your password?
          </p>
          <Button
            action={() => console.log('Continue')}
            variant="secondary-solid"
            label="Continue"
            iconPosition="right"
            icon={<IoMdArrowDroprightCircle className="inline ml-2 text-2xl" />}
          />
        </div>
      </div>
    </Backdrop>
  )
}

export default Login
