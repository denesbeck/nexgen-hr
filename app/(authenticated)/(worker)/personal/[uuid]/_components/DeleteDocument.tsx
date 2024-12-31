'use client'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

interface IDeleteDocument {
  uuid: string
}

const DeleteDocument = ({ uuid }: IDeleteDocument) => {
  return (
    <IconButton
      aria-label="delete-document"
      color="info"
      onClick={() => console.log('Delete', uuid)}
      size="medium"
    >
      <DeleteIcon />
    </IconButton>
  )
}

export default DeleteDocument
