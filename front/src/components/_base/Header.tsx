import React, { MouseEvent, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import setIsAuthorized from '../../store/reducers/UserSlice.ts'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Button, Container } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../_styled-components/SearchInput.tsx'
import Logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import { logoutUser } from '../../store/actions/UserActions.ts'

const pages = [
  { title: 'Home', route: '/' },
  { title: 'Books', route: '/book' },
  { title: 'Rules', route: '/rules' },
]

const settings = ['Profile', 'Settings', 'Logout']

const SearchAppBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState<Boolean>(false)
  const [userSettings, setUserSettings] = React.useState<HTMLElement | null>(
    null,
  )

  useEffect(() => {
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    if (accessToken && refreshToken) {
      setIsAuthorized(true)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setUserSettings(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setUserSettings(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={Logo} alt="Logo" height={100} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'flex' },
              alignItems: 'center',
            }}
          >
            {pages.map((page) => (
              <Link to={page.route} key={page.title}>
                <Button
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontSize: {
                      xs: '0.8rem',
                      md: '1rem',
                    },
                  }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
            <Search sx={{ display: { xs: 'none', md: 'block' } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          {!isAuthorized ? (
            <Link to="/register">Register</Link>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ fontSize: 36, color: 'white' }} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={userSettings}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(userSettings)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default SearchAppBar
