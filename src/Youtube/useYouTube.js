import { useEffect, useRef, useState } from "react";


function useYouTube() {
  const playerRef = useRef(null);
  const intervalRef = useRef(0);
  const isPaused = useRef(true);
  const [playerVideoId, setPlayerVideoId] = useState('');

  const createPlayer = () => {
    console.log('*** creating player')
    playerRef.current = new window.YT.Player(
      'player',
      {
        height: '0',
        width: '0',
      }
    );
  }

  useEffect(() => {
    const checkForAPI = () => {
      console.log('*** checking for api');
      if (window.YT !== null) {
        console.log(`*** clearing check interval ID ${intervalRef.current}`)
        clearInterval(intervalRef.current);
        createPlayer();
      }
    }
    console.log('*** setting check interval');
    intervalRef.current = setInterval(checkForAPI, 1000);
  }, []);

  return { playerRef, isPaused, playerVideoId, setPlayerVideoId };
}

export default useYouTube;