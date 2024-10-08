import { useState } from "react";

import PlayButton from "../../Controls/PlayButton/PlayButton.js";
import Volume from "../../Controls/Volume/Volume.js";

import "./YouTubePlaylist.css";
import useYouTubePlaylist from "./useYouTubePlaylist.js";
import { YouTubePlayer } from "../YouTubePlayer/YouTubePlayer.js";
import PlayerCollapse from "../../PlayerCollapse/PlayerCollapse.js";

const AmbientTrack = ({
  buttonKey,
  name,
  trackVideoId,
  changeTrackFunc,
  selected,
}) => {
  const selectedClassName = "track" + (selected ? " selected" : "");
  return (
    <button
      onClick={() => changeTrackFunc(buttonKey, trackVideoId)}
      className={selectedClassName}
    >
      {name}
    </button>
  );
};

const AddTrackModal = ({
  isVisible,
  setIsVisible,
  tracklist,
  setTracklist,
}) => {
  const [formValues, setFormValues] = useState({});
  const modalClass = "add-track" + (isVisible ? "" : " hidden");

  const changeHandler = (event) => {
    const newFormValues = {
      ...formValues,
      [event.target.name]: event.target.value,
    };
    setFormValues(newFormValues);
  };

  const handleAddTrack = () => {
    const extractIdExp = /[a-zA-Z0-9-_]{34}/;
    const newVideoId = formValues.newTrackLink.match(extractIdExp)[0];

    const newTracklist = [
      ...tracklist,
      { trackName: formValues.newTrackName, trackVideoId: newVideoId },
    ];

    setTracklist(newTracklist);
    setIsVisible(false);
    setFormValues({ newTrackName: "", newTrackLink: "" });
    localStorage.setItem("playlist-collection", JSON.stringify(newTracklist));
  };

  return (
    <div className={modalClass}>
      <div className="new-track-info">
        <input
          type="text"
          name="newTrackName"
          placeholder="Track Name"
          value={formValues.newTrackName}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="newTrackLink"
          placeholder="YouTube Link"
          value={formValues.newTrackLink}
          onChange={changeHandler}
        />
      </div>
      <button onClick={handleAddTrack}>Add Track</button>
      <button onClick={() => setIsVisible(false)}>Cancel</button>
    </div>
  );
};

const YouTubeAmbience = () => {
  const {
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
    tracklist,
    setTracklist,
    playerRef,
    PLAYER_ID,
  } = useYouTubePlaylist();

  return (
    <section className="youtube-player media-module">
      <h2>youtube</h2>
      <PlayerCollapse playerId={PLAYER_ID} show={playlistId}>
        <YouTubePlayer
          className="hidden-player"
          playerRef={playerRef}
          playerId={PLAYER_ID}
        />
      </PlayerCollapse>

      <div className="ambience-tracks">
        {tracklist.map(({ trackName, trackVideoId }, i) => {
          return (
            <AmbientTrack
              buttonKey={i}
              name={trackName}
              trackVideoId={trackVideoId}
              changeTrackFunc={handleChangePlaylist}
              selected={i === currentButtonKey}
            />
          );
        })}
        <i
          className="fas fa-plus track-buttons"
          onClick={() => setIsAddModalVisible(!isAddModalVisible)}
        ></i>
        <i
          className={`fa fa-trash-o track-buttons ${currentButtonKey ? "" : "no-display"}`}
          onClick={deleteTrack}
        ></i>
        <AddTrackModal
          isVisible={isAddModalVisible}
          setIsVisible={setIsAddModalVisible}
          tracklist={tracklist}
          setTracklist={setTracklist}
        />
      </div>
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

export default YouTubeAmbience;
