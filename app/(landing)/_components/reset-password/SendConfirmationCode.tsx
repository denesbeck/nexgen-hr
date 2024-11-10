'use client'
import { Loading } from '@/_components'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'

interface ISendConfirmationCode {
  action: (email: string) => void
}

const SendConfirmationCode = ({ action }: ISendConfirmationCode) => {
  const [email, setEmail] = useState('')

  return (
    <>
      <TextField
        label="Email"
        placeholder="Enter your email..."
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex justify-end mt-6">
        <Loading id="reset-password">
          <Button
            color="primary"
            variant="contained"
            onClick={() => action(email)}
          >
            Send
          </Button>
        </Loading>
      </div>
    </>
  )
}

export default SendConfirmationCode
