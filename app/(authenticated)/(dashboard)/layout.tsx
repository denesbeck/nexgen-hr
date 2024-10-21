'use client'
import { useState, useMemo, useEffect } from 'react'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import type { Router, Session } from '@toolpad/core'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, signOutAction } from '@/_actions/auth'
import { NAVIGATION, THEME } from '@/_config/drawer'

interface HomeLayoutProps {
  children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const nextRouter = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    getUser().then((user) => {
      setSession({ user: { ...user } })
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

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        title: 'NexGen HR',
        // eslint-disable-next-line @next/next/no-img-element
        logo: <img src="" alt="" />,
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
