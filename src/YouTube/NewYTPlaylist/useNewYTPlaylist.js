import { useEffect, useState } from "react";

import { useYouTubePlayer } from "../YouTubePlayer/YouTubePlayer";


function useYouTubeAmbience() {
  const [isPaused, setIsPaused] = useState(true);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [tracklist, setTracklist] = useState([]);
  const [currentButtonKey, setCurrentButtonKey] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const { changePlaylist, changeVolume, playVideo, pauseVideo, stopVideo, playerRef } =
  useYouTubePlayer();
  const PLAYER_ID = "youtube-playlist-player";
  const STORAGE_ID = "playlist-collection";
  const defaultPlaylists = [
    { trackName: "demo 1", trackVideoId: "PLu6Ikpqc0gHXOLgsJVFi3-qAqQO12iTFx" },
    { trackName: "demo 2", trackVideoId: "PLu6Ikpqc0gHXFVlqOCuCJM0ZubSuf30XN" },
  
  ];
  
  const saveTracklist = (playlistCollection) => {
    localStorage.setItem(STORAGE_ID, JSON.stringify(playlistCollection));
  };

  useEffect(() => {
    if (localStorage.getItem(STORAGE_ID) !== null) {
      const tracklistString = localStorage.getItem(STORAGE_ID);
      setTracklist(JSON.parse(tracklistString));
    } else {
      saveTracklist(defaultPlaylists);
      setTracklist(defaultPlaylists);
    }
  }, []);

  const togglePlayback = () => {
    if (isPaused) {
      playVideo();
    } else {
      pauseVideo();
    }
    setIsPaused(!isPaused);
  };

  const handleChangePlaylist = (newButtonKey, newPlaylistId) => {
    if (currentButtonKey === newButtonKey) {
      pauseVideo();
      setCurrentButtonKey(null);
      setIsTrackLoaded(false);
      setIsPaused(true);
    } else {
      setPlaylistId(newPlaylistId);
      changePlaylist(PLAYER_ID, newPlaylistId);
      setCurrentButtonKey(newButtonKey);
      setIsTrackLoaded(true);
      setIsPaused(false);
    }
  };

  const changePlayerVolume = (newVolumeLevel, newRangeValue) => {
    changeVolume(newVolumeLevel);
    setVolumeLevel(newVolumeLevel);
    setRangeValue(newRangeValue);
  };

  const deleteTrack = () => {
    const newTracklist = tracklist.filter(
      (track, index) => currentButtonKey !== index,
    );
    stopVideo();
    saveTracklist(newTracklist);
    setTracklist(newTracklist);
    setCurrentButtonKey(null);
    setIsPaused(true);
    setIsTrackLoaded(false);
  };

  return {
    changePlayerVolume,
    handleChangePlaylist,
    currentButtonKey,
    playlistId,
    deleteTrack,
    isAddModalVisible,
    setIsAddModalVisible,
    isPaused,
    isTrackLoaded,
    rangeValue,
    togglePlayback,
    volumeLevel,
    tracklist,
    setTracklist,
    playerRef,
    PLAYER_ID,
  };
}

export default useYouTubeAmbience;
