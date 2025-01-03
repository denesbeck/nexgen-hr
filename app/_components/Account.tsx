'use client'
import {
  AuthenticationContext,
  SessionContext,
} from '@toolpad/core/AppProvider'
import { Account as ToolpadAccount } from '@toolpad/core/Account'
import { useEffect, useMemo, useState } from 'react'
import { getUser, signOutAction } from '@/_actions/auth'
import { ThemeProvider } from '@mui/material'
import { darkTheme } from '@/theme'
import { Session, User } from '@/_interfaces/session'

export default function Account() {
  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    getUser().then((user) => {
      setSession({ user: { ...(user as User) } })
    })
  }, [])

  const authentication = useMemo(() => {
    return {
      signIn: async () => {},
      signOut: async () => {
        await signOutAction()
      },
    }
  }, [])

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session as Session}>
        <ThemeProvider theme={darkTheme}>
          <ToolpadAccount />
        </ThemeProvider>
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  )
}
