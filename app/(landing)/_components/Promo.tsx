'use client'
import { IoDice } from 'react-icons/io5'
import { Button, GetStarted, Loading } from '@/_components'
import { useRouter } from 'next/navigation'
import { useLoading } from '@/_hooks'

const Promo = () => {
  const router = useRouter()
  const { startLoading } = useLoading()

  return (
    <div className="flex z-20 flex-col gap-14 justify-center items-center p-14 w-screen bg-white shadow-md xl:fixed xl:w-max -right-[10vw] top-[8rem] min-h-[40vh] min-w-[60vw] xl:rounded-l-[3rem]">
      <h1 className="text-4xl font-semibold text-center text-transparent bg-clip-text bg-linear-to-tr from-cyan-300 via-indigo-500 to-blue-400 xl:mr-[8vw]">
        Simplicity in HR. Power in Performance.
      </h1>
      <p className="text-xl text-center max-w-[40rem] text-slate-400 xl:mr-[8vw]">
        Seamless HR management designed for simplicity, driving powerful results
        and peak performance.
      </p>
      <div className="flex gap-4 xl:mr-[8vw]">
        <GetStarted />
        <Loading id="try-demo">
          <Button
            action={() => {
              startLoading('try-demo')
              router.push('/home?demo=true')
            }}
            variant="primary-outline"
            label="Try the Demo"
            iconPosition="right"
            icon={<IoDice className="inline ml-2 text-2xl" />}
          />
        </Loading>
      </div>
    </div>
  )
}

export default Promo
