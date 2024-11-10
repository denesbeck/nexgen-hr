import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import PaymentIcon from '@mui/icons-material/Payment'
import BarChartIcon from '@mui/icons-material/BarChart'
import PeopleIcon from '@mui/icons-material/People'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import LayersIcon from '@mui/icons-material/Layers'
import BusinessIcon from '@mui/icons-material/Business'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DomainIcon from '@mui/icons-material/Domain'

import type { Navigation } from '@toolpad/core'
import { createTheme } from '@mui/material/styles'

export const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Worker',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'personal',
    title: 'Personal',
    icon: <PersonIcon />,
  },
  {
    segment: 'contact',
    title: 'Contact',
    icon: <ContactPageIcon />,
  },
  {
    segment: 'job',
    title: 'Job',
    icon: <WorkIcon />,
  },
  {
    segment: 'time',
    title: 'Time',
    icon: <WatchLaterIcon />,
  },
  {
    segment: 'compensation',
    title: 'Compensation',
    icon: <PaymentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Admin',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'company',
    title: 'Company',
    icon: <DomainIcon />,
  },
  {
    segment: 'calendars',
    title: 'Calendars',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'employees',
        title: 'Employees',
        icon: <PeopleIcon />,
      },
      {
        segment: 'new-hires',
        title: 'New Hires',
        icon: <GroupAddIcon />,
      },
    ],
  },
  {
    segment: 'new-hire',
    title: 'New Hire',
    icon: <PersonAddIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'job-portal',
    title: 'Job Portal',
    icon: <BusinessIcon />,
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
]

export const THEME = createTheme({
  palette: {
    mode: 'dark',
  },
})
