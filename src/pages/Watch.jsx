import { useEffect, useState } from 'react';
import 'vidstack/define/media-player.js';
import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import { useLocation, useParams} from 'react-router-dom';
import axios from 'axios';

const corsProxy = "http://localhost:8080/"

function Watch() {
  const { id } = useParams();
  const [ episodeUrl, setEpisodeUrl ] = useState('');

  const getStream = async () => {
    const streamUrl = `https://api.consumet.org/meta/anilist/watch/${id}`;
    try {
        const { data } = await axios.get(streamUrl);
        console.log(data)
        console.log(data.sources[3].url)
        setEpisodeUrl(data.sources[3].url)
        return data;
    } catch (err) {
        throw new Error(err.message);
    }}

  useEffect(() => {
    getStream()
  }, [])

  return (
    <>
      <MediaPlayer controls autoplay src={`${corsProxy}${episodeUrl}`}> <MediaOutlet/> </MediaPlayer>
    </>

  )
}

export default Watch