import { useEffect, useState } from "react";

import { useYouTubePlayer } from "../YouTubePlayer/YouTubePlayer";

const defaultTracklist = [
  { trackName: "cafe", trackVideoId: "gaGrHUekGrc" },
  { trackName: "campfire", trackVideoId: "QMJYlmX1sNU" },
  { trackName: "fireplace", trackVideoId: "K0pJRo0XU8s" },
  { trackName: "lab", trackVideoId: "eGeJF85SOdQ" },
  { trackName: "rain", trackVideoId: "LlKyGAGHc4c" },
  { trackName: "storm", trackVideoId: "EbMZh-nQFsU" },
  { trackName: "waves", trackVideoId: "ibZUd-6pDeY" },
];

const saveTracklist = (tracklist) => {
  localStorage.setItem("ambient-tracklist", JSON.stringify(tracklist));
};

function useYouTubeAmbience() {
  const [isPaused, setIsPaused] = useState(true);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [tracklist, setTracklist] = useState([]);
  const [currentButtonKey, setCurrentButtonKey] = useState(null);
  // const [showVideo, setShowVideo] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const { changeVideo, changeVolume, playVideo, stopVideo, playerRef } =
    useYouTubePlayer();
  const playerId = "youtube-ambience-player";

  useEffect(() => {
    if (localStorage.getItem("ambient-tracklist") !== null) {
      const tracklistString = localStorage.getItem("ambient-tracklist");
      setTracklist(JSON.parse(tracklistString));
    } else {
      saveTracklist(defaultTracklist);
      setTracklist(defaultTracklist);
    }
  }, []);

  // useEffect(() => {
  //   const playerElement = document.getElementById(playerId);
  //   if (currentTrack === null) {
  //     playerElement.classList.add("hidden-player");
  //     setShowVideo(false);
  //   } else {
  //     playerElement.classList.remove("hidden-player");
  //     setShowVideo(true);
  //   }
  // }, [currentTrack, setShowVideo]);

  // const toggleVideo = () => {
  //   const newShowState = !showVideo;
  //   const playerElement = document.getElementById(playerId);
  //   if (newShowState) {
  //     playerElement.classList.remove("hidden-player");
  //   } else {
  //     playerElement.classList.add("hidden-player");
  //   }
  //   setShowVideo(!showVideo);
  // };

  const togglePlayback = () => {
    if (isPaused) {
      playVideo();
    } else {
      stopVideo();
    }
    setIsPaused(!isPaused);
  };

  const changeTrack = (newButtonKey, newVideoId) => {
    if (currentButtonKey === newButtonKey) {
      stopVideo();
      setCurrentButtonKey(null);
      setIsTrackLoaded(false);
      setIsPaused(true);
    } else {
      changeVideo(newVideoId);
      playVideo();
      setCurrentTrack(newVideoId);
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
    playerRef.current.stopVideo();
    saveTracklist(newTracklist);
    setTracklist(newTracklist);
    setCurrentButtonKey(null);
    setIsPaused(true);
    setIsTrackLoaded(false);
  };

  return {
    changePlayerVolume,
    changeTrack,
    currentButtonKey,
    currentTrack,
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
    playerId,
  };
}

export default useYouTubeAmbience;
