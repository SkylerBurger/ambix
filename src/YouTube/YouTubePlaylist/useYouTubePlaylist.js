import { useState } from "react";

import { useYouTubePlayer } from "../YouTubePlayer/YouTubePlayer";

function useYouTubePlaylist() {
  const [playlistId, setPlaylistId] = useState(null);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const { changePlaylist, changeVolume, isPaused, togglePlayback, playerRef } =
    useYouTubePlayer();
  const playerId = "youtube-playlist-player";

  const handleChangePlaylist = (newPlaylistId) => {
    console.log(`Handle change playlist: ${newPlaylistId}`);
    setPlaylistId(newPlaylistId);
    changePlaylist(playerId, newPlaylistId);
    setIsTrackLoaded(true);
  };

  const changePlayerVolume = (newVolumeLevel, newRangeValue) => {
    changeVolume(newVolumeLevel);
    setVolumeLevel(newVolumeLevel);
    setRangeValue(newRangeValue);
  };

  return {
    changePlayerVolume,
    handleChangePlaylist,
    isPaused,
    isTrackLoaded,
    rangeValue,
    togglePlayback,
    volumeLevel,
    playerRef,
    playerId,
    playlistId,
  };
}

export default useYouTubePlaylist;
