import { Typography } from '@mui/material'
import React from 'react'
import Home from './Navbar'
import './css/Home.css'

function Calendar() {
  return (
    <>
      <Home/>
      <Typography variant='h3' bgcolor='#0E0E0E' color='white' sx={{textAlign: 'center', py: 5}}>Calendar 🗓️ </Typography>
    </>
  )
}

export default Calendar