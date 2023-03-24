import { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Box, Button, Container, Skeleton } from '@mui/material';
import { Info, PlayCircle } from '@mui/icons-material';
import { useNavigate, createSearchParams } from 'react-router-dom';
import axios from 'axios';

const parser = new DOMParser();


function AnimeWindow(props) {
    const navigate = useNavigate();
    const [ episodeList, setEpisodeList ] = useState([]);
    const [ trailerUrl, setTrailerUrl ] = useState('');
    const [ averageEpisode, setAverageEpisode ] = useState(0);
    const [ rating, setRating ] = useState(0);
    const [ ratingColor, setRatingColor ] = useState('');
    const [ genres, setGenres ] = useState([]);
    const [ episodeUrl, setEpisodeUrl ] = useState('');
    const [ firstEpisodeId, setFirstEpisodeId ] = useState('');
    const [ cover, setCover ] = useState('');
    const [ isLoading, setLoading ] = useState();
    const [ showMore, setShowMore ] = useState(false);
    const thumbnail = useRef();

    const getEpisodes = async () => {
        const url = `https://api.consumet.org/meta/anilist/info/${props.animeId}`;
        try {
            const { data } = await axios.get(url);
            console.log(data);
            
            setEpisodeList(data.episodes.slice(0, 10));
            
            try {
                setTrailerUrl(`https://www.youtube.com/watch?v=${data.trailer.id}`)
            } catch(err) {
                console.log(err)
            }

            setAverageEpisode(data.duration)
            setGenres(data.genres)
            setFirstEpisodeId(data.episodes[0].id)
            setCover(data.cover)
            setLoading(false)
            setRating(data.rating)
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
      }

    const changeRatingColor = () => {
        if (rating <= 40) {
            setRatingColor('red')
        } else if (rating >= 70) {
            setRatingColor('lightgreen')
        } else {
            setRatingColor('orange')
        }
    }

    useEffect(() => {
        setLoading(true),
        getEpisodes()
    }, [])
    useEffect(() => {
        changeRatingColor()
    }, [ rating ])

    return (
        <Grid className="BackdropGrid" justifyContent='center' sx={{ width: '800px', height: '98vh', bgcolor: '#0E0E0E', borderRadius: 2, boxShadow: 10, overflowY: 'auto', overflowX: 'hidden'}} >
            {cover ? <Box src={cover} sx={{width: "100%", height: '33%', borderRadius: 2, objectFit: 'cover'}} component="img"/> 
            : <Skeleton variant='rectangular' width='100%' height='33%'/>}
            <Container>
                <Typography variant='h3' noWrap align='left' color='whitesmoke' sx={{mx: 2, my: 1}}> {props.title} 
                    <Typography sx={{ml: 0.5, mt: 0.5}}>({props.nativeTitle})</Typography>
                </Typography>
                <Box display='flex'>
                    <Button variant='contained' size='large' sx={{ml: 2, my: 1}} onClick={() => {navigate({pathname: `/watch/${firstEpisodeId}`})
                    }}><PlayCircle sx={{mr: 0.5}}/>Watch Episode 1</Button>
                    <a style={{textDecoration: 'none'}} href={trailerUrl} target='_blank'>
                        <Button variant='outlined' size='large' sx={{my: 1, ml: 1}}><Info sx={{mr: 0.5}}/>Watch trailer</Button>
                    </a>
                </Box>
                <div dangerouslySetInnerHTML={{__html: props.description}} style={{
                    marginLeft: 18, 
                    marginTop: 5, 
                    fontFamily: 'Nunito',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: showMore ? 100 : 6,
                    overflow: 'hidden'}}/>
                {}
                <Button variant='text' style={{marginLeft: 18}} onClick={() => setShowMore(!showMore)}>Show {!showMore ? 'More': 'Less'}</Button>

                <Typography variant='h5' mx={2} mt={1}>Episodes</Typography>

                {episodeList ? 
                <Box>
                    {episodeList.map(episode => {
                        return (
                            <Box display='flex' flexDirection='row' key={episode.id} sx={{cursor: 'pointer'}} onClick={() => {navigate({pathname: `/watch/${episode.id}`})}}>
                                <Box
                                ref={thumbnail}
                                display='flex'
                                flexDirection='column'
                                component="img"
                                src={"http://localhost:8080/" + episode.image}
                                height='15vw'
                                maxHeight='100px'
                                my={2}
                                ml={2}
                                borderRadius={1}
                                /> 
                                <Box>
                                    <Typography my={2} mx={2} noWrap textOverflow='hidden'>{episode.number}. {episode.title}</Typography>
                                    <Typography fontSize={14} my={-1} mx={2} fontFamily='Nunito' style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden'}}>{episode.description}</Typography>
                                </Box>
                            </Box>
                        )
                    })}
                </Box> : <div>Loading...</div>}

                <Box align='center' bgcolor='#bd284d' my={2} height={2} width={750}/>
                <Typography variant='h4' fontFamily='Nunito' mx={2} mt={5}>About</Typography>
                <Box display='flex'>
                    <Typography fontFamily='Nunito' color='grey' mx={2} mt={1}>Genres: </Typography>
                    <Box display='flex' ml={-1} mt={1}>
                        {genres.map(entry => { return (<Typography fontFamily='Nunito' mr={1}>{entry},</Typography>)})}
                    </Box>
                </Box>
                <Box display ='flex'>
                    <Typography fontFamily='Nunito' color='grey' ml={2} >Average Episode: </Typography>
                    <Typography fontFamily='Nunito' color='whitesmoke' ml={0.5}>{averageEpisode}</Typography>
                </Box>
                <Box display= 'flex'>
                    <Typography fontFamily='Nunito' color='grey' ml={2} mb={3}>Rating: </Typography>
                    
                    <Typography fontFamily='Nunito' color={ratingColor} ml={0.5}>{rating}%</Typography>
                </Box>
            </Container>
        </Grid>  
    )
}

export default AnimeWindow