'use client'
import { useState } from 'react'
import { IoLogIn } from 'react-icons/io5'
import { Login as LoginForm } from '@/_components/forms'

const Login = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center py-1 px-1 pr-2 rounded-full border shadow-md transition-all duration-150 ease-in-out border-sky-100 text-sky-100 hover:brightness-125"
      >
        <IoLogIn className="inline mr-2 text-xl" />
        Login
      </button>
      {open && <LoginForm close={() => setOpen(false)} />}
    </>
  )
}

export default Login
