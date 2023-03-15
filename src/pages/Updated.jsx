import { Typography } from '@mui/material'
import React from 'react'
import Home from './Navbar'
import './css/Home.css'

function Updated() {
  return (
    <>
        <Home/>
        <Typography variant='h2' bgcolor='#0E0E0E' color='primary' sx={{textAlign: 'center', pt: 3, pb: 2}}>Recently Updated</Typography>
    </>
  )
}

export default Updated