'use client'
import { Backdrop, CloseButton, Header, Info } from '@/_components'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { useClickOutside, useAlert, useLoading } from '@/_hooks'
import { useState } from 'react'
import { signUpAction } from '@/_actions/register'
import { ConfirmSignUp, DomainEmail, Password } from '.'
import { RegisterCompanyContext } from '@/_contexts'

interface RegisterCompanyFormProps {
  close: () => void
}

/* TODO:
 * - Password validation
 * - Domain name validation
 * - Email validation
 *   */
const RegisterCompany = ({ close }: RegisterCompanyFormProps) => {
  const ref = useClickOutside<HTMLDivElement>(close)
  const { alert } = useAlert()
  const { startLoading, stopLoading } = useLoading('register-company')

  /* INFO:
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
    // TODO: input validation to be implemented here

    startLoading()
    const response = await signUpAction({
      name: companyName,
      domain: domain,
      username: rootEmail + '@' + domain,
      password: password.password,
    })
    stopLoading()

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

  const handleSkip = () => {
    setStep(3)
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
        <Header
          title="Register Company"
          icon={RocketLaunchIcon}
          backgroundColor="bg-amber-300"
        />
        <Info text="Register your company to create a workspace." />
        <RegisterCompanyContext.Provider
          value={{
            companyName,
            setCompanyName,
            domain,
            setDomain,
            rootEmail,
            setRootEmail,
            password,
            setPassword,
            confirmationCode,
            setConfirmationCode,
          }}
        >
          <div className="flex flex-col gap-4">
            {step === 1 && <DomainEmail next={handleNext} skip={handleSkip} />}
            {step === 2 && <Password back={handleBack} signUp={handleSignUp} />}
            {step === 3 && (
              <ConfirmSignUp email={rootEmail + '@' + domain} close={close} />
            )}
          </div>
        </RegisterCompanyContext.Provider>
      </div>
    </Backdrop>
  )
}

export default RegisterCompany
