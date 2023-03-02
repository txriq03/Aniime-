import { Box } from '@mui/material';
import { useState } from 'react';
import './css/Home.css';
import axios from "axios";
import Navbar from './Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ANIME } from '@consumet/extensions';

//cors.haikei.xyz
// (function() {
//   var cors_api_host = 'cors.haikei.xyz';
//   var cors_api_url = 'https://' + cors_api_host + '/';
//   var slice = [].slice;
//   var origin = window.location.protocol + '//' + window.location.host;
//   var open = XMLHttpRequest.prototype.open;
//   XMLHttpRequest.prototype.open = function() {
//       var args = slice.call(arguments);
//       var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
//       if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
//           targetOrigin[1] !== cors_api_host) {
//           args[1] = cors_api_url + args[1];
//       }
//       return open.apply(this, args);
//   };
// })();

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
    fontFamily: 'Source Sans Pro',
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
  const url = "https://api.consumet.org/meta/anilist/info/116674";
  const getData = async () => {
      await axios.get(url, { params: { provider: "gogoanime" }}).then(
      (response) => {
        setData(response.data.cover)
      });
  };
  getData()

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        {data != '' ? <Box component='img' align='center' src={data} sx={{backgroundColor: '#0E0E0E', borderRadius: 2, my: 2, width: '100%'}}/> : ''}
      </ThemeProvider>

    </>
  )
}

export default Home