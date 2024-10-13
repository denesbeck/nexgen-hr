'use server'
import { Amplify, ResourcesConfig } from 'aws-amplify'
import { signIn } from 'aws-amplify/auth'

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

interface SignInActionProps {
  username: string
  password: string
}
export const signInAction = async ({
  username,
  password,
}: SignInActionProps) => {
  try {
    const response = await signIn({
      username,
      password,
    })
    console.log(response)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
