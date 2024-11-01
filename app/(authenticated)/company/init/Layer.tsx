'use client'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { IconButton } from '@mui/material'
import { MutableRefObject } from 'react'

interface LayerProps {
  index: number
  value: string
  update: (value: string) => void
  remove: () => void
  moveUp: () => void
  moveDown: () => void
  dragElem: MutableRefObject<number>
  draggedOverElem: MutableRefObject<number>
  handleSort: () => void
}

const Layer = ({
  index,
  value,
  update,
  remove,
  moveUp,
  moveDown,
  dragElem,
  draggedOverElem,
  handleSort,
}: LayerProps) => {
  return (
    <div
      className="flex justify-between items-center pr-4 pl-2 rounded-md border-2 ring-offset-0 ring-offset-white transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 animate-textFocus"
      draggable
      onDragStart={() => (dragElem.current = index)}
      onDragEnter={() => (draggedOverElem.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
    >
      <DragIndicatorIcon className="mr-2 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing" />
      <span className="mr-4 text-xs text-gray-500 whitespace-nowrap">
        Layer {index + 2}:
      </span>
      <input
        type="text"
        className="py-1 px-1 w-full focus:outline-none"
        placeholder="Enter a name..."
        value={value}
        maxLength={64}
        onChange={(e) => update(e.target.value)}
      />
      <div className="flex items-center space-x-2">
        <IconButton aria-label="up" onClick={moveUp}>
          <KeyboardArrowDownIcon className="text-gray-500 rounded-full ring-1 ring-gray-500 rotate-180" />
        </IconButton>
        <IconButton aria-label="down" onClick={moveDown}>
          <KeyboardArrowDownIcon className="text-gray-500 rounded-full ring-1 ring-gray-500" />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={remove} className="text-rose-400" />
        </IconButton>
      </div>
    </div>
  )
}

export default Layer
