'use client'
import { SvgIconComponent } from '@mui/icons-material'
import { Avatar, Divider, Stack } from '@mui/material'
import { teal } from '@mui/material/colors'

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
    <div className="overflow-hidden row-span-2 py-6 pr-2 pl-4 space-y-2 h-full bg-white rounded-md shadow-md transition-transform duration-200 ease-in-out cursor-pointer select-none hover:scale-105 w-[20rem] max-w-[80vw] animate-slideInFromBottom xl:min-h-[18rem]">
      <div className="flex items-center space-x-4">
        <Icon className="text-gray-300 min-h-10 min-w-10" />
        <p className="text-base text-sky-500">{title}</p>
      </div>

      {list.length ? (
        <Stack
          className="overflow-auto pr-2 max-h-[40vh]"
          divider={<Divider orientation="vertical" flexItem />}
        >
          {list.map((el, index) => {
            return (
              <div
                key={index}
                className="grid content-between py-3 px-2 text-sm text-gray-500 rounded-sm border-b last:border-b-0 h-[4.5rem] border-neutral-100 hover:bg-neutral-100"
              >
                <div className="flex items-center space-x-2">
                  {el.avatar && (
                    <Avatar sx={{ bgcolor: teal[300] }}>{el.avatar}</Avatar>
                  )}
                  <p className="font-black">{el.content}</p>
                </div>
                <p className="w-full text-xs text-gray-400 text-end">
                  {el.footer}
                </p>
              </div>
            )
          })}
        </Stack>
      ) : (
        <p className="pl-14 text-gray-400">No items to display</p>
      )}
    </div>
  )
}

export default DashboardList
