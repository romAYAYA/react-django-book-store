import React, { MouseEvent } from 'react'

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

import { Search, SearchIconWrapper, StyledInputBase } from '../_styled-components/SearchInput.tsx'
import Logo from '../../assets/images/logo.png'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export default function SearchAppBar() {
  const [userSettings, setUserSettings] = React.useState<HTMLElement | null>(null)
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
          <img src={ Logo } alt="Logo" height={ 100 }/>
          <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'flex' }, alignItems: 'center' } }>
            { pages.map((page) => (
              <Button
                key={ page }
                sx={ {
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontSize: {
                    xs: '0.8rem',
                    md: '1rem'
                  }
                } }
              >
                { page }
              </Button>
            )) }
            <Search sx={ { display: { xs: 'none', md: 'block' } } }>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={ { 'aria-label': 'search' } }
              />
            </Search>
          </Box>
          <Box sx={ { flexGrow: 0 } }>
            <IconButton onClick={ handleOpenUserMenu } sx={ { p: 0 } }>
              <AccountCircleIcon sx={ { fontSize: 36, color: 'white'} }/>
            </IconButton>
            <Menu
              sx={ { mt: '45px' } }
              id="menu-appbar"
              anchorEl={ userSettings }
              anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right'
              } }
              keepMounted
              transformOrigin={ {
                vertical: 'top',
                horizontal: 'right'
              } }
              open={ Boolean(userSettings) }
              onClose={ handleCloseUserMenu }
            >
              { settings.map((setting) => (
                <MenuItem key={ setting } onClick={ handleCloseUserMenu }>
                  <Typography textAlign="center">{ setting }</Typography>
                </MenuItem>
              )) }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}