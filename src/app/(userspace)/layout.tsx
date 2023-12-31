'use client'

import { getPermissions } from '@/utilities/permissions'
import {
  People,
  SnippetFolder,
  Subscriptions,
  TravelExplore,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { useRouter } from 'next-nprogress-bar'
import React from 'react'
import LayoutToolbar from './toolbar'

const drawerWidth = 200

function EasyListItem({
  text,
  icon,
  href,
}: {
  text: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton href={href}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default function UserspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const router = useRouter()
  function navigate(to: string) {
    if (mobileOpen) setMobileOpen(false)
    router.push(to)
  }

  const permissions = getPermissions()

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Divider textAlign="left">Courses</Divider>
        {permissions.navigation.catalog && (
          <EasyListItem text={'Catalog'} icon={<TravelExplore />} href="/" />
        )}
        {permissions.navigation.enrolled && (
          <EasyListItem
            text={'Enrolled'}
            icon={<Subscriptions />}
            href="/enrolled"
          />
        )}
        {permissions.navigation.templates && (
          <EasyListItem
            text={'Templates'}
            icon={<SnippetFolder />}
            href="/template"
          />
        )}
        {permissions.instructor.create && (
          <EasyListItem text={'Users'} icon={<People />} href="/users" />
        )}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <LayoutToolbar handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
