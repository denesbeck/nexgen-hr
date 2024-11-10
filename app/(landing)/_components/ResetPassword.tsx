'use client'
import KeyIcon from '@mui/icons-material/Key'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Backdrop, CloseButton, Header, Info, Loading } from '@/_components'
import { Button, InputAdornment, TextField, ThemeProvider } from '@mui/material'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useAlert, useClickOutside, useLoading } from '@/_hooks'
import { theme } from '@/theme'
import { useState } from 'react'
import {
  confirmResetPasswordAction,
  resetPasswordAction,
} from '@/_actions/auth'
import { IPassword } from '@/_components/forms/RegisterCompany/Password'

const ResetPassword = () => {
  const [open, setOpen] = useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState<IPassword>({
    password: '',
    confirmPassword: '',
  })
  const [confirmationCode, setConfirmationCode] = useState('')
  const [step, setStep] = useState(1)
  const { startLoading, stopLoading } = useLoading('reset-password')
  const { alert } = useAlert()

  const close = () => setOpen(false)
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
                <>
                  <TextField
                    label="Email"
                    placeholder="Enter your email..."
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex justify-end mt-6 space-x-4">
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={async () => {
                        startLoading()
                        await resetPasswordAction(email)
                        stopLoading()
                        setStep(2)
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="grid gap-4">
                    <TextField
                      autoFocus
                      label="Confirmation Code"
                      placeholder="Enter the confirmation code..."
                      variant="outlined"
                      value={confirmationCode}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmationCode(event.target.value)
                      }
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={password.password}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword((prevState: IPassword) => ({
                          ...prevState,
                          password: event.target.value,
                        }))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <TextField
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      value={password.confirmPassword}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword((prevState: IPassword) => ({
                          ...prevState,
                          confirmPassword: event.target.value,
                        }))
                      }
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CheckCircleOutlineIcon
                                className={`${password.password.length >= 8 && password.password === password.confirmPassword && 'text-teal-400'}`}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div>
                  <div className="flex justify-end mt-6 space-x-4">
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Loading id="reset-password">
                      <Button
                        color="success"
                        variant="contained"
                        onClick={async () => {
                          startLoading()
                          await confirmResetPasswordAction(
                            confirmationCode,
                            password.password,
                            email
                          )
                          stopLoading()
                          close()
                          alert({
                            id: 'reset-password-success',
                            message: 'Password has been reset successfully.',
                            severity: 'success',
                          })
                        }}
                      >
                        Reset
                      </Button>
                    </Loading>
                  </div>
                </>
              )}
            </ThemeProvider>
          </div>
        </Backdrop>
      )}
    </>
  )
}

export default ResetPassword
