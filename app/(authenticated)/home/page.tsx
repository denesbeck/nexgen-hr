import { DashboardCard, DashboardList } from '@/_components'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import HistoryIcon from '@mui/icons-material/History'
import CampaignIcon from '@mui/icons-material/Campaign'
import GroupsIcon from '@mui/icons-material/Groups'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const RECENT_ACTIVITY = [
  {
    content: 'Your job title has been updated.',
    footer: '3 hours ago',
  },
  {
    content: 'You submitted your work time successfully.',
    footer: '3 hours ago',
  },
  {
    content: 'Your vacation request has been approved.',
    footer: '3 hours ago',
  },
  {
    content: 'Your vacation request has been approved.',
    footer: '3 hours ago',
  },
  {
    content: 'Your vacation request has been approved.',
    footer: '3 hours ago',
  },
]

const ANNOUNCEMENTS = [
  {
    content: 'We are happy to announce our new CEO.',
    footer: '3 hours ago',
  },
  {
    content:
      'Survey about the benefits package is available till 21st, October.',
    footer: '2 days ago',
  },
]

const PEER_VACATIONS = [
  {
    avatar: 'JD',
    content: 'John Doe',
    footer: 'back on 2024-10-11',
  },
  {
    avatar: 'JD',
    content: 'Jane Doe',
    footer: 'back on 2024-10-11',
  },
  {
    avatar: 'DB',
    content: 'Denes Beck',
    footer: 'back on 2026-10-11',
  },
]

const Home = () => {
  return (
    <div className="grid gap-8 justify-center items-start w-full h-full lg:grid-cols-2 xl:grid-cols-3">
      <DashboardCard
        title="Remaining vacation"
        value={14}
        footer="calculated from 2024-05-24"
        icon={BeachAccessIcon}
      />
      <DashboardCard
        title="Pending workitems"
        value={3}
        footer="due date 2024-10-11"
        icon={AssignmentIcon}
      />
      <DashboardList
        title="Recent activity"
        icon={HistoryIcon}
        list={RECENT_ACTIVITY}
      />
      <DashboardList
        title="Announcements"
        icon={CampaignIcon}
        list={ANNOUNCEMENTS}
      />
      <DashboardList
        title="Peer vacations"
        icon={GroupsIcon}
        list={PEER_VACATIONS}
      />
      <DashboardCard
        title="Next salary expected in"
        value={23}
        metric="days"
        icon={AttachMoneyIcon}
      />
    </div>
  )
}

export default Home
