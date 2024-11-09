'use server'
import { Amplify, ResourcesConfig } from 'aws-amplify'
import {
  AuthSession,
  confirmSignIn,
  fetchAuthSession,
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

  redirect('/home')
}

export const confirmSignInAction = async (code: string) => {
  const pgPool = postgres().getInstance()
  let uuid
  let rootEmail
  try {
    await confirmSignIn({ challengeResponse: code })
    const session = await fetchAuthSession()
    const { rows } = await pgPool.query(
      'SELECT uuid, name, root_email FROM companies where cognito_id = $1',
      [session.tokens?.accessToken.payload.sub]
    )
    if (rows.length === 0) return { success: false, status: 'UNAUTHORIZED' }
    /* TODO: Look for the user in the employees table if the company is not initialized. To be implemented here. Currently, we are looking for cognito_id in the companies table only. In the future, if there is no match, we should look for the cognito_id in the employees table. In that case we should not redirect to the company init page, instead an error message should be displayed.
     */

    uuid = rows[0].uuid
    const name = rows[0].name
    rootEmail = rows[0].root_email
    await storeSession(uuid, name, rootEmail, session)
  } catch (error) {
    console.error(error)
    return { success: false, status: 'INVALID_OTP' }
  }
  if (!uuid) return { success: false, status: 'UUID_NOT_FOUND' }

  const { rows } = await pgPool.query(
    'SELECT uuid FROM company_hierarchy WHERE company_uuid = $1',
    [uuid]
  )

  if (rows.length === 0) return redirect(`/company/${uuid}/init`)

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
  redirect('/')
}

const storeSession = async (
  uuid: string,
  name: string,
  email: string,
  authSession: AuthSession
) => {
  const sessionId = await getSessionIdAndCreateIfMissing()
  const payload = {
    uuid,
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
      name: res.name,
      email: res.email,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${res.name}`,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
