import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Tooltip, Zoom, Grid} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import {  FaDiscord } from "react-icons/fa";
import {  useState } from 'react';
import { Helmet } from 'react-helmet';
import logo from '../assets/aniime.png';
import './css/Home.css';
import { styled } from '@mui/system';
import {  useNavigate, useLocation, } from 'react-router-dom';

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: none;
  }
`
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

function Navbar() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  let navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const [ searchResults, setSearchResults ] = useState([]);

  const [ query, setQuery ] = useState('')
  const searchQuery = () => {
    navigate(`/search/${query}`)
  }

  const truncate = (str, maxLength = 30 ) => {
    if (str.length <= maxLength) return str;
    const truncated = str.substring(0, maxLength-3);
    return truncated + "..."
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Helmet>
          <title>Home - Aniime</title>
        </Helmet>
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
              <Typography>by txriq03</Typography>
              <OutlinedInput sx={{ m: 'auto', width: '30%', bgcolor: '#0e0e0e', textAlign: 'center', fontFamily: 'Nunito', borderRadius: 2}} size='small' onChange={(e) => setQuery(e.target.value)} startAdornment={<IconButton sx={{ml: -0.5}} onClick={searchQuery} > <Search/> </IconButton>} placeholder='Search...' >Search...</OutlinedInput>
              <IconButton sx={{mr: 1}} href='https://discord.com/invite/qTPfvMxzNH'>
                <FaDiscord size='1.2em' color='#5562EA' />
              </IconButton>
              <Button variant='contained' size='medium' endIcon={<KeyboardDoubleArrowRight/>} sx={{mr: 10, whiteSpace: 'nowrap', minWidth: 80}} >Sign in</Button>
            </Toolbar>
          </AppBar>
          {searchResults != '' && <Typography variant='h3' align='center' color="primary" sx={{m: 2}}>Results</Typography>}
          <Grid container align='center' justifyContent="center" direction='row' spacing='0'>
            {searchResults.map(anime => (
                <a href={anime.image} key={anime.id} target='_blank' style={{textDecoration: 'none', color: 'grey'}}>
                  <Box
                  component="img"
                  src={anime.image}
                  sx={{m: 1, borderRadius: 2, boxShadow: 5, height: '460px', width: '290px', objectFit: 'cover', cursor: 'pointer', '&:hover': { transform: 'scale(1.05)'}, transition: theme.transitions.create("transform")}}
                  />
                  <Typography variant='h6'  sx={{pb: 2, px: 2}} >{truncate(anime.title.romaji)}</Typography>
                </a>
            ))}
          </Grid>
      </ThemeProvider>
    </>
  )
}

export default Navbar