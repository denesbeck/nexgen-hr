'use client'
import { Button, ThemeProvider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { theme } from '@/theme'

interface IEditInfo {
  uuid: string
}

const EditInfo = ({ uuid }: IEditInfo) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      className="flex space-x-1"
      onClick={() => console.log(uuid)}
    >
      <EditIcon className="w-4 h-4" />
      <span>Edit</span>
    </Button>
  )
}

export default EditInfo
