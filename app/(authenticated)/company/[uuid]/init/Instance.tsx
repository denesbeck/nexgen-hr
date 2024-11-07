'use client'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { IInstance } from '@/_hooks/useInstances'

interface InstanceProps {
  value: string
  hasParent: boolean
  parent: string | null
  parentInstances: IInstance[]
  updateParent: (value: string | null) => void
  updateName: (value: string) => void
  remove: () => void
}

const Instance = ({
  value,
  hasParent,
  parent,
  parentInstances,
  updateParent,
  updateName,
  remove,
}: InstanceProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center px-4 rounded-md border-2 ring-offset-0 ring-offset-white transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 animate-textFocus">
      <div className="flex items-center">
        <span className="mr-4 text-xs text-gray-500 whitespace-nowrap">
          Instance:
        </span>
        <input
          type="text"
          className="py-1 px-1 w-full focus:outline-none min-w-[10rem]"
          placeholder="Enter a name..."
          value={value}
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
      <div className="flex justify-end items-center space-x-2">
        {hasParent && (
          <div className="flex items-center">
            <span className="mr-4 text-xs text-gray-500 whitespace-nowrap">
              Parent:
            </span>
            <select
              className="py-1 px-2 w-max bg-white rounded-md border max-w-[12rem]"
              defaultValue={parent || 'null'}
              onChange={(e) =>
                updateParent(e.target.value === 'null' ? null : e.target.value)
              }
            >
              <option value={'null'}>None</option>
              {parentInstances.map((instance) => (
                <option key={instance.uuid} value={instance.uuid}>
                  {instance.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <IconButton aria-label="delete">
          <DeleteIcon onClick={remove} className="text-rose-400" />
        </IconButton>
      </div>
    </div>
  )
}

export default Instance
