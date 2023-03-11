import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Tooltip, Zoom } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import {  FaDiscord } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import logo from '../assets/aniime.png';
import './css/Home.css';
import { styled } from '@mui/system';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import axios from "axios";

//streaming link example => https://api.consumet.org/meta/anilist/watch/109893?provider=9anime
//info url example => "https://api.consumet.org/meta/anilist/info/98659?provider=9anime"

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


function Navbar() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  let navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const [ searchResults, setSearchResults ] = useState([]);

  const [ query, setQuery ] = useState('')
  const data = async () => {
    if (query != '') {
      const url = `https://api.consumet.org/meta/anilist/${query}?page=1`;
      try {
          const { data } = await axios.get(url);
          setSearchResults(data.results)
          console.log(data)
          return data;
      } catch (err) {
          throw new Error(err.message);
      }

    } else {
      alert("Search field cannot be empty")
    }
  };


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
            <Box className={location.pathname == '/home' ? 'cottage-active' : 'cottage'} onClick={() => navigate('/home')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}} >
                <Cottage className="cottage-icon" style={{ fontSize: 45 }}  />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Trending' arrow  >
            <Box className={location.pathname == '/trending' ? 'whatshot-active' : 'whatshot'} onClick={() => navigate('/trending')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}} >
                <Whatshot className="whatshot-icon" style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Recently Updated' arrow >
            <Box className={location.pathname == '/updated' ? 'update-active' : 'update'}onClick={() => navigate('/updated')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <Update className="update-icon" style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Schedule' arrow>
            <Box className={location.pathname == '/calendar' ? 'calendar-active' : 'calendar'} onClick={() => navigate('/calendar')}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <CalendarMonth className="calendar-icon" style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Categories' arrow >
            <Box className={location.pathname == '/categories' ? 'interests-active' : 'interests'} onClick={() => navigate('/categories')}>
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
            <Typography sx={{flexGrow: 1}}>by txriq03</Typography>
            <OutlinedInput sx={{ mr: 10, width: '30%', bgcolor: '#141414', textAlign: 'center'}} size='small' onChange={(e) => setQuery(e.target.value)} startAdornment={<IconButton sx={{ml: -0.5}} onClick={data} > <Search/> </IconButton>} placeholder='Search...' >Search...</OutlinedInput>
            <IconButton sx={{mr: 1}} href='https://discord.com/invite/qTPfvMxzNH'>
              <FaDiscord size='1.2em' color='#5562EA' />
            </IconButton>
            <Button variant='contained' size='medium' endIcon={<KeyboardDoubleArrowRight/>} sx={{mr: 10}} >Sign in</Button>
          </Toolbar>
        </AppBar>
        {searchResults != '' && <Typography variant='h3' align='center' color="primary" sx={{m: 2}}>Results</Typography>}
        <Box align='center'>
          {searchResults.map(anime => (
              <a href={anime.image} key={anime.id} target='_blank'>
                <Box
                component="img"
                src={anime.image}
                sx={{m: 1, borderRadius: 2, boxShadow: 5, height: '460px', width: '290px', objectFit: 'cover'}}
                />
                {/* <Typography variant='h6' sx={{pb: 2, px: 2}} >{anime.title.romaji}</Typography> */}
              </a>
          ))}
        </Box>

      </ThemeProvider>
    </>
  )
}

export default Navbar