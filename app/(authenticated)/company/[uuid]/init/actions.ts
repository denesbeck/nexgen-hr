'use server'
import postgres from '@/_lib/postgres'
import { redirect } from 'next/navigation'

export const initCompany = async (payload: {
  uuid: string
  layers: string
}) => {
  const pgPool = postgres().getInstance()

  const { uuid, layers } = payload
  // TODO: AUTHENTICATE ACTIONER

  try {
    await pgPool.query(
      'INSERT INTO structures (company_uuid, layers) VALUES ($1, $2) RETURNING *;',
      [uuid, layers]
    )
  } catch (error) {
    console.error(error)
    return { success: false }
  }
  redirect(`/home/${uuid}`)
}
