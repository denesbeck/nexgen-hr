import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import PaymentIcon from '@mui/icons-material/Payment'
import BarChartIcon from '@mui/icons-material/BarChart'
import PeopleIcon from '@mui/icons-material/People'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LayersIcon from '@mui/icons-material/Layers'
import BusinessIcon from '@mui/icons-material/Business'
import GroupAddIcon from '@mui/icons-material/GroupAdd'

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
    segment: 'info',
    title: 'Info',
    icon: <PersonIcon />,
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
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
})
