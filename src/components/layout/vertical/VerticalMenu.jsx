// VerticalMenu. Lokasi : /src/components/layout/vertical/VerticalMenu.jsx

'use client'

import React from 'react'

import { useSession } from 'next-auth/react'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  const { data: session } = useSession()
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  if (!session) {
    return null
  }

  const isAdmin = session.user.userType === 'ADMIN'
  const isKaryawan = session.user.userType === 'KARYAWAN'

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        {isAdmin && (
          <>
            <MenuItem
              href='/dashboard'
              icon={<i className="ri-dashboard-line"></i>}
            >
              Dashboard
            </MenuItem>
            <MenuSection Label='Debt Menu'>
              <SubMenu
                label='Debt'
                icon={<i className="ri-bill-line"></i>}
              >
                <MenuItem href='/dashboard/request'>Debt Request</MenuItem>
                <MenuItem href='/dashboard/bayar'>Payment Confirmation</MenuItem>
              </SubMenu>
            </MenuSection>
            <SubMenu
              label='Report'
              icon={<i className='ri-file-chart-fill' />}
            >
              <MenuItem href='/dashboard/cetak'>Debt Report</MenuItem>
            </SubMenu>
            <SubMenu
              label='Account'
              icon={<i className='ri-account-circle-fill' />}
            >
              <MenuItem href='/dashboard/daftar-akun'>Account Table</MenuItem>
              <MenuItem href='/dashboard/registrasi-akun'>Account Registration</MenuItem>
              <MenuItem href='/dashboard/reset-password-akun'>Reset Password Account</MenuItem>
            </SubMenu>
            <SubMenu
              label='Help'
              icon={<i class="ri-question-line"></i>}
            >
              <MenuItem href='/dashboard/bantuan'>Usage</MenuItem>
              <MenuItem href='/dashboard/dokumentasi-api'>API Documentation</MenuItem>
            </SubMenu>
          </>
        )}

        {isKaryawan && (
          <>
            <MenuItem
              href='/dashboard'
              icon={<i className="ri-dashboard-line"></i>}
            >
              Dashboard
            </MenuItem>
            <MenuSection Label='Debt Menu'>
              <SubMenu
                label='Debt'
                icon={<i className="ri-bill-line"></i>}
              >
                <MenuItem href='/dashboard/tambah-kasbon'>Add New Debt Request</MenuItem>
              </SubMenu>
              <SubMenu
              label='Help'
              icon={<i class="ri-question-line"></i>}
            >
              <MenuItem href='/dashboard/bantuan'>Usage</MenuItem>
            </SubMenu>
            </MenuSection>
          </>
        )}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
