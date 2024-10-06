'use client'
import { Backdrop, Button, InputField } from '@/_components'
import { MdLockOutline } from 'react-icons/md'
import { IoMdArrowDroprightCircle } from 'react-icons/io'
import { useClickOutside } from '@/_hooks'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

interface LoginProps {
  close: () => void
}

const Login = ({ close }: LoginProps) => {
  const ref = useClickOutside<HTMLDivElement>(close)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handelSignIn = async () => {
    const response = await signIn('Cognito', {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: '/workspace',
    })

    if (response?.ok) {
      location.replace('/workspace')
    } else {
      console.log(response?.error)
    }
  }
  return (
    <Backdrop>
      <div
        ref={ref}
        className="flex w-[30rem] max-w-[90vw] animate-slideInFromBottom flex-col rounded-md bg-white p-8"
      >
        <div className="flex items-center space-x-3">
          <div className="w-max rounded-full bg-cyan-500 p-4">
            <MdLockOutline className="min-h-6 min-w-6 text-white" />
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
        <div className="mt-4 flex w-full items-start justify-end">
          <p className="mr-auto text-left text-blue-400">
            Forgot your password?
          </p>
          <Button
            action={handelSignIn}
            variant="secondary-solid"
            label="Continue"
            iconPosition="right"
            icon={<IoMdArrowDroprightCircle className="ml-2 inline text-2xl" />}
          />
        </div>
      </div>
    </Backdrop>
  )
}

export default Login
