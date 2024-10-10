'use client'
import { IoDice } from 'react-icons/io5'
import { Button, RegisterCompany } from '@/_components'

const Section1 = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-14 rounded-md bg-white p-14 shadow-md">
      <h1 className="bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400 bg-clip-text text-4xl font-semibold text-transparent">
        Simplicity in HR. Power in Performance.
      </h1>
      <p className="max-w-[40rem] text-center text-xl text-slate-400">
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
          icon={<IoDice className="ml-2 inline text-2xl" />}
        />
        {}
      </div>
    </div>
  )
}

export default Section1
