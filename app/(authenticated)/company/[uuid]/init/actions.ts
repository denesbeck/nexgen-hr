'use server'
import postgres from '@/_lib/postgres'
import { redirect } from 'next/navigation'

export const getCompanyName = async (uuid: string) => {
  const pgPool = postgres().getInstance()

  try {
    const res = await pgPool.query(
      'SELECT name FROM companies WHERE uuid = $1;',
      [uuid]
    )
    return { success: true, name: res.rows[0].name }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export const initCompany = async (payload: {
  uuid: string
  layers: string
}) => {
  const pgPool = postgres().getInstance()

  const { uuid, layers } = payload
  // TODO: AUTHENTICATE ACTIONER

  try {
    await pgPool.query(
      'INSERT INTO company_structures (company_uuid, layers) VALUES ($1, $2) RETURNING *;',
      [uuid, layers]
    )
  } catch (error) {
    console.error(error)
    return { success: false }
  }
  redirect(`/home/${uuid}`)
}
