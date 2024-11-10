'use client'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import ShieldIcon from '@mui/icons-material/Shield'
import QRCode from 'react-qr-code'
import { confirmSignInAction } from '@/_actions/auth'
import { useAlert, useClickOutside, useLoading } from '@/_hooks'
import { Backdrop, Header, Info, Loading } from '@/_components'

interface MFASetupProps {
  setupUri: string
  close: () => void
}

const MFASetup = ({ setupUri }: MFASetupProps) => {
  const ref = useClickOutside<HTMLDivElement>(close)
  const { alert } = useAlert()
  const { startLoading, stopLoading } = useLoading('mfa-setup')

  const [OTP, setOTP] = useState<string>('')

  const handleSetupMFA = async () => {
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
        <Header
          title="MFA Setup"
          icon={ShieldIcon}
          backgroundColor="bg-sky-300"
        />
        <Info text="Please scan the QR code above with your authenticator app and enter the one-time password." />
        <div className="flex flex-col gap-6 items-center">
          <div className="h-[14rem] w-[14rem]">
            <QRCode
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={setupUri as string}
            />
          </div>
          <TextField
            autoFocus
            label="One-Time Password"
            variant="outlined"
            value={OTP}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setOTP(event.target.value)
            }
          />
        </div>
        <div className="flex justify-end mt-4">
          <Loading id="mfa-setup">
            <Button
              color="primary"
              variant="contained"
              onClick={handleSetupMFA}
            >
              Setup MFA
            </Button>
          </Loading>
        </div>
      </div>
    </Backdrop>
  )
}

export default MFASetup
