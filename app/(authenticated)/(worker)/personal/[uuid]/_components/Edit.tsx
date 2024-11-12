'use client'
import { IconButton, ThemeProvider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { theme } from '@/theme'

interface IEdit {
  uuid: string
}

const Edit = ({ uuid }: IEdit) => {
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        aria-label="edit"
        color="primary"
        onClick={() => console.log('Edit', uuid)}
        size="large"
      >
        <EditIcon />
      </IconButton>
    </ThemeProvider>
  )
}

export default Edit
