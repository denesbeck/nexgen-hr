import { Button, InputAdornment, TextField } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useContext } from 'react'
import { RegisterCompanyContext } from '@/_contexts'
import { Loading } from '@/_components'

export type IPassword = {
  password: string
  confirmPassword: string
}

interface PasswordProps {
  back: () => void
  signUp: () => void
}

const Password = ({ back, signUp }: PasswordProps) => {
  const { password, setPassword } = useContext(RegisterCompanyContext)
  return (
    <div className="flex flex-col gap-4 animate-textFocus">
      <TextField
        autoFocus
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

      <div className="flex gap-4 justify-end">
        <Button variant="outlined" onClick={back}>
          Back
        </Button>
        <Loading id="register-company">
          <Button
            className="text-white"
            color="primary"
            variant="contained"
            onClick={signUp}
          >
            Register
          </Button>
        </Loading>
      </div>
    </div>
  )
}

export default Password
