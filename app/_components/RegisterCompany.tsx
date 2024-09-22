'use client'
import { Button } from '@/_components'
import { RegisterCompany as RegisterCompanyForm } from '@/_components/forms'
import { useState } from 'react'
import { IoMdArrowDroprightCircle } from 'react-icons/io'

const RegisterCompany = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        action={() => setOpen(true)}
        variant="primary-solid"
        label="Get started"
        iconPosition="right"
        icon={<IoMdArrowDroprightCircle className="inline ml-2 text-2xl" />}
      />
      {open && <RegisterCompanyForm close={() => setOpen(false)} />}
    </>
  )
}

export default RegisterCompany
