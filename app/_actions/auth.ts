'use server'
import { Amplify, ResourcesConfig } from 'aws-amplify'
import {
  AuthSession,
  confirmSignIn,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
} from 'aws-amplify/auth'
import { redirect } from 'next/navigation'
import redis from '@/_lib/redis'
import {
  deleteSessionCookie,
  getSessionId,
  getSessionIdAndCreateIfMissing,
} from '@/_utils/session'

const OUTPUTS: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID as string,
      identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID as string,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
}

Amplify.configure(OUTPUTS)

const redisInstance = redis().getInstance()

// INFO: redirect() throws an error, therefore, it should be invoked outside of the try-catch block

interface SignInActionProps {
  username: string
  password: string
}
export const signInAction = async ({
  username,
  password,
}: SignInActionProps) => {
  let response
  try {
    response = await signIn({
      username,
      password,
    })
  } catch (error) {
    const user = await getCurrentUser()
    console.error(
      `UserAlreadyAuthenticatedException: ${user.userId}. Performing sign out and sign in again.`
    )
    // HACK: `UserAlreadyAuthenticatedException` workaround: https://github.com/aws-amplify/amplify-js/issues/13813#issuecomment-2379950784
    if ((error as Error).name === 'UserAlreadyAuthenticatedException') {
      await signOut()
      await signInAction({ username, password })
      return
    }
    console.error(error)
    return {
      success: false,
      status: 'SIGN_IN_FAILED',
      message: (error as Error).message || 'Sign in failed',
    }
  }

  // INFO: Check if MFA is set. If not, redirect to MFA setup page. If yes, return `ENTER_OTP` message to prompt MFA confirm modal.
  const isSignedIn = response?.isSignedIn
  const signInStep = response?.nextStep?.signInStep

  if (
    isSignedIn === false &&
    signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
  ) {
    const getSetupUri = response?.nextStep?.totpSetupDetails?.getSetupUri
    const appName = 'NexGen HR'
    const setupUri = getSetupUri(appName)
    return { success: true, status: 'SETUP_OTP', payload: setupUri }
  }

  if (isSignedIn === false && signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
    return { success: true, status: 'ENTER_OTP' }
  }

  redirect('/home')
}

export const confirmSignInAction = async (code: string) => {
  try {
    await confirmSignIn({ challengeResponse: code })
    const session = await fetchAuthSession()
    await storeSession('Arcade Lab Inc', 'denes.beck@arcade-lab.dev', session)
  } catch (error) {
    console.error(error)
    return { success: false, status: 'INVALID_OTP' }
  }
  redirect('/home')
}

export const signOutAction = async () => {
  try {
    await signOut()
    await deleteSession()
  } catch (error) {
    console.error(error)
    return { success: false, status: 'SIGN_OUT_FAILED' }
  }
  redirect('/')
}

const storeSession = async (
  name: string,
  email: string,
  authSession: AuthSession
) => {
  const sessionId = getSessionIdAndCreateIfMissing()
  const payload = {
    name,
    email,
    authSession: JSON.stringify(authSession),
  }

  await redisInstance.hset(
    `session-${process.env.NODE_ENV}-${sessionId}`,
    payload
  )
  await redisInstance.expire(
    `session-${process.env.NODE_ENV}-${sessionId}`,
    60 * 60 * 4
  )
}

const deleteSession = async () => {
  const sessionId = getSessionId()

  if (!sessionId) {
    console.error('Session ID not found')
    return
  }

  await redisInstance.del(`session-${process.env.NODE_ENV}-${sessionId}`)
  deleteSessionCookie()
}

export const checkIfSessionExists = async () => {
  const sessionId = getSessionId()

  if (!sessionId) {
    console.error('Session ID not found')
    return false
  }

  try {
    const res = await redisInstance.exists(
      `session-${process.env.NODE_ENV}-${sessionId}`
    ) // 1 = true, 0 = false
    return res === 1
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getUser = async () => {
  const sessionId = getSessionId()

  if (!sessionId) {
    console.error('Session ID not found')
    return null
  }

  try {
    const res = await redisInstance.hgetall(
      `session-${process.env.NODE_ENV}-${sessionId}`
    )
    if (!res) {
      console.error('Session not found')
      return null
    }
    return {
      name: res.name,
      email: res.email,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${res.name}`,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
