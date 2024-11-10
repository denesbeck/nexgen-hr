'use client'
import { IPassword } from '@/_components/forms/RegisterCompany/Password'
import { Button, InputAdornment, TextField } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useState } from 'react'
import { Loading } from '@/_components'

interface IEnterNewPassword {
  back: () => void
  action: (confirmationCode: string, password: string) => void
}

const EnterNewPassword = ({ back, action }: IEnterNewPassword) => {
  const [confirmationCode, setConfirmationCode] = useState('')
  const [password, setPassword] = useState<IPassword>({
    password: '',
    confirmPassword: '',
  })
  return (
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
          label="New Password"
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
        <Button color="primary" variant="outlined" onClick={back}>
          Back
        </Button>
        <Loading id="reset-password">
          <Button
            color="success"
            variant="contained"
            onClick={() => action(confirmationCode, password.password)}
          >
            Reset
          </Button>
        </Loading>
      </div>
    </>
  )
}

export default EnterNewPassword
