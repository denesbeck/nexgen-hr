'use client'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { IconButton } from '@mui/material'

interface IDownloadDocument {
  uuid: string
}

const DownloadDocument = ({ uuid }: IDownloadDocument) => {
  return (
    <IconButton
      aria-label="download-document"
      color="success"
      onClick={() => console.log('Delete', uuid)}
      size="medium"
    >
      <CloudDownloadIcon />
    </IconButton>
  )
}

export default DownloadDocument
