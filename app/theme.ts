'use client'
import { blue, cyan, indigo, pink, teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[300],
      contrastText: '#fff',
    },
    secondary: {
      main: indigo[300],
      contrastText: '#fff',
    },
    info: {
      main: cyan[300],
      contrastText: '#fff',
    },
    error: {
      main: pink[300],
      contrastText: '#fff',
    },
    success: {
      main: teal[300],
      contrastText: '#fff',
    },
  },
})
