import { Typography, Box} from '@mui/material'
import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import './css/Home.css'
import axios from "axios";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'vidstack/define/media-player.js';
import 'vidstack/styles/defaults.css';
import { MediaOutlet, MediaPlayer } from '@vidstack/react';

const corsProxy = "https://cors.haikei.xyz/"
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

function Trending() {
  const [ trending, setTrending ] = useState([])
  const [ selected, setSelected ] = useState(false)
  const [ episodeUrl, setEpisodeUrl ] = useState('')
  
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
  
  const getStream = async (episodeId) => {
    const streamUrl = `https://api.consumet.org/meta/anilist/watch/${episodeId}`;
    try {
        const { data } = await axios.get(streamUrl);
        console.log(data)
        setEpisodeUrl(data.sources[3].url)
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
  }

  const getInfo = async (id) => {
    const infoUrl =  `https://api.consumet.org/meta/anilist/info/${id}`
    try {
      const { data } = await axios.get(infoUrl);
      console.log(data.episodes[0].id)
      getStream(data.episodes[0].id)
      return data;
  } catch (err) {
      throw new Error(err.message);
  }}

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Typography variant='h2' bgcolor='#0E0E0E' color='primary' sx={{textAlign: 'center', py: 3}}>Trending</Typography>
        <Box align='center'>
          {trending.map(anime => (
            <a key={anime.id} target='_blank'>
              <Box
              onClick={() => getInfo(anime.id)}
              component="img"
              src={anime.image}
              sx={{m: 1, borderRadius: 2, boxShadow: 5, height: '460px', width: '290px', objectFit: 'cover'}}
              />
            </a>
          ))}
        </Box>
         <MediaPlayer controls src={`${corsProxy}${episodeUrl}`}> <MediaOutlet/> </MediaPlayer>
      </ThemeProvider>
          
    </>
  )
}

export default Trending