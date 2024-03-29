import { Box, Typography, Card, CardMedia, Backdrop, Grid, Paper, Skeleton, Button, ClickAwayListener} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import './css/Home.css';
import axios from "axios";
import Navbar from './Navbar';
import { Info, PlayArrowRounded, Theaters} from '@mui/icons-material';
import AnimeWindow from '../components/backdrop'
import RecentlyUpdatedCarousel from '../components/RecentlyUpdated';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';


function Home() {
  const [ trending, setTrending ] = useState([]);
  const [ cover, setCover ] = useState([]);
  const [ animeWindowUrl, setAnimeWindowUrl ] = useState('');
  const [ animeTitle, setAnimeTitle ] = useState('');
  const [ nativeTitle, setNativeTitle ] = useState('');
  const [ animeDescription, setAnimeDescription ] = useState('');
  const [ animeId, setAnimeId ] = useState('');
  const [ isBackdropOpen, setIsBackdropOpen ] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 5000 }));


  const getTrending = async () => {
    const trendingUrl = "https://api.consumet.org/meta/anilist/trending";
    try {
      const { data } = await axios.get(trendingUrl, { params: {
        page: 1,
        perPage: 20
      } });
      setTrending(data.results.slice(0, 20))
      setCover(data.results.slice(0, 7))
      console.log(data)
      return data;
    } catch (err) {
      throw new Error(err.message);
    }};
    
    useEffect(() => {
      getTrending()
    }, [])

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
        <Carousel mx='auto'  loop plugins={[autoplay.current]} withIndicators height='25vw' draggable align='center' sx={{ position: 'relative'}}>
          {cover.map(anime => (
            <Carousel.Slide>
              <Box
              className="carousel-cover"
              component='img'
              src={anime.cover}
              sx={{objectFit: 'cover', height: '100%', width: '100%', borderRadius: 3, filter: 'brightness(50%) blur(5px)'}}
              />
              <Box width='35%' sx={{display: 'block', position: 'absolute', bottom: '60%', left: '10%'}}>
                <Typography className='cover-title' variant='h2' fontSize='3vw' fontFamily='Nunito' fontWeight='bold' sx={{display:'-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden'}} >{chooseTitle(anime.title.english, anime.title.romaji)}</Typography>
              </Box>
              <Box width='35%' sx={{display: 'block', position: 'absolute', top: '40%', left: '10%'}}>
                <Typography variant='h6' fontSize='1.1vw' fontFamily='Nunito' sx={{display:'-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden'}}>{anime.description}</Typography>
                <Button variant='contained' size='large' 
                onClick={() => {
                  setAnimeWindowUrl(anime.cover); 
                  setAnimeTitle(chooseTitle(anime.title.english, anime.title.romaji)); 
                  setNativeTitle(anime.title.native); 
                  setAnimeDescription(anime.description);
                  setAnimeId(anime.id); 
                  setIsBackdropOpen(true)
                }} style={{height: '2.7vw', width: '10vw', fontSize: '1.2vw', whiteSpace: 'nowrap'}} sx={{borderRadius: 2, mt: 2}}><PlayArrowRounded fontSize='large' sx={{ml:-1}}/> Play Now</Button>
                <Button variant='contained' color='secondary' size='large' style={{height: '2.7vw', width: '11vw', fontSize: '1.1vw', whiteSpace: 'nowrap'}} sx={{borderRadius: 2, mt: 2, ml: 2}}><Info  sx={{mr: 0.5}}/> View Details</Button>
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>

        {/* Trending Carousel */}
        <Box sx={{maxWidth: '95%', margin: 'auto'}}>
          <Typography variant='h3' fontSize='2rem' color='white' sx={{mt: 2}}>Trending</Typography>
          <Box sx={{ mt: 0.5, mb: 1, bgcolor: '#B2003F', height: 7, width: 135, borderRadius: 2}}/>
          
          <Carousel mx='auto'  draggable align='start' slideSize={1} slidesToScroll={3} dragFree >
            {trending.map(anime => (
              <Carousel.Slide key={anime.id}>
                <Box className='items' >
                  <Card sx={{mr: 2, mt: 1, mb: 5, cursor: 'pointer'}} onClick={() => {
                    setAnimeWindowUrl(anime.cover); 
                    setAnimeTitle(chooseTitle(anime.title.english, anime.title.romaji)); 
                    setNativeTitle(anime.title.native); 
                    setAnimeDescription(anime.description);
                    setAnimeId(anime.id); 
                    setIsBackdropOpen(true)
                  }}>
                    <div style={{position: 'relative'}}>
                        <CardMedia className='card-image' component='img' image={anime.image} sx={{ borderRadius: 2, boxShadow: 5,  height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer',}}/>
                        <Box className='card-box' position='absolute'  height='100%' width='100%' sx={{bottom: 0}}/>
                        <Paper sx={{display: 'flex', justifyContent: 'center' ,position: 'absolute', bottom: 70, right: 5, width: '3.5rem', height: '1.3rem', bgcolor: '#BD284D'}}>
                          <Theaters style={{fontSize: '1rem', marginTop: 1}}/>
                          {anime.totalEpisodes ? 
                          <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'> 
                            {anime.totalEpisodes} 
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
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>
          <RecentlyUpdatedCarousel isOpen={isBackdropOpen} setOpen={setIsBackdropOpen} animeWindowUrl={animeWindowUrl} setAnimeWindowUrl={setAnimeWindowUrl} animeTitle={animeTitle} setAnimeTitle={setAnimeTitle} nativeTitle={nativeTitle} setNativeTitle={setNativeTitle} animeDescription={animeDescription} setAnimeDescription={setAnimeDescription} animeId={animeId} setAnimeId={setAnimeId}/> 


          
        </Box>
        <Backdrop open={isBackdropOpen} style={{zIndex: 2}}>
          {isBackdropOpen && <ClickAwayListener onClickAway={() => setIsBackdropOpen(false)}>
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