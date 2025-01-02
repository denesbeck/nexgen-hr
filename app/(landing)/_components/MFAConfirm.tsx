'use client'
import { Header, Info, Loading, Modal } from '@/_components'
import { Button, TextField } from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'
import { useState } from 'react'
import { confirmSignInAction } from '@/_actions/auth'
import { useLoading, useAlert } from '@/_hooks'

interface MFAProps {
  close: () => void
}

const MFAConfirm = ({ close }: MFAProps) => {
  const { alert } = useAlert()
  const { startLoading, stopLoading } = useLoading('mfa-confirm')

  const [OTP, setOTP] = useState<string>('')

  const handleConfirmSingIn = async () => {
    startLoading()
    const res = await confirmSignInAction(OTP)
    stopLoading()
    if (res?.success === false) {
      switch (res?.status) {
        case 'NO_STRUCTURE_NO_ADMIN':
          alert({
            id: 'otp-failed-no-structure-no-admin',
            severity: 'info',
            message:
              'Company is not initialized yet. Please contact your administrator.',
          })
          break
        case 'UUID_NOT_FOUND':
          alert({
            id: 'otp-failed-uuid-not-found',
            severity: 'error',
            message: 'Cognito integration error. Please contact support.',
          })
          break
        case 'INVALID_OTP':
          alert({
            id: 'otp-failed',
            severity: 'error',
            message: 'Invalid one-time password!',
          })
          break
        default:
          alert({
            id: 'confirm-sign-in-failed',
            severity: 'error',
            message: 'Something went wrong. Please try again.',
          })
      }
      close()
    }
  }

  return (
    <Modal close={close}>
      <Header
        title="MFA Confirmation"
        icon={ShieldIcon}
        backgroundColor="bg-sky-300"
      />
      <Info text="Please enter your one-time password from your authenticator app." />
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
              color="success"
              variant="contained"
              onClick={handleConfirmSingIn}
            >
              Confirm
            </Button>
          </Loading>
        </div>
      </div>
    </Modal>
  )
}

export default MFAConfirm
