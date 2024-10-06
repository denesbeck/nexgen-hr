'use client'
import { useSession } from 'next-auth/react'

const Workspace: React.FC = () => {
  const { data: session, status: statusSession } = useSession()

  if (statusSession === 'unauthenticated') {
    return <div>Unauthenticated</div>
  }
  return <div>{session?.user?.email}</div>
}

export default Workspace
