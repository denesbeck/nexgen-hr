import { Card } from '@/_components'
import { SvgIconComponent } from '@mui/icons-material'

interface DashboardCardProps {
  title: string
  value: number
  metric?: string
  footer?: string
  icon: SvgIconComponent
}
const DashboardCard = ({
  title,
  value,
  metric,
  footer,
  icon,
}: DashboardCardProps) => {
  const Icon = icon
  return (
    <Card>
      <div className="flex space-x-2">
        <Icon className="text-gray-300 min-h-14 min-w-14" />
        <div>
          <p className="text-base text-sky-500">{title}</p>
          <p className="text-3xl font-semibold text-black">
            {value}{' '}
            <span className="text-sm font-normal text-gray-500">{metric}</span>
          </p>
          <p className="mt-4 text-sm text-gray-500">{footer}</p>
        </div>
      </div>
    </Card>
  )
}

export default DashboardCard
