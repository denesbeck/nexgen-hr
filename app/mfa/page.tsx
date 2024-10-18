'use client'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import ShieldIcon from '@mui/icons-material/Shield'
import QRCode from 'react-qr-code'
import { useSearchParams } from 'next/navigation'
import { confirmSignInAction } from '@/_actions/auth'
import { useAlert } from '@/_hooks'

const MFASetup = () => {
  const { alert } = useAlert()
  const [OTP, setOTP] = useState<string>('')
  const searchParams = useSearchParams()
  const setupUri = searchParams.get('setupUri')

  const handleSetupMFA = async () => {
    const res = await confirmSignInAction(OTP)
    if (res?.success === false) {
      alert({
        id: 'otp-failed',
        severity: 'error',
        message: 'Invalid one-time password!',
      })
    }
  }

  if (!setupUri) return null
  return (
    <div className="flex relative flex-col p-8 my-8 bg-white rounded-md w-[30rem] max-w-[90vw] animate-slideInFromBottom">
      <div className="flex items-center space-x-3">
        <div className="p-3 w-max rounded-full bg-sky-300">
          <ShieldIcon className="text-white min-h-8 min-w-8" />
        </div>
        <h1 className="text-2xl text-slate-800">MFA Setup</h1>
      </div>
      <p className="my-4 text-slate-400">
        Please scan the QR code above with your authenticator app and enter the
        one-time password.
      </p>
      <div className="flex flex-col gap-6 items-center">
        <div className="h-[14rem] w-[14rem]">
          <QRCode
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={setupUri as string}
          />
        </div>
        <TextField
          label="One-Time Password"
          variant="outlined"
          value={OTP}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setOTP(event.target.value)
          }
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          className="text-white"
          color="primary"
          variant="contained"
          onClick={handleSetupMFA}
        >
          Setup MFA
        </Button>
      </div>
    </div>
  )
}

export default MFASetup
