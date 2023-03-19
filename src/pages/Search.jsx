import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Box, ClickAwayListener, Backdrop} from '@mui/material'
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../pages/Navbar';
import AnimeWindow from '../components/backdrop';

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


function Search() {
    const { query } = useParams();
    const [ results, setResults ] = useState([]);
    const [ isBackdropOpen, setIsBackdropOpen ] = useState(false);

    const [ animeCover, setAnimeCover ] = useState('');
    const [ animeTitle, setAnimeTitle ] = useState('');
    const [ nativeTitle, setNativeTitle ] = useState('');
    const [ animeDescription, setAnimeDescription ] = useState('');
    const [ animeId, setAnimeId ] = useState('');

    const getInfo= async (id) => {
        const url = `https://api.consumet.org/meta/anilist/info/${id}`;
        try {
            const { data } = await axios.get(url);
            console.log(data);
            setAnimeCover(data.cover)
            setAnimeTitle(data.title.romaji)
            setNativeTitle(data.title.native)
            setAnimeDescription(data.description)
            setAnimeId(id)
            setIsBackdropOpen(true)
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
      }

    const truncate = (str, maxLength = 30 ) => {
        if (str.length <= maxLength) return str;
        const truncated = str.substring(0, maxLength-3);
        return truncated + "..."
      }
    
    const data = async () => {
        if (query != '') {
          const url = `https://api.consumet.org/meta/anilist/${query}?page=1`;
          try {
              const { data } = await axios.get(url);
              setResults(data.results)
              console.log(data)
              return data;
          } catch (err) {
              throw new Error(err.message);
          }
        } else {
          alert("Search field cannot be empty")
        }
      };

    useEffect(() => {
        data()
    }, [query])

    return (
        <>
        <ThemeProvider theme={theme}>
            <Navbar/>
            <Typography variant='h3' align='center' color="primary" sx={{m: 2}}>Results</Typography>
                <Grid container align='center' justifyContent="center" direction='row' spacing='0'>
                {results.map(anime => (
                    <Box key={anime.id} onClick={() => getInfo(anime.id)}>
                        <Box
                        component="img"
                        src={anime.image}
                        sx={{m: 1, borderRadius: 2, boxShadow: 5, height: '460px', width: '290px', objectFit: 'cover', cursor: 'pointer', '&:hover': { transform: 'scale(1.05)'}, transition: theme.transitions.create("transform")}}
                        />
                        <Typography variant='h6'  sx={{pb: 2, px: 2}} >{truncate(anime.title.romaji)}</Typography>
                    </Box>
                ))}
                </Grid>
                <Backdrop open={isBackdropOpen}>
                    {isBackdropOpen && <ClickAwayListener onClickAway={() => {setIsBackdropOpen(false)}}>
                    <div>
                        <AnimeWindow 
                        image={animeCover} 
                        title={animeTitle} 
                        nativeTitle={nativeTitle} 
                        description={animeDescription}
                        animeId={animeId} /> 
                    </div>
                    </ClickAwayListener>}
                </Backdrop>
        </ThemeProvider>
        </>
    )
}

export default Search