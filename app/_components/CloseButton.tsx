import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface CloseButtonProps {
  close: () => void
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: 'min-h-6 min-w-6',
  md: 'min-h-8 min-w-8',
  lg: 'min-h-12 min-w-12',
}

const CloseButton = ({ close, size = 'sm' }: CloseButtonProps) => {
  return (
    <IconButton aria-label="close" color="inherit" size="small" onClick={close}>
      <CloseIcon className={`${SIZES[size]}`} />
    </IconButton>
  )
}

export default CloseButton
