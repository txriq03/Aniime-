import React from 'react'
import { Grid, Typography, Box, Button, Container } from '@mui/material'
import { Info, PlayCircle } from '@mui/icons-material';

function AnimeWindow(props) {
  return (
    <Grid justifyContent='center' sx={{ width: '700px', height: '95vh', bgcolor: '#0E0E0E', borderRadius: 2, boxShadow: 10, overflow: 'auto'}}>
        <Box src={props.image} sx={{width: "100%", height: '33%', borderRadius: 2, objectFit: 'cover'}} component="img"/>
        <Container>
            <Typography variant='h3' noWrap align='left' color='whitesmoke' sx={{mx: 2, my: 1}}> {props.title} 
                <Typography sx={{ml: 0.5, mt: 0.5}}>({props.nativeTitle})</Typography>
            </Typography>
            <Button variant='contained' sx={{ml: 2, my: 1}}><PlayCircle sx={{mr: 0.5}}/> Watch Episode 1</Button>
            <Button variant='outlined' sx={{my: 1, ml: 1}}><Info sx={{mr: 0.5}}/> More information</Button>
            <Typography variant='h5' mx={2} mt={1}>Episodes</Typography>
        </Container>
    </Grid>  
    )
}

export default AnimeWindow