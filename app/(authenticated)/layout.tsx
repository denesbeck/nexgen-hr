import { checkIfSessionExists } from '@/_actions/auth'
import { redirect } from 'next/navigation'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const res = await checkIfSessionExists()
  if (!res) {
    redirect('/')
  }
  return <>{children}</>
}

export default AuthLayout
