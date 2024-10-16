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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    signInAction({ username: email, password })
  }

  return (
    <div className="flex relative z-10 flex-col gap-8 justify-center items-center p-8 from-cyan-300 via-indigo-500 to-blue-400 shadow-md xl:fixed xl:bg-gradient-to-tr xl:rounded-md xl:bottom-[20vh] xl:left-[7vw] xl:w-[28.5rem]">
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
