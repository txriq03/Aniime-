import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Tooltip, Zoom } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import {  FaDiscord } from "react-icons/fa";
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import logo from '../assets/aniime.png';
import './css/Home.css';
import { styled } from '@mui/system';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";

//streaming link example => https://api.consumet.org/meta/anilist/watch/109893?provider=9anime
//info url example => "https://api.consumet.org/meta/anilist/info/98659?provider=9anime"

//query for searching anime 
const url = "https://api.consumet.org/meta/anilist/info/21";
const data = async () => {
    try {
        const { data } = await axios.get(url, { params: { provider: "gogoanime" } });
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
};
console.log(data())

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

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: none;
  }
`


function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  let navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [Hover, setHover] = useState(false);

  return (
    <>
      <CssBaseline/>
      <Helmet>
        <title>Home - Aniime</title>
      </Helmet>
      <ThemeProvider theme={theme}>
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} elevation={0}>
        <Box p={2} sx={{display: 'flex', flexDirection: 'column'}}>
          <Tooltip title="Home" TransitionComponent={Zoom} placement='right' arrow >
            <Box className='cottage-active' onClick={() => navigate('/home')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}} >
                <Cottage className="cottage-icon" style={{ fontSize: 45 }}  />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Trending' arrow  >
            <Box className="whatshot" onClick={() => navigate('/home/trending')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}} >
                <Whatshot className="whatshot-icon" style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Recently Updated' arrow >
            <Box className="update" onClick={() => navigate('/home/updated')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <Update className="update-icon" style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Calendar' arrow>
            <Box className="calendar" onClick={() => navigate('/home/calendar')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <CalendarMonth className="calendar-icon" style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Categories' arrow >
            <Box className="interests" onClick={() => navigate('/home/categories')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <Interests className="interests-icon" style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
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
            <Typography sx={{flexGrow: 1}}/>
            <OutlinedInput sx={{mr: '200px', width: '500px', bgcolor: '#141414'}} size='small' startAdornment={<IconButton sx={{ml: -0.5}}> <Search/> </IconButton>} placeholder='Search...' >Search...</OutlinedInput>
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