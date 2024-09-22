'use client'
import { IoDice } from 'react-icons/io5'
import { Button, RegisterCompany } from '@/_components'

const Section1 = () => {
  return (
    <div className="flex flex-col gap-14 justify-center items-center p-14 bg-white rounded-md shadow-md">
      <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400">
        Simplicity in HR. Power in Performance.
      </h1>
      <p className="text-xl text-center max-w-[40rem] text-slate-400">
        Seamless HR management designed for simplicity, driving powerful results
        and peak performance.
      </p>
      <div className="flex gap-4">
        <RegisterCompany />
        <Button
          action={() => console.log('Try the Demo')}
          variant="primary-outline"
          label="Try the Demo"
          iconPosition="right"
          icon={<IoDice className="inline ml-2 text-2xl" />}
        />
        {}
      </div>
    </div>
  )
}

export default Section1
