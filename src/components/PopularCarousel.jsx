import { Box, Typography, Card, Backdrop, Grid, Paper, Skeleton, ClickAwayListener} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import '../pages/css/Home.css';
import axios from "axios";
import { motion } from "framer-motion";
import AnimeWindow from '../components/backdrop'
import { Update } from '@mui/icons-material'

function PopularCarousel({ isOpen, setOpen, animeWindowUrl, setAnimeWindowUrl, animeTitle, setAnimeTitle, nativeTitle, setNativeTitle, animeDescription, setAnimeDescription, animeId, setAnimeId }) {

    const [ popular, setPopular ] = useState([]);
    const [ cover, setCover ] = useState([]);
    const [ width, setWidth ] = useState(0);
    // const [ animeWindowUrl, setAnimeWindowUrl ] = useState('');
    // const [ animeTitle, setAnimeTitle ] = useState('');
    // const [ nativeTitle, setNativeTitle ] = useState('');
    // const [ animeDescription, setAnimeDescription ] = useState('');
    // const [ animeId, setAnimeId ] = useState('');
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
    
    const getPopular = async () => {
      const popularUrl = "https://api.consumet.org/meta/anilist/recent-episodes";
      try {
        const { data } = await axios.get(popularUrl, { params: {
          page: 1,
          perPage: 20
        } });
        console.log(data)
        setPopular(data.results.slice(0, 20))
        return data;
      } catch (err) {
        throw new Error(err.message);
      }};

    useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [popular, window.innerWidth])
    
    useEffect(() => {
    getPopular()
    //window.addEventListener('resize', handleWindowResize)
    }, [])

    return (
        <>
            <Box display='flex'>
                <Update style={{fontSize: '40'}} sx={{mt: 0.5, mr: 1}}/>
                <Typography variant='h3' fontSize='2.5rem' color='white' >Recently Updated</Typography>
            </Box>
            <motion.div ref={carousel} className="carousel">
                <motion.div drag="x" onMouseMove={() => {setPointerEvent('none')}} onMouseUp={() => {setPointerEvent('auto')}} dragConstraints={{right: 0, left: -width}} className="inner-carousel">
                    {popular.map(anime => (
                    <motion.div className='items' key={anime.id}>
                        <a target='_blank' onClick={() => {
                            setLastScroll(window.scrollHeight); 
                            setAnimeWindowUrl(anime.cover); 
                            setAnimeTitle(anime.title.romaji); 
                            setNativeTitle(anime.title.native); 
                            setAnimeDescription(anime.description);
                            setAnimeId(anime.id); 
                            setOpen(true) 
                        }}>
                        <Box
                        className="anime-card"
                        component="img"
                        src={anime.image}
                        sx={{mx: 1, mt: 2, borderRadius: 2, boxShadow: 5, height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer'}}
                        style={{ pointerEvents: `${pointerEvent}` }}
                        />
                        <Typography align='center' sx={{overflow: 'hidden', ml: 1, mb: 5, color: 'grey'}}>{truncate(anime.title.romaji)}</Typography>
                        </a>
                    </motion.div>
                    ))}              
                </motion.div>
            </motion.div>
            
        </>
        )
}

export default PopularCarousel