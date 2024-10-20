import { cookies } from 'next/headers'
import crypto from 'crypto'

export const getSessionId = () => {
  const cookieStore = cookies()
  return cookieStore.get('session-id')?.value
}

const setSessionId = (sessionId: string) => {
  const cookieStore = cookies()
  cookieStore.set('session-id', sessionId)
}

export const getSessionIdAndCreateIfMissing = () => {
  const sessionId = getSessionId()
  if (!sessionId) {
    const newSessionId = crypto.randomUUID()
    setSessionId(newSessionId)

    return newSessionId
  }

  return sessionId
}

export const deleteSessionCookie = async () => {
  const cookieStore = cookies()
  cookieStore.delete('session-id')
}
