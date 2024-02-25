import React from 'react'

import { Box } from '@mui/material'

import Header from './Header.tsx'
import Footer from './Footer.tsx'

const BaseLayout = ({ content }: { content: React.ReactNode }) => {
  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', minHeight: '100dvh' } }>
      <Header/>
      <Box sx={ { flexGrow: 1 } }>
        { content }
      </Box>
      <Footer/>
    </Box>
  )
}

export default BaseLayout
