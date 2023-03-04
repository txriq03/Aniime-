import { Typography } from '@mui/material'
import React from 'react'
import Home from './Navbar'
import './css/Home.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bd284d'
    },
    background: {
      default: '#0E0E0E',
    }
  },
  typography: {
    fontFamily: 'Youtube Sans',
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "1rem",
        },
      },
    },
  }
});

function Calendar() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Home/>
        <Typography variant='h2' bgcolor='#0E0E0E' color='primary' sx={{textAlign: 'center', pt: 3, pb: 2}}>Calendar</Typography>
      </ThemeProvider>
    </>
  )
}

export default Calendar