import { Box, Typography, Card, CardMedia, CardHeader, Backdrop, Grid, Paper, Skeleton, ClickAwayListener} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import './css/Home.css';
import axios from "axios";
import Navbar from './Navbar'
import { ANIME } from '@consumet/extensions';
import { Theaters } from '@mui/icons-material';
// import Carousel from 'react-material-ui-carousel';
import { motion } from "framer-motion";
import AnimeWindow from '../components/backdrop'
import PopularCarousel from '../components/RecentlyUpdated';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';


function Home() {
  const [ trending, setTrending ] = useState([]);
  const [ cover, setCover ] = useState([]);
  const [ width, setWidth ] = useState(0);
  const [ animeWindowUrl, setAnimeWindowUrl ] = useState('');
  const [ animeTitle, setAnimeTitle ] = useState('');
  const [ nativeTitle, setNativeTitle ] = useState('');
  const [ animeDescription, setAnimeDescription ] = useState('');
  const [ animeId, setAnimeId ] = useState('');
  const [ isBackdropOpen, setIsBackdropOpen ] = useState(false);
  const [ pointerEvent, setPointerEvent ] = useState('auto');
  const [ lastScroll, setLastScroll ] = useState(0);
  const carousel = useRef();
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const handleWindowResize = () => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    console.log(carousel.current.scrollWidth - carousel.current.offsetWidth)
  }
  
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

    useEffect(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [trending, window.innerWidth])
    
    useEffect(() => {
      getTrending()
      //window.addEventListener('resize', handleWindowResize)
    }, [])

  //Shorten anime titles
  const truncate = (str, maxLength = 30 ) => {
    if (str.length <= maxLength) return str;
    const truncated = str.substring(0, maxLength-3);
    return truncated + "..."
  }

  //Choose Romaji title if English title doesn't exist
  const chooseTitle= (english, romaji) => {
    if (english != null) {
      return english
    } else {
      return romaji
    }
  }

  //Decides color of rating metadata
  const changeRatingColor = (rating) => {
    if (rating < 40) {
        return 'red'
    } else if (rating >= 70) {
      return 'lightgreen'
    } else {
        return 'orange'
    }
  }

  return (
    <>
      <Navbar/>
      {/* Banner carousel */}
      <Grid justifyContent='center' >
        <Carousel mx='auto' maw='88vw' loop plugins={[autoplay.current]} withIndicators height='25vw' draggable align='center' style={{ position: 'relative' }}>
          {cover.map(anime=> (
            <Carousel.Slide>
              <Box
              className="carousel-cover"
              component='img'
              src={anime.cover}
              sx={{objectFit: 'cover', height: '100%', width: '100%', borderRadius: 3}}
              />
              <Box width='30%' sx={{display: 'block', position: 'absolute', top: '15%', left: '10%'}}>
                {/* <Typography className='cover-title' variant='h3' fontFamily='Nunito' fontWeight='bold' >{chooseTitle(anime.title.english, anime.title.romaji)}</Typography>
                <Typography variant='h6' fontFamily='Nunito' >{anime.description}</Typography> */}
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>

        {/* Trending Carousel */}
        <Box sx={{maxWidth: '90%', margin: 'auto'}}>
          <Typography variant='h3' fontSize='2.5rem' color='white' sx={{mt: 2, ml:1}}>Trending</Typography>
          <Box sx={{ml: 1, mt: 0.5, mb: 1, bgcolor: '#B2003F', height: 7, width: 180, borderRadius: 2}}/>
          <motion.div ref={carousel} className="carousel">
            <motion.div drag="x" onMouseMove={() => {setPointerEvent('none')}} onMouseUp={() => {setPointerEvent('auto')}} dragConstraints={{right: 0, left: -width}} className="inner-carousel">
              {trending.map(anime => (
                <motion.div className='items' key={anime.id}>
                  <Card sx={{mx: 1, mt: 1, mb: 5}} onClick={() => {
                    setLastScroll(window.scrollHeight); 
                    setAnimeWindowUrl(anime.cover); 
                    setAnimeTitle(chooseTitle(anime.title.english, anime.title.romaji)); 
                    setNativeTitle(anime.title.native); 
                    setAnimeDescription(anime.description);
                    setAnimeId(anime.id); 
                    setIsBackdropOpen(true)
                  }}>
                    <div style={{position: 'relative'}}>
                        <CardMedia className='card-image' component='img' image={anime.image} sx={{ borderRadius: 2, boxShadow: 5, height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer',}}/>
                        <Box className='card-box' position='absolute'  height='100%' width='100%' sx={{bottom: 0}}/>
                        <Paper sx={{position: 'absolute', bottom: 70, right: 5, width: '3.5rem', height: '1.3rem', bgcolor: '#BD284D'}}>
                          {anime.totalEpisodes ? 
                          <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'> 
                            {/* <Theaters style={{fontSize: '0.8rem'}}/>*/} Ep {anime.totalEpisodes} 
                          </Typography> :
                          <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'>
                            ???
                          </Typography>}
                        </Paper>
                        <Box sx={{ position: 'absolute',  zIndex: 2, width: '90%', mx: 1, top: '80%', textOverflow: 'ellipsis'}}>
                          <Typography fontFamily='Nunito' style={{
                            display: '-webkit-box', 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden',
                            lineHeight: 1.1,   
                            WebkitLineClamp: 2}}>{chooseTitle(anime.title.english, anime.title.romaji)}
                          </Typography>
                        </Box>
                        <Paper sx={{bgcolor: '#0E0E0E', position: 'absolute', bottom: 70, left: 5, width: '3rem', height: '1.3rem'}}>
                            <Typography color='#BD284D' fontSize='0.8rem' align='center' >{anime.releaseDate}</Typography>
                        </Paper>       


                        <Box display='flex' mx={1} sx={{position: 'absolute', bottom: 5}}>
                          <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.type}</Typography>
                          <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                          <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.genres[0]}</Typography>
                          <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                          <Typography noWrap color={changeRatingColor(anime.rating)} fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.rating}%</Typography>
                        </Box>
                    </div>

                  </Card>
                </motion.div>
              ))}              
            </motion.div>
          </motion.div>
          <PopularCarousel isOpen={isBackdropOpen} setOpen={setIsBackdropOpen} animeWindowUrl={animeWindowUrl} setAnimeWindowUrl={setAnimeWindowUrl} animeTitle={animeTitle} setAnimeTitle={setAnimeTitle} nativeTitle={nativeTitle} setNativeTitle={setNativeTitle} animeDescription={animeDescription} setAnimeDescription={setAnimeDescription} animeId={animeId} setAnimeId={setAnimeId}/>

        </Box>
        <Backdrop open={isBackdropOpen} style={{zIndex: 2}}>
          {isBackdropOpen && <ClickAwayListener onClickAway={() => {setIsBackdropOpen(false); window.scrollBy(0, lastScroll)}}>
            <div>
              <AnimeWindow 
              image={animeWindowUrl} 
              title={animeTitle} 
              nativeTitle={nativeTitle} 
              description={animeDescription}
              animeId={animeId} /> 
            </div>
          </ClickAwayListener>}
        </Backdrop>
      </Grid>
    </>
  )
}

export default Home