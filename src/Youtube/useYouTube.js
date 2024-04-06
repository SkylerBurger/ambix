import { useEffect, useRef, useState } from "react";


function useYouTube() {
  const playerRef = useRef(null);
  const intervalRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [playerVideoId, setPlayerVideoId] = useState('');
  const [rangeValue, setRangeValue] = useState(0.5);
  const [volumeLevel, setVolumeLevel] = useState(50);

  const createPlayer = () => {
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
      if (window.YT !== null) {
        clearInterval(intervalRef.current);
        createPlayer();
      }
    }
    intervalRef.current = setInterval(checkForAPI, 500);
  }, []);

  const pause = () => {
    playerRef.current.stopVideo();
    setIsPaused(true);
  }
  
  const resume = () => {
    playerRef.current.playVideo();
    setIsPaused(false);
  }

  const togglePlayback = () => {
    isPaused ? resume() : pause();
  }

  const changeTrack = (newVideoId) => {
    if (playerVideoId === newVideoId) {
      playerRef.current.stopVideo();
      setPlayerVideoId('');
      setIsTrackLoaded(false);
      setIsPaused(true);
    } else {
      playerRef.current.loadVideoById(newVideoId);
      playerRef.current.playVideo();
      setPlayerVideoId(newVideoId);
      setIsTrackLoaded(true);
      setIsPaused(false);
    }
  }

  const changePlayerVolume = (newVolumeLevel, newRangeValue) => {
    playerRef.current.setVolume(newVolumeLevel);
    setVolumeLevel(newVolumeLevel);
    setRangeValue(newRangeValue);
  }

  return {
    changePlayerVolume,
    changeTrack,
    isPaused,
    isTrackLoaded, 
    playerVideoId, 
    rangeValue,
    togglePlayback,
    volumeLevel,
  };
}

export default useYouTube;