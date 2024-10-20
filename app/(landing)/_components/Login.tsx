'use client'
import { Button } from '@/_components'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import EmailIcon from '@mui/icons-material/Email'
import KeyIcon from '@mui/icons-material/Key'
import { useState } from 'react'
import { signInAction } from '@/_actions/auth'
import {
  createTheme,
  ThemeProvider,
  InputAdornment,
  TextField,
} from '@mui/material'
import { MFAConfirm, MFASetup } from '.'
import { ServerActionResponse } from '@/_interfaces/actions'
import { useAlert } from '@/_hooks'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const Login = () => {
  const { alert } = useAlert()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [MFAConfirmOpen, setMFAConfirmOpen] = useState(false)
  const [MFASetupOpen, setMFASetupOpen] = useState(false)
  const [setupUri, setSetupUri] = useState<string>('')

  const handleSignIn = async () => {
    const res: ServerActionResponse | undefined = (await signInAction({
      username: email,
      password,
    })) as ServerActionResponse
    // if status is ENTER_OTP, open MFAConfirm to enter OTP
    if (res?.status === 'ENTER_OTP') setMFAConfirmOpen(true)
    // if status is SETUP_OTP, open MFASetup to setup OTP
    if (res?.status === 'SETUP_OTP') {
      setSetupUri(res.payload as string)
      setMFASetupOpen(true)
    }
    if (res?.success === false)
      alert({
        id: 'login-failed',
        message: res.message as string,
        severity: 'error',
      })
  }

  return (
    <div className="flex relative z-10 flex-col gap-8 justify-center items-center p-8 from-cyan-300 via-indigo-500 to-blue-400 shadow-md xl:fixed xl:bg-gradient-to-tr xl:rounded-md xl:bottom-[20vh] xl:left-[7vw] xl:w-[28.5rem]">
      {MFAConfirmOpen && <MFAConfirm close={() => setMFAConfirmOpen(false)} />}
      {MFASetupOpen && (
        <MFASetup setupUri={setupUri} close={() => setMFASetupOpen(false)} />
      )}
      <div className="absolute h-full w-screen bg-neutral-900 xl:left-1 xl:top-1 xl:h-[calc(100%-0.5rem)] xl:w-[calc(100%-0.5rem)] xl:rounded-md"></div>
      <h1 className="z-10 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400">
        Welcome to NexGen HR
      </h1>
      <ThemeProvider theme={darkTheme}>
        <TextField
          label="Email"
          variant="outlined"
          className="w-full"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          className="w-full"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(() => event.target.value)
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
      </ThemeProvider>
      <div className="z-10 w-[12rem]">
        <Button
          icon={<VpnKeyIcon className="mr-2" />}
          action={handleSignIn}
          variant="primary-solid"
          label="Login"
          wide={true}
        />
      </div>
    </div>
  )
}

export default Login
