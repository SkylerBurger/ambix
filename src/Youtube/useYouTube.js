import { useEffect, useRef, useState } from "react";


function useYouTube() {
  const playerRef = useRef(null);
  const intervalRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);

  const createPlayer = () => {
    console.log('*** creating player')
    playerRef.current = new window.YT.Player(
      'player',
      {
        height: '100',
        width: '100',
        videoId: 'gaGrHUekGrc',
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

  return { playerRef, isPaused, setIsPaused };
}

export default useYouTube;