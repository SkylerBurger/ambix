import { useEffect, useRef, useState } from 'react';

export function useYouTubePlayer() {
  const playerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);

  const togglePlayback = () => {
    if(isPaused) {
      playVideo();     
    } else {
      pauseVideo();
    };
    setIsPaused(!isPaused);
  }

  const playVideo = () => {
    playerRef.current.playVideo();
  }

  const pauseVideo = () => {
    playerRef.current.pauseVideo();
  }

  const stopVideo = () => {
    playerRef.current.stopVideo();
  }

  const changePlaylist = (playlistId) => {
    const videoIds = playerRef.current.getPlaylist(playlistId);
    playerRef.current.loadPlaylist(videoIds);
  }

  const changeVideo = (newVideoId) => {
    playerRef.current.loadVideoById(newVideoId);
  }

  const changeVolume = (newVolumeLevel) => {
    playerRef.current.setVolume(newVolumeLevel);
  }

  return {
    changePlaylist,
    changeVideo,
    changeVolume,
    isPaused,
    pauseVideo,
    playVideo,
    stopVideo,
    togglePlayback,
    playerRef,
  }
}

export function YouTubePlayer({ playerRef, playerId }) {
  const intervalRef = useRef(0);

  // Wait for YT API to load to window before creating player
  useEffect(() => {
    const checkForYTAPI = () => {
      if (window.YT !== null) {
        clearInterval(intervalRef.current);
        playerRef.current = new window.YT.Player(playerId);
      }
    };
    intervalRef.current = setInterval(checkForYTAPI, 500);
  }, []);

  return (
    <div id={playerId} className="YouTubePlayer"></div>
  )
}
