import { Box, Typography, Card, Backdrop, Grid} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import './css/Home.css';
import axios from "axios";
import Navbar from './Navbar'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { ANIME } from '@consumet/extensions';
import { Update } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { motion } from "framer-motion";
import './css/Home.css'

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

// const main = async () => {
//   const zoro = new ANIME.Zoro();
//   zoro.search("demon").then(data => {
//     console.log(data)
//   })
// }
// main()

function Home() {
  const [ data, setData ] = useState("");
  const [ trending, setTrending ] = useState([])
  const [ cover, setCover ] = useState([])
  const [width, setWidth ] = useState(0)
  const carousel = useRef();

  const handleWindowResize = () => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    console.log(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }

  // const getData = async () => {
  //   const url = "https://api.consumet.org/meta/anilist/info/142853";
  //   await axios.get(url, { params: { provider: "9anime" }}).then(
  //   (response) => {
  //     setData(response.data.cover)
  //     console.log(response)
  //   });
  // };

  useEffect(() => {
    getTrending()
    //window.addEventListener('resize', handleWindowResize)
  }, [])
  
  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }, [trending, window.innerWidth])
  
  const getTrending = async () => {
    const trendingUrl = "https://api.consumet.org/meta/anilist/trending";
    try {
      const { data } = await axios.get(trendingUrl, { params: {
        page: 1,
        perPage: 20
      } });
      setTrending(data.results.slice(0, 20))
      setCover(data.results.slice(0, 5))
      console.log(data)
      return data;
    } catch (err) {
      throw new Error(err.message);
    }};

  //Shorten anime titles
  const truncate = (str, maxLength = 30 ) => {
    if (str.length <= maxLength) return str;
    const truncated = str.substring(0, maxLength-3);
    return truncated + "..."
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>

        {/* Top carousel */}
        <Grid justifyContent='center' >
          {cover != '' &&
          <Carousel duration='1000' autoPlay swipe animation='slide' sx={{mx: 10}}>
            {cover.map(anime => (
              <a key={anime.id} target='_blank'>
                <Box
                className="carousel-cover"
                component="img"
                src={anime.cover}
                sx={{ borderRadius: 2, objectFit: 'cover', width: '1700px', height: '400px', width: '100%', m: 'auto'}}
                />
              </a>
            ))}
          </Carousel>
          }

          {/* Recently Updated Carousel */}
          <Box sx={{maxWidth: '90%', margin: 'auto'}}>
            <Typography variant='h3' fontSize='2.5rem' color='white' sx={{mt: 2}}><Update style={{fontSize: '40'}}/> Recently Updated </Typography>
            <motion.div ref={carousel} className="carousel">
              <motion.div drag="x" dragConstraints={{right: 0, left: -width}} className="inner-carousel">
                {trending.map(anime => (
                  <motion.div className='items' key={anime.id}>
                    <a target='_blank'>
                      <Box
                      className="anime-card"
                      component="img"
                      src={anime.image}
                      sx={{mx: 1, mt: 2, borderRadius: 2, boxShadow: 5, height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer'}}
                      />
                      <Typography sx={{overflow: 'hidden', ml: 1, mb: 5, color: 'grey'}}>{truncate(anime.title.romaji)}</Typography>
                    </a>
                  </motion.div>
                ))}              
              </motion.div>
            </motion.div>

          </Box>
        </Grid>
      </ThemeProvider>

    </>
  )
}

export default Home