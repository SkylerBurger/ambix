import { useEffect, useRef, useState } from "react";


function useYouTubePlaylist() {
  const playerRef = useRef(null);
  const intervalRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [currentButtonKey, setCurrentButtonKey] = useState(null);

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

  // useEffect(() => {
  //   const checkForAPI = () => {
  //     if (window.YT !== null) {
  //       clearInterval(intervalRef.current);
  //       createPlayer();
  //     }
  //   };

  //   intervalRef.current = setInterval(checkForAPI, 500);
  // }, []);

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

  const changeTrack = (newButtonKey, newPlaylistId) => {
    createPlayer(newPlaylistId);
    
    // if (currentButtonKey === newButtonKey) {
    //   playerRef.current.stopVideo();
    //   setCurrentButtonKey(null);
    //   setIsTrackLoaded(false);
    //   setIsPaused(true);
    // } else {
    //   console.log(`*** tried to start playlist: ${newPlaylistId}`);
    //   const videoIdsArr = await playerRef.current.getPlaylist(newPlaylistId);
    //   console.log(`*** Ids grabbed ${videoIdsArr}`);
    //   playerRef.current.loadPlaylist(videoIdsArr);
    //   playerRef.current.playVideo();
    //   setCurrentButtonKey(newButtonKey);
    //   setIsTrackLoaded(true);
    //   setIsPaused(false);
    // }
  };

  const changePlayerVolume = (newVolumeLevel, newRangeValue) => {
    playerRef.current.setVolume(newVolumeLevel);
    setVolumeLevel(newVolumeLevel);
    setRangeValue(newRangeValue);
  };
  
  // const deleteTrack = () => {
  //   const newTracklist = tracklist.filter((track, index) => currentButtonKey !== index);
  //   playerRef.current.stopVideo();
  //   saveTracklist(newTracklist)
  //   setTracklist(newTracklist);
  //   setCurrentButtonKey(null);
  //   setIsPaused(true);
  //   setIsTrackLoaded(false);
  // };

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