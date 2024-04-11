import { useEffect, useRef, useState } from "react";


const defaultTracklist = [
  {trackName: "cafe", trackVideoId: "gaGrHUekGrc"},
  {trackName: "campfire", trackVideoId: "QMJYlmX1sNU"},
  {trackName: "fireplace", trackVideoId: "K0pJRo0XU8s"},
  {trackName: "lab", trackVideoId: "eGeJF85SOdQ"},
  {trackName: "rain", trackVideoId: "LlKyGAGHc4c"},
  {trackName: "storm", trackVideoId: "EbMZh-nQFsU"},
  {trackName: "waves", trackVideoId: "ibZUd-6pDeY"},
]

const saveTracklist =(tracklist) => {
  localStorage.setItem('ambient-tracklist', JSON.stringify(tracklist));
};

function useYouTube() {
  const playerRef = useRef(null);
  const intervalRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [tracklist, setTracklist] = useState([]);
  const [currentButtonKey, setCurrentButtonKey] = useState(null);

  const createPlayer = () => {
    playerRef.current = new window.YT.Player(
      'youtube-ambience-player',
      {
        height: '0',
        width: '0',
      }
    );
  }

  useEffect(() => {
    if (localStorage.getItem('ambient-tracklist') !== null) {
      const tracklistString = localStorage.getItem('ambient-tracklist');
      setTracklist(JSON.parse(tracklistString));
    } else {
      saveTracklist(defaultTracklist)
      setTracklist(defaultTracklist);
    }

    const checkForAPI = () => {
      if (window.YT !== null) {
        clearInterval(intervalRef.current);
        createPlayer();
      }
    };

    intervalRef.current = setInterval(checkForAPI, 500);
  }, []);

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

  const changeTrack = (newButtonKey, newVideoId) => {
    if (currentButtonKey === newButtonKey) {
      playerRef.current.stopVideo();
      setCurrentButtonKey(null);
      setIsTrackLoaded(false);
      setIsPaused(true);
    } else {
      playerRef.current.loadVideoById(newVideoId);
      playerRef.current.playVideo();
      setCurrentButtonKey(newButtonKey);
      setIsTrackLoaded(true);
      setIsPaused(false);
    }
  };

  const changePlayerVolume = (newVolumeLevel, newRangeValue) => {
    playerRef.current.setVolume(newVolumeLevel);
    setVolumeLevel(newVolumeLevel);
    setRangeValue(newRangeValue);
  };
  
  const deleteTrack = () => {
    const newTracklist = tracklist.filter((track, index) => currentButtonKey !== index);
    playerRef.current.stopVideo();
    saveTracklist(newTracklist)
    setTracklist(newTracklist);
    setCurrentButtonKey(null);
    setIsPaused(true);
    setIsTrackLoaded(false);
  };

  return {
    changePlayerVolume,
    changeTrack,
    currentButtonKey,
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
  };
}

export default useYouTube;