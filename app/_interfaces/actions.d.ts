import { AuthSession } from 'aws-amplify/auth'

export interface ServerActionResponse {
  success: boolean
  status?: string
  message?: string
  payload?: AuthSession
}
