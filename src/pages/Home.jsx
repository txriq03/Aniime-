import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './css/Home.css';
import axios from "axios";
import Navbar from './Navbar'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { ANIME } from '@consumet/extensions';
import { Update } from '@mui/icons-material';

const styledBox = styled(Box, {})`
  width: min(var(1110px), 100% - var(1rem))
`

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

  const getData = async () => {
    const url = "https://api.consumet.org/meta/anilist/info/21";
    await axios.get(url, { params: { provider: "gogoanime" }}).then(
    (response) => {
      setData(response.data.cover)
    });
  };

  useEffect(() => {
    getData(),
    getTrending()
  }, [])

  
  const getTrending = async () => {
    const trendingUrl = "https://api.consumet.org/meta/anilist/trending";
    try {
      const { data } = await axios.get(trendingUrl, { params: {
        page: 1,
        perPage: 20
      } });
      setTrending(data.results.slice(0, 9))
      console.log(data)
      return data;
    } catch (err) {
      throw new Error(err.message);
    }};

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Box sx={{width: '90%', margin: 'auto'}}>
          {data != '' ? <Box component='img' align='center' src={data} sx={{backgroundColor: '#0E0E0E', borderRadius: 2, my: 2, width: '100%'}}/> : ''}
          <Typography variant='h3' fontSize='2.5rem' color='white' sx={{mt: 2}}><Update style={{fontSize: '40'}}/> Recently Updated</Typography>

          {trending.map(anime => (
            <a key={anime.id} target='_blank'>
              <Box
              className="anime-card"
              onClick={() => getInfo(anime.id)}
              component="img"
              src={anime.image}
              sx={{m: 1, mt: 2, borderRadius: 2, boxShadow: 5, height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer', '&:hover': { transform: 'scale(1.05)'}, transition: theme.transitions.create("transform")}}
              />
            </a>
          ))}


        </Box>
      </ThemeProvider>

    </>
  )
}

export default Home