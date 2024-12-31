import { Button } from '@mui/material'

const FileUpload = () => {
  return (
    <Button variant="contained" component="label">
      Upload File
      <input type="file" hidden />
    </Button>
  )
}

export default FileUpload
