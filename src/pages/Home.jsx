import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Tooltip, Zoom } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import {  FaDiscord } from "react-icons/fa";
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import logo from '../assets/aniime.png';
import './css/Home.css';
import { styled } from '@mui/system';
import axios from "axios";


//query for searching anime 
const url ="https://api.consumet.org/anime/9anime/info/spy-x-family.6ll19";
const data = async () => {
  try {
      const { data } = await axios.get(url, { params: { id: "spy-x-family.6ll19" }});
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

  return (
    <>
      <CssBaseline/>
      <Helmet>
        <title>Home - Aniime</title>
      </Helmet>
      <ThemeProvider theme={theme}>
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} elevation={0}>
        <Box p={2} sx={{display: 'flex', flexDirection: 'column'}}>
          <Tooltip title="Home" TransitionComponent={Zoom} placement='right'>
            <Box className='cottage-paper'  >
              <StyledButton sx={{ml: 1.2, mt: 1.2}} >
                <Cottage className="cottage" style={{ fontSize: 45 }}  />
              </StyledButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Trending'>
            <Box className="whatshot-paper">
              <StyledButton sx={{ml: 1.2, mt: 1.2}} >
                <Whatshot className="whatshot" style={{ fontSize: 45 }} />
              </StyledButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Recently Updated'>
            <Box className="update-paper">
              <StyledButton sx={{ml: 1.2, mt: 1.2}}>
                <Update className="update" style={{ fontSize: 45 }} />
              </StyledButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Calendar'>
            <Box className="calendar-paper">
              <StyledButton sx={{ml: 1.2, mt: 1.2}}>
                <CalendarMonth className="calendar" style={{ fontSize: 45 }} />
              </StyledButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Categories'>
            <Box className="interests-paper">
              <StyledButton sx={{ml: 1.2, mt: 1.2}}>
                <Interests className="interests" style={{ fontSize: 45 }} />
              </StyledButton>
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