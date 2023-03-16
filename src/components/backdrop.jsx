import { useEffect, useState } from 'react';
import { Grid, Typography, Box, Button, Container } from '@mui/material';
import { Info, PlayCircle } from '@mui/icons-material';
import axios from 'axios';
const parser = new DOMParser();

function AnimeWindow(props) {
    const [ episodeList, setEpisodeList ] = useState([]);
    const [ trailerUrl, setTrailerUrl ] = useState('');

    const getEpisodes = async () => {
        const url = `https://api.consumet.org/meta/anilist/info/${props.animeId}`;
        try {
            const { data } = await axios.get(url);
            console.log(data);
            setEpisodeList(data.episodes.slice(0, 7));
            setTrailerUrl(`https://www.youtube.com/watch?v=${data.trailer.id}`)
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
      }

    const getStream = async (episodeId) => {
    const streamUrl = `https://api.consumet.org/meta/anilist/watch/${episodeId}`;
    try {
        const { data } = await axios.get(streamUrl);
        console.log(data)
        setEpisodeUrl(data.sources[3].url)
        return data;
    } catch (err) {
        throw new Error(err.message);
    }}

    useEffect(() => {
        getEpisodes();
    }, [])

    return (
        <Grid className="BackdropGrid" justifyContent='center' sx={{ width: '700px', height: '95vh', bgcolor: '#0E0E0E', borderRadius: 2, boxShadow: 10, overflow: 'auto'}} >
            <Box src={props.image} sx={{width: "100%", height: '33%', borderRadius: 2, objectFit: 'cover'}} component="img"/>
            <Container>
                <Typography variant='h3' noWrap align='left' color='whitesmoke' sx={{mx: 2, my: 1}}> {props.title} 
                    <Typography sx={{ml: 0.5, mt: 0.5}}>({props.nativeTitle})</Typography>
                </Typography>
                <Box display='flex'>
                    <Button variant='contained' sx={{ml: 2, my: 1}}><PlayCircle sx={{mr: 0.5}}/>Watch Episode 1</Button>
                    <a style={{textDecoration: 'none'}} href={trailerUrl} target='_blank'>
                        <Button variant='outlined'  sx={{my: 1, ml: 1}}><Info sx={{mr: 0.5}}/>Watch trailer</Button>
                    </a>
                </Box>
                {/* <Typography variant='h8' mx={2} mt={1} display='block' fontFamily='Nunito'>{props.description}</Typography> */}
                {/* <h1>{parser.parseFromString(props.description, "text/html")}</h1> */}
                <div dangerouslySetInnerHTML={{__html: props.description}} style={{marginLeft: 18, fontFamily: 'Nunito'}}/>
                <Typography variant='h5' mx={2} mt={1}>Episodes</Typography>
                {/* <Box component="img" src="https://artworks.thetvdb.com/banners/v4/episode/9505860/screencap/63b5959c46948.jpg"/> */}
                    {episodeList.map(episode => {
                        return (
                            <Box display='flex' flexDirection='row' key={episode.id}>
                                <Box
                                display='flex'
                                flexDirection='column'
                                component="img"
                                src={episode.image}
                                height='15vw'
                                maxHeight={'100px'}
                                my={2}
                                ml={2}
                                borderRadius={1}
                                />
                                <Box>
                                    <Typography my={2} mx={2}>{episode.number}. {episode.title}</Typography>
                                    <Typography fontSize={14} my={-1} mx={2} fontFamily='Nunito'>{episode.description}</Typography>
                                </Box>
                            </Box>
                        )
                        })}
            </Container>
        </Grid>  
    )
}

export default AnimeWindow