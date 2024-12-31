'use client'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

interface IEditInfo {
  uuid: string
}

const EditInfo = ({ uuid }: IEditInfo) => {
  return (
    <Button
      variant="text"
      color="primary"
      className="flex items-center space-x-1"
      onClick={() => console.log(uuid)}
    >
      <EditIcon className="w-4 h-4" />
      <span>Edit</span>
    </Button>
  )
}

export default EditInfo
