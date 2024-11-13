'use client'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

interface IEditDocument {
  uuid: string
}

const EditDocument = ({ uuid }: IEditDocument) => {
  return (
    <IconButton
      aria-label="edit-document"
      color="info"
      onClick={() => console.log('Edit', uuid)}
      size="medium"
    >
      <EditIcon />
    </IconButton>
  )
}

export default EditDocument
