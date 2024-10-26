import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

interface LayerProps {
  index: number
  value: string
  update: (value: string) => void
  remove: () => void
}

const Layer = ({ index, value, update, remove }: LayerProps) => {
  return (
    <div className="flex justify-between items-center px-4 rounded-md border-2 ring-offset-0 ring-offset-white transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 animate-textFocus">
      <span className="mr-4 text-xs text-gray-500 whitespace-nowrap">
        Layer {index + 2}:
      </span>
      <input
        type="text"
        className="py-1 px-1 w-full focus:outline-none"
        placeholder="Enter the name of this layer..."
        value={value}
        onChange={(e) => update(e.target.value)}
      />
      <div className="flex items-center space-x-2">
        <IconButton aria-label="delete">
          <DeleteIcon onClick={remove} className="text-rose-400" />
        </IconButton>
      </div>
    </div>
  )
}

export default Layer
