import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import {  FaDiscord } from "react-icons/fa";
import { useState, onMouseOver, onMouseEnter, onMouseLeave } from 'react';
import { Helmet } from 'react-helmet';
import logo from '../assets/aniime.png';
import './css/Home.css';
import { styled } from '@mui/system';
import { CSSTransition } from 'react-transition-group';

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

const StyledButton = styled(IconButton)`
  &:hover {
    background: none;
  }
`


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
          <Box className='cottage-paper' onMouseEnter={handleMouseEnter}  >
            <StyledButton sx={{ml: 1.2, mt: 1.2}} >
              <Cottage className="cottage" style={{ fontSize: 45 }}  />
            </StyledButton>
          </Box>
          <Box className="whatshot-paper">
            <StyledButton sx={{ml: 1.2, mt: 1.2}} >
              <Whatshot className="whatshot" style={{ fontSize: 45 }} />
            </StyledButton>
          </Box>
          <Box className="update-paper">
            <StyledButton sx={{ml: 1.2, mt: 1.2}}>
              <Update className="update" style={{ fontSize: 45 }} />
            </StyledButton>
          </Box>
          <Box className="calendar-paper">
            <StyledButton sx={{ml: 1.2, mt: 1.2}}>
              <CalendarMonth className="calendar" style={{ fontSize: 45 }} />
            </StyledButton>
          </Box>
          <Box className="interests-paper">
            <StyledButton sx={{ml: 1.2, mt: 1.2}}>
              <Interests className="interests" style={{ fontSize: 45 }} />
            </StyledButton>
          </Box>
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
            <IconButton sx={{mr: 1}} href='https://discord.com/invite/qTPfvMxzNH'>
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