import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import { FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";
import { useState, onMouseOver, onMouseEnter, onMouseLeave } from 'react'
import { Helmet } from 'react-helmet';
import logo from '../assets/aniime.png';
import './css/Home.css';
import { styled } from '@mui/system';
import { CSSTransition } from 'react-transition-group'

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
    fontFamily: 'Source Sans Pro',
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


function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [Hover, setHover] = useState(false);


  const handleMouseEnter = () => {
    setHover(true)
  };
  const handleMouseLeave = () => {
    setHover(false)
  }


  return (
    <>
      <CssBaseline/>
      <Helmet>
        <title>Home - Aniime</title>
      </Helmet>
      <ThemeProvider theme={theme}>
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} elevation={0}>
        <Box p={2} sx={{display: 'flex', flexDirection: 'column'}}>
          <CSSTransition 
            in={isEnter}
            timeout={1000}
            className="HomeIcon"
          >
            <Paper className='HomeIcon' sx={{width: 80, height: 80, mt: 10, cursor: 'pointer', boxShadow: 10, borderRadius: 10, '&:hover': { borderRadius: 3, bgcolor: '#bd284d' }, transition: (theme) => theme.transitions.create('all')}} >
              <IconButton sx={{ml: 1.2, mt: 1.2}} >
                <Cottage style={{ fontSize: 45 }} color='primary' sx={{ '&:hover': { color: 'white' }, transition: (theme) => theme.transitions.create('all')}}/>
              </IconButton>
            </Paper>
          </CSSTransition>
          <Paper sx={{width: 80, height: 80, mt: 3, borderRadius: 10, boxShadow: 10, '&:hover': { borderRadius: 3, bgcolor: 'orange' }, transition: (theme) => theme.transitions.create('all')}}>
            <IconButton sx={{ml: 1.2, mt: 1.2}} >
              <Whatshot style={{ fontSize: 45 }} sx={{color: 'orange', '&:hover': { color: 'white' }, transition: (theme) => theme.transitions.create('all')}}/>
            </IconButton>
          </Paper>
          <Paper sx={{width: 80, height: 80, mt: 3, borderRadius: 10, boxShadow: 10, '&:hover': { borderRadius: 3, bgcolor: '#2ec4b6' }, transition: (theme) => theme.transitions.create('all')}}>
            <IconButton sx={{ml: 1.2, mt: 1.2}}>
              <Update style={{ fontSize: 45 }} sx={{color: '#2ec4b6', '&:hover': { color: 'white' }, transition: (theme) => theme.transitions.create('all')}}/>
            </IconButton>
          </Paper>
          <Paper sx={{width: 80, height: 80, mt: 3, borderRadius: 10, boxShadow: 10, '&:hover': { borderRadius: 3, bgcolor: '#BEEE62' }, transition: (theme) => theme.transitions.create('all')}}>
            <IconButton sx={{ml: 1.2, mt: 1.2}}>
              <CalendarMonth style={{ fontSize: 45 }} sx={{color: '#BEEE62', '&:hover': { color: 'white' }, transition: (theme) => theme.transitions.create('all')}}/>
            </IconButton>
          </Paper>
          <Paper sx={{width: 80, height: 80, mt: 3, borderRadius: 10, boxShadow: 10, '&:hover': { borderRadius: 3, bgcolor: '#9649cb' }, transition: (theme) => theme.transitions.create('all')}}>
            <IconButton sx={{ml: 1.2, mt: 1.2}}>
              <Interests style={{ fontSize: 45 }} sx={{color: '#9649cb', '&:hover': { color: 'white' }, transition: (theme) => theme.transitions.create('all')}}/>
            </IconButton>
          </Paper>
        </Box>
      </Drawer>
        <AppBar position="static" sx={{backgroundColor: 'black'}}>
          <Toolbar>
            <IconButton sx={{ml: 5}} onClick={() => setIsDrawerOpen(true)}>
              <Menu fontSize='large' />
            </IconButton>
            <Box
              component='img'
              alt="Aniime"
              onClick={() => navigate('/home')}
              src={logo}
              sx={{
                cursor: 'pointer',
                py: '12px',
                px: '10px',
                width: '170px',
                flexGrow: 0
              }}
            />
            <OutlinedInput sx={{ml: 55, width: '500px', bgcolor: '#141414'}} size='small' startAdornment={<IconButton sx={{ml: -0.5}}> <Search/> </IconButton>} placeholder='Search...' >Search...</OutlinedInput>

            <Typography sx={{flexGrow: 1}}/>
            <IconButton sx={{mr: 1}}>
              <FaDiscord size='1.2em' color='#5562EA' />
            </IconButton>
            <Button variant='contained' size='medium' endIcon={<KeyboardDoubleArrowRight/>} sx={{mr: 10}} >Sign in</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  )
}

export default Home