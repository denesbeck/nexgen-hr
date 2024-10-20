'use client'
import { useState, useMemo, useEffect } from 'react'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import type { Router, Session } from '@toolpad/core'
import { useRouter, usePathname } from 'next/navigation'
import { signOutAction } from '@/_actions/auth'
import { NAVIGATION, THEME } from '@/_config/drawer'

interface HomeLayoutProps {
  children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const nextRouter = useRouter()
  const pathname = usePathname()

  const [session, setSession] = useState<Session | null>({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  })

  const authentication = useMemo(() => {
    return {
      signOut: async () => {
        await signOutAction()
        setSession(null)
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
