import { useRef, useState } from "react";


function useYouTubePlaylist() {
  const playerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [volumeLevel, setVolumeLevel] = useState(50);

  const handleOnReady = (newPlaylistId) => {
    console.log(`*** attempting to fetch playlist ${newPlaylistId}`);
    const videoIdsArr = playerRef.current.getPlaylist(newPlaylistId);
    console.log(`*** Video IDs fetched: ${videoIdsArr}`);
    console.log(`*** Loading playlist into player`)
    playerRef.current.loadPlaylist(videoIdsArr);
    console.log(`*** starting video`)
    playerRef.current.playVideo();
  }

  const createPlayer = (playlistId) => {
    playerRef.current = new window.YT.Player(
      'youtube-playlist-player',
      {
        height: '0',
        width: '0',
        playerVars: {
          listType: 'playlist',
          list: playlistId,
        },
        events: {
          "onReady": () => handleOnReady(playlistId),
        },
      }
    );
    
    setIsTrackLoaded(true);
  }

  const pause = () => {
    playerRef.current.stopVideo();
    setIsPaused(true);
  };
  
  const resume = () => {
    playerRef.current.playVideo();
    setIsPaused(false);
  };

  const togglePlayback = () => {
    isPaused ? resume() : pause();
  };

  const changeTrack = (newPlaylistId) => {
    createPlayer(newPlaylistId);
  };

  const changePlayerVolume = (newVolumeLevel, newRangeValue) => {
    playerRef.current.setVolume(newVolumeLevel);
    setVolumeLevel(newVolumeLevel);
    setRangeValue(newRangeValue);
  };

  return {
    changePlayerVolume,
    changeTrack,
    isPaused,
    isTrackLoaded,
    rangeValue,
    togglePlayback,
    volumeLevel,
  };
}


export default useYouTubePlaylist;