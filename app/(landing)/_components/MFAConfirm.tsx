'use client'
import { Backdrop, CloseButton, Loading } from '@/_components'
import { Button, TextField } from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'
import { useState } from 'react'
import { confirmSignInAction } from '@/_actions/auth'
import { useClickOutside, useLoading } from '@/_hooks'
import { useAlert } from '@/_hooks'

interface MFAProps {
  close: () => void
}

const MFAConfirm = ({ close }: MFAProps) => {
  const ref = useClickOutside<HTMLDivElement>(close)
  const { alert } = useAlert()
  const { startLoading, stopLoading } = useLoading('mfa-confirm')

  const [OTP, setOTP] = useState<string>('')

  const handleConfirmSingIn = async () => {
    startLoading()
    const res = await confirmSignInAction(OTP)
    stopLoading()
    if (res?.success === false) {
      alert({
        id: 'otp-failed',
        severity: 'error',
        message: 'Invalid one-time password!',
      })
    }
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
          <div className="p-3 w-max rounded-full bg-sky-300">
            <ShieldIcon className="text-white min-h-8 min-w-8" />
          </div>
          <h1 className="text-2xl text-slate-800">MFA Confirmation</h1>
        </div>
        <p className="my-4 text-slate-400">
          Please enter your one-time password from your authenticator app.
        </p>
        <div className="flex flex-col gap-4">
          <TextField
            autoFocus
            label="One-Time Password"
            variant="outlined"
            value={OTP}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setOTP(event.target.value)
            }
          />
          <div className="flex justify-end">
            <Loading id="mfa-confirm">
              <Button
                className="text-white"
                color="success"
                variant="contained"
                onClick={handleConfirmSingIn}
              >
                Confirm
              </Button>
            </Loading>
          </div>
        </div>
      </div>
    </Backdrop>
  )
}

export default MFAConfirm
