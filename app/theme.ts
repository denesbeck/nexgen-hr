'use client'
import { blue, teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[300],
    },
    success: {
      main: teal[300],
    },
  },
})
