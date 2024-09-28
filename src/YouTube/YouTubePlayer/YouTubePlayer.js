import { useEffect, useRef, useState } from "react";

export function useYouTubePlayer() {
  const playerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);

  const togglePlayback = () => {
    if (isPaused) {
      playVideo();
    } else {
      stopVideo();
    }
    setIsPaused(!isPaused);
  };

  const playVideo = () => {
    playerRef.current.playVideo();
    setIsPaused(false);
  };

  const pauseVideo = () => {
    playerRef.current.pauseVideo();
    setIsPaused(true);
  };

  const stopVideo = () => {
    playerRef.current.stopVideo();
    setIsPaused(true);
  };

  const changePlaylist = (playerId, playlistId) => {
    // playerRef.current.destroy();

    const container = document.getElementById(`${playerId}-container`);
    container.innerHTML = `<div id="${playerId}"></div>`;
    playerRef.current = new window.YT.Player(playerId, {
      playerVars: { listType: "playlist", list: playlistId },
      events: {
        onReady: () => {
          playerRef.current.playVideo();
          setIsPaused(false);
        },
      },
    });
  };

  const changeVideo = (newVideoId) => {
    playerRef.current.loadVideoById(newVideoId);
  };

  const changeVolume = (newVolumeLevel) => {
    playerRef.current.setVolume(newVolumeLevel);
  };

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
  };
}

export function YouTubePlayer({ playerRef, playerId, playlistId = null }) {
  const intervalRef = useRef(0);

  // Wait for YT API to load to window before creating player
  useEffect(() => {
    const checkForYTAPI = () => {
      if (window.YT !== null && !playerRef.current) {
        clearInterval(intervalRef.current);
        const options = playlistId
          ? {
              playerVars: { listType: "playlist", list: playlistId },
              events: { onReady: () => playerRef.current.playVideo() },
            }
          : {};
        playerRef.current = new window.YT.Player(playerId, options);
      }
    };
    intervalRef.current = setInterval(checkForYTAPI, 500);
  }, []);

  return (
    <div id={`${playerId}-container`} className="YouTubePlayer">
      <div id={playerId}></div>
    </div>
  );
}
