'use client'
import { useState, useMemo, useEffect } from 'react'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import type { Router } from '@toolpad/core'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, signOutAction } from '@/_actions/auth'
import { NAVIGATION_ADMIN, NAVIGATION_WORKER, THEME } from '@/_config/drawer'
import { CircularProgress } from '@mui/material'

interface HomeLayoutProps {
  children: React.ReactNode
}

interface User {
  id: string
  name: string
  email: string
  role: string
  image: string
}

interface Session {
  user: User
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const nextRouter = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    getUser().then((user) => {
      setSession({ user: { ...(user as User) } })
    })
  }, [])

  const [session, setSession] = useState<Session | null>()

  const authentication = useMemo(() => {
    return {
      signIn: async () => {},
      signOut: async () => {
        await signOutAction()
      },
    }
  }, [])

  const router = useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => nextRouter.push(String(path)),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (!session)
    return (
      <div className="flex flex-col justify-center items-center">
        <CircularProgress size="3rem" />
        <p className="mt-2 font-semibold text-white">Loading content...</p>
      </div>
    )
  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={
        session.user.role === 'admin' ? NAVIGATION_ADMIN : NAVIGATION_WORKER
      }
      branding={{
        title: 'NexGen HR',
        // eslint-disable-next-line
        logo: <img src={undefined} alt="" />,
      }}
      router={router}
      theme={THEME}
    >
      <DashboardLayout>
        <div className="p-10 w-full">{children}</div>
      </DashboardLayout>
    </AppProvider>
  )
}

export default HomeLayout
