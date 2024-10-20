import { checkIfSessionExists } from '@/_actions/auth'
import { redirect } from 'next/navigation'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  // HACK: Since Redis can't be called in middleware (edge runtime), we are checking if the session exists here.
  const res = await checkIfSessionExists()
  if (!res) {
    redirect('/')
  }
  return <>{children}</>
}

export default AuthLayout
