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
      color="info"
      onClick={() => console.log('Download', uuid)}
      size="medium"
    >
      <CloudDownloadIcon />
    </IconButton>
  )
}

export default DownloadDocument
