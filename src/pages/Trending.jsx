import { Typography } from '@mui/material'
import React from 'react'
import Home from './Home'
import './css/Home.css'

function Trending() {
  return (
    <>
      <Home/>
      <Typography variant='h3' bgcolor='#0E0E0E' color='white' sx={{textAlign: 'center', py: 5}}>Trending 🔥</Typography>
    </>
  )
}

export default Trending