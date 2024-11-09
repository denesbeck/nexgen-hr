import { cookies } from 'next/headers'
import crypto from 'crypto'

export const getSessionId = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('session-id')?.value
}

const setSessionId = async (sessionId: string) => {
  const cookieStore = await cookies()
  cookieStore.set('session-id', sessionId)
}

export const getSessionIdAndCreateIfMissing = async () => {
  const sessionId = getSessionId()
  if (!sessionId) {
    const newSessionId = crypto.randomUUID()
    await setSessionId(newSessionId)

    return newSessionId
  }

  return sessionId
}

export const deleteSessionCookie = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('session-id')
}
