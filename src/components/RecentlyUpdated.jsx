import { Box, Typography, Card, CardMedia, Paper } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import '../pages/css/Home.css';
import axios from "axios";
import { motion } from "framer-motion";
import { Update } from '@mui/icons-material'
import { Carousel } from '@mantine/carousel';



function RecentlyUpdatedCarousel({ isOpen, setOpen, animeWindowUrl, setAnimeWindowUrl, animeTitle, setAnimeTitle, nativeTitle, setNativeTitle, animeDescription, setAnimeDescription, animeId, setAnimeId }) {

    const [ recentlyUpdated, setRecentlyUpdated ] = useState([]);
    const [ cover, setCover ] = useState([]);
    const [ width, setWidth ] = useState(0);
    const [ pointerEvent, setPointerEvent ] = useState('auto');
    const [ lastScroll, setLastScroll ] = useState(0);
    const carousel = useRef();
  
    const handleWindowResize = () => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
      console.log(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
    
    const truncate = (str, maxLength = 30 ) => {
        if (str.length <= maxLength) return str;
        const truncated = str.substring(0, maxLength-3);
        return truncated + "..."
    }
    
    const getRecentlyUpdated = async () => {
      const recentUrl = "https://api.consumet.org/meta/anilist/recent-episodes";
      try {
        const { data } = await axios.get(recentUrl, { params: {
          page: 1,
          perPage: 20
        } });
        console.warn(data)
        setRecentlyUpdated(data.results.slice(0, 20))
        return data;
      } catch (err) {
        throw new Error(err.message);
      }};

    const chooseTitle= (english, romaji) => {
      if (english != null) {
        return english
      } else {
        return romaji
      }
    }
  
    const changeRatingColor = (rating) => {
      if (rating < 40) {
          return 'red'
      } else if (rating >= 70) {
        return 'lightgreen'
      } else {
          return 'orange'
      }
    }
    
    useEffect(() => {
    getRecentlyUpdated()
    }, [])

    return (
        <>
          <Typography variant='h3' fontSize='2rem' color='white' >Recently Updated</Typography>
          <Box sx={{ mt: 0.5, mb: 1, bgcolor: '#B2003F', height: 7, width: 250, borderRadius: 2}}/>
          <Carousel mx='auto' draggable align='start' slideSize={1} slidesToScroll={3} dragFree >
            {recentlyUpdated.map(anime => (
              <Carousel.Slide key={anime.id}>
                <Box className='items' >
                  <Card sx={{mr: 2, mt: 1, mb: 5, cursor: 'pointer'}} onClick={() => {
                    setLastScroll(window.scrollHeight); 
                    setAnimeWindowUrl(anime.cover); 
                    setAnimeTitle(chooseTitle(anime.title.english, anime.title.romaji)); 
                    setNativeTitle(anime.title.native); 
                    setAnimeDescription(anime.description);
                    setAnimeId(anime.id); 
                    setOpen(true)
                  }}>
                    <div style={{position: 'relative'}}>
                      <CardMedia className='card-image' component='img' image={anime.image} sx={{ borderRadius: 2, boxShadow: 5, height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer',}}/>
                      <Box className='card-box' position='absolute'  height='100%' width='100%' sx={{bottom: 0}}/>
                      <Paper sx={{display: 'flex', justifyContent: 'center' ,position: 'absolute', bottom: 70, right: 5, width: '3.5rem', height: '1.3rem', bgcolor: '#BD284D'}}>
                        {anime.episodeNumber ? 
                        <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'> 
                          Ep {anime.episodeNumber} 
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
                      <Paper sx={{bgcolor: 'whitesmoke', position: 'absolute', bottom: 70, left: 5, width: '3rem', height: '1.3rem'}}>
                          <Typography color='#BD284D' fontSize='0.8rem' align='center' >NEW</Typography>
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

            {/* <Typography variant='h3' fontSize='2.5rem' color='white' >Recently Updated</Typography>
            <Box sx={{ mt: 0.5, mb: 1, bgcolor: '#B2003F', height: 7, width: 320, borderRadius: 2}}/>
            <motion.div ref={carousel} className="carousel">
                <motion.div drag="x" onMouseMove={() => {setPointerEvent('none')}} onMouseUp={() => {setPointerEvent('auto')}} dragConstraints={{right: 0, left: -width}} className="inner-carousel">
                    {popular.map(anime => (
                    <motion.div className='items' key={anime.id}>
                      <Card sx={{mr: 2, mt: 1, mb: 5}} onClick={() => {
                        setLastScroll(window.scrollHeight); 
                        setAnimeWindowUrl(anime.cover); 
                        setAnimeTitle(chooseTitle(anime.title.english, anime.title.romaji)); 
                        setNativeTitle(anime.title.native); 
                        setAnimeDescription(anime.description);
                        setAnimeId(anime.id); 
                        setOpen(true)
                      }}>
                    <Box style={{position: 'relative'}}>
                      
                      <CardMedia className='card-image' component='img' image={anime.image} sx={{ borderRadius: 2, boxShadow: 5, height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer',}}/>
                      <Box className='card-box' position='absolute'  height='100%' width='100%' sx={{bottom: 0}}/>
                      <Paper sx={{position: 'absolute', bottom: 70, right: 5, width: '3.5rem', height: '1.3rem', bgcolor: '#BD284D'}}>
                        {anime.episodeNumber ? 
                        <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'> 
                        Ep {anime.episodeNumber} 
                        </Typography> :
                        <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'>
                          ???
                        </Typography>}
                      </Paper>
                      <Box sx={{ position: 'absolute',  zIndex: 2, width: '90%', mx: 1, height: '15%', top: '80%', textOverflow: 'elipsis', overflow: 'hidden'}}>
                        <Typography  style={{lineHeight: 1, textOverflow: 'ellipsis', left: '5%', zIndex: 1, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}  fontFamily='Nunito'>{chooseTitle(anime.title.english, anime.title.romaji)}</Typography>
                      </Box>
                      <Paper sx={{bgcolor: 'whitesmoke', position: 'absolute', bottom: 70, left: 5, width: '3rem', height: '1.3rem'}}>
                          <Typography color='#BD284D' fontSize='0.8rem' align='center' sx={{fontWeight: 10000}}>NEW</Typography>
                      </Paper>       


                      <Box display='flex' mx={1} sx={{position: 'absolute', bottom: 5}}>
                      <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.type}</Typography>
                      <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                      <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.genres[0]}</Typography>
                      <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                      <Typography noWrap color={changeRatingColor(anime.rating)} fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.rating}%</Typography>
                      </Box>
                    </Box>

                  </Card>
                    </motion.div>
                    ))}              
                </motion.div>
            </motion.div> */}
            
        </>
        )
}

export default RecentlyUpdatedCarousel