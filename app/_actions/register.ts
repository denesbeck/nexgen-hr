'use server'
import { Amplify, ResourcesConfig } from 'aws-amplify'
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
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

const pgPool = postgres().getInstance()

export const checkIfRegistered = async (domain: string, rootEmail: string) => {
  try {
    const { rows } = await pgPool.query(
      'SELECT root_email, confirmed FROM companies WHERE domain = $1;',
      [domain]
    )
    return {
      registered: rows.length > 0,
      emailMatch: rows[0]?.root_email === rootEmail,
      confirmed: rows[0]?.confirmed as boolean,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

interface SignInActionProps {
  name: string
  domain: string
  username: string
  password: string
}

export const signUpAction = async ({
  name,
  domain,
  username,
  password,
}: SignInActionProps) => {
  try {
    const response = await signUp({
      username,
      password,
    })

    pgPool.query(
      'INSERT INTO companies (name, domain, root_email, cognito_id) VALUES ($1, $2, $3, $4);',
      [name, domain, username, response.userId]
    )

    return { success: true, userId: response.userId }
  } catch (error) {
    console.error(error)
    const e = error as Error
    if (e.name.includes('UsernameExistsException')) {
      return { success: false, error: e.name, message: e.message }
    }
    return { success: false, error: e.name, message: e.message }
  }
}

interface ConfirmSignUpActionProps {
  username: string
  confirmationCode: string
}

export const confirmSignUpAction = async ({
  username,
  confirmationCode,
}: ConfirmSignUpActionProps) => {
  const pgPool = postgres().getInstance()
  try {
    await pgPool.query('BEGIN;')
    await confirmSignUp({ username, confirmationCode })
    await pgPool.query(
      'UPDATE companies SET confirmed = true WHERE root_email = $1;',
      [username]
    )
    await pgPool.query('COMMIT;')
    return { success: true }
  } catch (error) {
    await pgPool.query('ROLLBACK;')
    console.error(error)
    const e = error as Error
    return { success: false, error: e.name, message: e.message }
  }
}

export const resendSignUpCodeAction = async (email: string) => {
  try {
    await resendSignUpCode({ username: email })
    return { success: true }
  } catch (error) {
    console.error(error)
    const e = error as Error
    return { success: false, error: e.name, message: e.message }
  }
}
