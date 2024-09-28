import PlayButton from "../../Controls/PlayButton/PlayButton.js";
import Volume from "../../Controls/Volume/Volume.js";

import "./YouTubePlaylist.css";
import useYouTubePlaylist from "./useYouTubePlaylist.js";
import { YouTubePlayer } from "../YouTubePlayer/YouTubePlayer.js";

const YouTubePlaylist = () => {
  const {
    changePlayerVolume,
    handleChangePlaylist,
    isPaused,
    isTrackLoaded,
    rangeValue,
    togglePlayback,
    playerRef,
    playerId,
    playlistId,
  } = useYouTubePlaylist();

  return (
    <section className="youtube-player media-module">
      <h2>youtube playlist</h2>
      {playlistId && (
        <YouTubePlayer
          playerRef={playerRef}
          playerId={playerId}
          playlistId={playlistId}
        />
      )}
      <button
        onClick={() =>
          handleChangePlaylist("PLu6Ikpqc0gHVCcDaYQy0_W6WyvP_Kx3Wg")
        }
      >
        Test
      </button>
      <button
        onClick={() =>
          handleChangePlaylist("PLu6Ikpqc0gHU3v2BEIfz4hw3Zj-kuuKvw")
        }
      >
        Test 2
      </button>
      <div className="player-controls">
        <PlayButton
          isPaused={isPaused}
          togglePlayback={togglePlayback}
          isTrackLoaded={isTrackLoaded}
        />

        <Volume
          changePlayerVolume={changePlayerVolume}
          isTrackLoaded={isTrackLoaded}
          rangeValue={rangeValue}
        />
      </div>
    </section>
  );
};

export default YouTubePlaylist;
