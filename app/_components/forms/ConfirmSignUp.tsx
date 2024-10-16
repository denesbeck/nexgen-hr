import { Button, InputAdornment, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { confirmSignUpAction } from '@/_actions/register'
import { useAlert } from '@/_hooks'
import { useContext } from 'react'
import { RegisterCompanyContext } from '@/_contexts'

interface ConfirmSignUpProps {
  email: string
  close: () => void
}

const ConfirmSignUp = ({ email, close }: ConfirmSignUpProps) => {
  const { alert } = useAlert()
  const { confirmationCode, setConfirmationCode } = useContext(
    RegisterCompanyContext
  )

  const handleConfirmSignUp = async () => {
    const response = await confirmSignUpAction({
      username: email,
      confirmationCode,
    })
    if (response.success) {
      close()
      alert({
        id: 'sign-up-success',
        severity: 'success',
        message: 'Company registered successfully!',
      })
    }
  }

  return (
    <div className="flex flex-col gap-3 animate-textFocus">
      <TextField
        label="Confirmation Code"
        variant="outlined"
        value={confirmationCode}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmationCode(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <div className="flex justify-end space-x-4">
        <Button
          color="primary"
          variant="outlined"
          onClick={handleConfirmSignUp}
        >
          Resend Code
        </Button>
        <Button
          className="text-white"
          color="success"
          variant="contained"
          onClick={handleConfirmSignUp}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default ConfirmSignUp
