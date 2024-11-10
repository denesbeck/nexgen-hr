'use client'
import { Backdrop, CloseButton, Header, Info } from '@/_components'
import { ThemeProvider } from '@mui/material'
import SendConfirmationCode from './SendConfirmationCode'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useAlert, useClickOutside, useLoading } from '@/_hooks'
import { theme } from '@/theme'
import { useEffect, useState } from 'react'
import {
  confirmResetPasswordAction,
  resetPasswordAction,
} from '@/_actions/auth'
import { EnterNewPassword } from '.'

const ResetPassword = () => {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false))
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1)
  const { startLoading, stopLoading } = useLoading('reset-password')
  const { alert } = useAlert()

  const close = () => setOpen(false)

  const back = () => setStep(1)

  const handleSendConfirmationCode = async (email: string) => {
    startLoading('send-confirmation-code')
    await resetPasswordAction(email)
    stopLoading('send-confirmation-code')
    setEmail(email)
    setStep(2)
  }

  const handleEnterNewPassword = async (
    confirmationCode: string,
    password: string
  ) => {
    startLoading()
    await confirmResetPasswordAction(confirmationCode, password, email)
    stopLoading()
    close()
    alert({
      id: 'reset-password-success',
      message:
        'Password has been reset successfully. You can now login with your new password.',
      severity: 'success',
    })
  }

  useEffect(() => {
    if (!open) return
    setStep(1)
    setEmail('')
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sky-300 hover:text-sky-200"
      >
        Forgot password?
      </button>
      {open && (
        <Backdrop>
          <div
            ref={ref}
            className="flex relative flex-col p-8 bg-white rounded-md w-[30rem] max-w-[90vw] animate-slideInFromBottom"
          >
            <div className="absolute top-0 right-0 p-2">
              <CloseButton close={close} size="md" />
            </div>
            <Header
              title="Reset Password"
              icon={LockResetIcon}
              backgroundColor="bg-rose-300"
            />
            <Info text="Enter your email to reset your password.If the email is registered, you will receive a password reset link." />
            <ThemeProvider theme={theme}>
              {step === 1 && (
                <SendConfirmationCode action={handleSendConfirmationCode} />
              )}
              {step === 2 && (
                <EnterNewPassword back={back} action={handleEnterNewPassword} />
              )}
            </ThemeProvider>
          </div>
        </Backdrop>
      )}
    </>
  )
}

export default ResetPassword
