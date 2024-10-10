import { SvgIconComponent } from '@mui/icons-material'
import { Divider, Stack } from '@mui/material'

type ListItem = {
  avatar?: string
  content: string
  footer: string
}

interface DashboardListProps {
  title: string
  icon: SvgIconComponent
  list: ListItem[]
}

const DashboardList = ({ title, icon, list }: DashboardListProps) => {
  const Icon = icon

  return (
    <div className="overflow-hidden row-span-2 py-6 px-4 space-y-2 h-full bg-white rounded-md shadow-md transition-transform duration-200 ease-in-out cursor-pointer select-none hover:scale-105 w-[20rem] max-w-[80vw] xl:min-h-[18rem]">
      <div className="flex items-center space-x-4">
        <Icon className="text-4xl text-gray-300" />
        <p className="text-base text-sky-500">{title}</p>
      </div>
      <Stack divider={<Divider orientation="vertical" flexItem />}>
        {list.map((el, index) => {
          return (
            <div
              key={index}
              className="grid content-between py-3 px-2 text-sm text-gray-500 rounded border-b last:border-b-0 h-[4.5rem] border-neutral-100 hover:bg-neutral-100"
            >
              <p>{el.content}</p>
              <p className="w-full text-xs text-gray-400 text-end">
                {el.footer}
              </p>
            </div>
          )
        })}
      </Stack>
    </div>
  )
}

export default DashboardList
