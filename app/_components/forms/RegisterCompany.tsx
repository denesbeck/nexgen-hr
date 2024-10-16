'use client'
import { Backdrop, CloseButton } from '@/_components'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { useClickOutside, useAlert } from '@/_hooks'
import { useState } from 'react'
import { signUpAction } from '@/_actions/register'
import { ConfirmSignUp, DomainEmail, Password } from '.'

interface RegisterCompanyFormProps {
  close: () => void
}

/* TODO:
 * - Password validation
 * - Domain name validation
 * - Email validation
 *   */
const RegisterCompanyForm = ({ close }: RegisterCompanyFormProps) => {
  const ref = useClickOutside<HTMLDivElement>(close, 'register-company-form')
  const { alert } = useAlert()

  /*
   * Step 1: Enter domain and root email
   * Step 2: Enter password
   * Step 3: Confirm sign up
   * */
  const [step, setStep] = useState(1)

  const [companyName, setCompanyName] = useState('')
  const [domain, setDomain] = useState('')
  const [rootEmail, setRootEmail] = useState('')
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  })
  const [confirmationCode, setConfirmationCode] = useState('')

  const handleSignUp = async () => {
    // input validation to be implemented

    const response = await signUpAction({
      name: companyName,
      domain: domain,
      username: rootEmail + '@' + domain,
      password: password.password,
    })

    if (response.success) return handleNext()

    if (response.error === 'UsernameExistsException') {
      alert({
        id: 'email-exists',
        severity: 'error',
        message: 'Email already registered!',
      })
      return setStep(1)
    }

    if (!response.success) {
      alert({
        id: 'sign-up-fail',
        severity: 'error',
        message: 'Failed to register company!',
      })
    }
  }

  const handleBack = () => {
    if (step === 1) return
    setStep((prev) => prev - 1)
  }

  const handleNext = () => {
    if (step === 3) return
    setStep((prev) => prev + 1)
  }

  return (
    <Backdrop>
      <div
        ref={ref}
        className="flex relative flex-col p-8 bg-white rounded-md w-[30rem] max-w-[90vw] animate-slideInFromBottom"
      >
        <div className="absolute top-0 right-0 p-2">
          <CloseButton close={close} size="md" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-3 w-max bg-amber-300 rounded-full">
            <RocketLaunchIcon className="text-white min-h-8 min-w-8" />
          </div>
          <h1 className="text-2xl text-slate-800">Register Company</h1>
        </div>
        <p className="my-4 text-slate-400">
          Register your company to create a workspace.
        </p>
        <div className="flex flex-col gap-4">
          {step === 1 && (
            <DomainEmail
              companyName={companyName}
              setCompanyName={setCompanyName}
              domain={domain}
              setDomain={setDomain}
              rootEmail={rootEmail}
              setRootEmail={setRootEmail}
              next={handleNext}
              moveToStepThree={() => setStep(3)}
            />
          )}
          {step === 2 && (
            <Password
              password={password}
              setPassword={setPassword}
              back={handleBack}
              signUp={handleSignUp}
            />
          )}
          {step === 3 && (
            <ConfirmSignUp
              email={rootEmail + '@' + domain}
              confirmationCode={confirmationCode}
              setConfirmationCode={setConfirmationCode}
              close={close}
            />
          )}
        </div>
      </div>
    </Backdrop>
  )
}

export default RegisterCompanyForm
