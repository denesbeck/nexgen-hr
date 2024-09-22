'use client'
import { Backdrop, Button, InputField } from '@/_components'
import { IoMdArrowDroprightCircle } from 'react-icons/io'
import { FaRocket } from 'react-icons/fa'
import { useClickOutside } from '@/_hooks'
import { useState } from 'react'

interface RegisterCompanyFormProps {
  close: () => void
}

const RegisterCompanyForm = ({ close }: RegisterCompanyFormProps) => {
  const ref = useClickOutside<HTMLDivElement>(close)
  const [domain, setDomain] = useState('')
  const [rootEmail, setRootEmail] = useState('')

  return (
    <Backdrop>
      <div
        ref={ref}
        className="flex flex-col p-8 bg-white rounded-md w-[30rem] max-w-[90vw] animate-slideInFromBottom"
      >
        <div className="flex items-center space-x-3">
          <div className="p-4 w-max bg-amber-300 rounded-full">
            <FaRocket className="text-white min-h-6 min-w-6" />
          </div>
          <h1 className="text-2xl text-slate-800">Register Company</h1>
        </div>
        <p className="my-2 text-slate-400">
          Register your company to create a workspace.
        </p>
        <div className="flex flex-col gap-4">
          <InputField
            label="Domain"
            value={domain}
            handler={(value: string) => setDomain(value)}
          />
          <InputField
            label="Root email"
            value={rootEmail}
            handler={(value: string) => setRootEmail(value)}
          />
        </div>
        <div className="flex justify-end mt-4 w-full">
          <Button
            action={() => console.log('Continue')}
            variant="secondary-solid"
            label="Continue"
            iconPosition="right"
            icon={<IoMdArrowDroprightCircle className="inline ml-2 text-2xl" />}
          />
        </div>
      </div>
    </Backdrop>
  )
}

export default RegisterCompanyForm
