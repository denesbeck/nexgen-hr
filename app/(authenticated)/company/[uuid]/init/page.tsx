import { Account, AppHeader } from '@/_components'
import { StepContents } from '@/(authenticated)/company/[uuid]/init/_components'
import postgres from '@/_lib/postgres'
import { redirect } from 'next/navigation'

interface InitCompanyPageProps {
  params: Promise<{
    uuid: string
  }>
}

const InitCompanyPage = async ({ params }: InitCompanyPageProps) => {
  const uuid = (await params).uuid
  const pgPool = postgres().getInstance()

  const { rows } = await pgPool.query(
    `SELECT COUNT(1) FROM company_structures where company_uuid = $1`,
    [uuid]
  )

  if (rows[0].count > 0) redirect(`/home/${uuid}`)

  return (
    <div className="flex relative flex-col justify-start h-full min-h-screen">
      <div className="absolute top-5 right-5 z-[1300]">
        <Account />
      </div>
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-neutral-900 lg:h-[95vh] lg:w-[40vw] lg:rounded-br-[3rem]" />
      <div className="absolute top-0 right-0 w-full h-[40vh] bg-neutral-900 lg:w-[70vw]" />
      <div className="flex z-10 justify-start px-8 pt-6 w-full">
        <AppHeader />
      </div>
      <div className="flex z-10 flex-col gap-14 items-center p-8 mt-8 w-screen lg:flex-row lg:mt-0 h-[80vh]">
        <StepContents />
      </div>
    </div>
  )
}

export default InitCompanyPage
