'use server'
import { Amplify, ResourcesConfig } from 'aws-amplify'
import {
  AuthSession,
  confirmSignIn,
  fetchAuthSession,
  signIn,
  signOut,
  resetPassword,
  confirmResetPassword,
} from 'aws-amplify/auth'
import { redirect } from 'next/navigation'
import redis from '@/_lib/redis'
import {
  deleteSessionCookie,
  getSessionId,
  getSessionIdAndCreateIfMissing,
} from '@/_utils/session'
import postgres from '@/_lib/postgres'

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

// HACK: redirect() throws an error, therefore, it should be invoked outside of the try-catch block

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
    // HACK: `UserAlreadyAuthenticatedException` workaround: https://github.com/aws-amplify/amplify-js/issues/13813#issuecomment-2379950784
    if ((error as Error).name === 'UserAlreadyAuthenticatedException') {
      console.error(
        `UserAlreadyAuthenticatedException: Performing sign out and sign in again.`
      )
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

  // INFO: Error on front-end is expected, as redirect() throws an error
  redirect('/home')
}

export const confirmSignInAction = async (code: string) => {
  const pgPool = postgres().getInstance()
  let uuid
  let email
  let role: 'admin' | 'worker' | null = null
  let companyUuid
  try {
    await confirmSignIn({ challengeResponse: code })
    const session = await fetchAuthSession()
    let rows

    // TODO: Consider refactoring this to differentiate postgres error from other errors
    const { rows: rows1 } = await pgPool.query(
      'SELECT uuid, name, root_email AS email FROM companies where cognito_id = $1',
      [session.tokens?.accessToken.payload.sub]
    )

    if (rows1.length === 0) {
      const { rows: rows2 } = await pgPool.query(
        'SELECT w.uuid, w.company_uuid, p.name, w.email FROM workers AS w JOIN personal AS p ON w.uuid = p.worker_uuid where cognito_id = $1',
        [session.tokens?.accessToken.payload.sub]
      )
      if (rows2.length === 0) {
        return { success: false, status: 'UUID_NOT_FOUND' }
      }
      rows = rows2
      role = 'worker'
      companyUuid = rows2[0].company_uuid
    } else {
      rows = rows1
      role = 'admin'
      companyUuid = rows1[0].uuid
    }

    uuid = rows[0].uuid
    const name = rows[0].name
    email = rows[0].email
    await storeSession({ uuid, name, email, role, authSession: session })
  } catch (error) {
    console.error(error)
    return { success: false, status: 'INVALID_OTP' }
  }
  if (!uuid) return { success: false, status: 'UUID_NOT_FOUND' }

  const { rows } = await pgPool.query(
    'SELECT uuid FROM structures WHERE company_uuid = $1',
    [companyUuid]
  )

  if (rows.length === 0) {
    if (role !== 'admin')
      return { success: false, status: 'NO_STRUCTURE_NO_ADMIN' }
    // INFO: Error on front-end is expected, as redirect() throws an error
    redirect(`/company/${uuid}/init`)
  }
  // INFO: Error on front-end is expected, as redirect() throws an error
  redirect(`/home/${uuid}`)
}

export const signOutAction = async () => {
  try {
    await signOut()
    await deleteSession()
  } catch (error) {
    console.error(error)
    return { success: false, status: 'SIGN_OUT_FAILED' }
  }
  // INFO: Error on front-end is expected, as redirect() throws an error
  redirect('/')
}

export const resetPasswordAction = async (username: string) => {
  try {
    await resetPassword({ username })
  } catch (error) {
    console.error(error)
    return { success: false, status: 'RESET_PASSWORD_FAILED' }
  }
  return { success: true, status: 'RESET_PASSWORD_SUCCESS' }
}

export const confirmResetPasswordAction = async (
  confirmationCode: string,
  newPassword: string,
  username: string
) => {
  try {
    await confirmResetPassword({ username, confirmationCode, newPassword })
  } catch (error) {
    console.error(error)
    return { success: false, status: 'CONFIRM_RESET_PASSWORD_FAILED' }
  }
  return { success: true, status: 'CONFIRM_RESET_PASSWORD_SUCCESS' }
}

const storeSession = async (params: {
  uuid: string
  name: string
  email: string
  role: 'admin' | 'worker'
  authSession: AuthSession
}) => {
  const sessionId = await getSessionIdAndCreateIfMissing()
  const { uuid, name, email, role, authSession } = params
  const payload = {
    uuid,
    name,
    email,
    role,
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
  const sessionId = await getSessionId()

  if (!sessionId) {
    console.error('Session ID not found')
    return
  }

  await redisInstance.del(`session-${process.env.NODE_ENV}-${sessionId}`)
  await deleteSessionCookie()
}

export const checkIfSessionExists = async () => {
  const sessionId = await getSessionId()

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
  const sessionId = await getSessionId()

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
      id: res.uuid,
      name: res.name,
      email: res.email,
      role: res.role,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${res.name}`,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
