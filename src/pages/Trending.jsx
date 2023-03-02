import { Typography, Box} from '@mui/material'
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import './css/Home.css'
import axios from "axios";
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

function Trending() {
  // Using the example query "demon", and looking at the first page of results.
  const [ trending, setTrending ] = useState([])
  const trendingUrl = "https://api.consumet.org/meta/anilist/trending";
  const data = async () => {
    try {
      const { data } = await axios.get(trendingUrl, { params: {
        page: 1,
        perPage: 20
      } });
      setTrending(data.results.slice(0, 20))
      console.log(data)
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  useEffect(() => {
    data()
  }, [])
  
  const getStream = async (id) => {
    const streamUrl = `https://api.consumet.org/meta/anilist/watch/${id}?provider=9anime`
    try {
      const { data } = await axios.get(streamUrl);
      console.log(data)
      return data;
  } catch (err) {
      throw new Error(err.message);
  }
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Typography variant='h2' bgcolor='#0E0E0E' color='white' sx={{textAlign: 'center', py: 3}}>Trending 🔥</Typography>
        <Box align='center'>
          {trending.map(anime => (
            <a key={anime.id} target='_blank'>
              <Box
              onClick={() => getStream(anime.id)}
              component="img"
              src={anime.image}
              sx={{m: 1, borderRadius: 2, boxShadow: 5, height: '460px'}}
              />
            </a>
          ))}
        </Box>
      </ThemeProvider>

    </>
  )
}

export default Trending