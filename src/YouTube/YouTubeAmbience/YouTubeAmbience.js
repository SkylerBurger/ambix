import { useState } from "react";

import PlayButton from "../../Controls/PlayButton/PlayButton.js";
import Volume from "../../Controls/Volume/Volume.js";

import "./YouTubeAmbience.css";
import useYouTubeAmbience from "./useYouTubeAmbience.js";
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
    const extractIdExp = /[a-zA-Z0-9-_]{11}/;
    const newVideoId = formValues.newTrackLink.match(extractIdExp)[0];

    const newTracklist = [
      ...tracklist,
      { trackName: formValues.newTrackName, trackVideoId: newVideoId },
    ];

    setTracklist(newTracklist);
    setIsVisible(false);
    setFormValues({ newTrackName: "", newTrackLink: "" });
    localStorage.setItem("ambient-tracklist", JSON.stringify(newTracklist));
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
    tracklist,
    setTracklist,
    playerRef,
    playerId,
  } = useYouTubeAmbience();

  return (
    <section className="youtube-player media-module">
      <h2>youtube</h2>
      <PlayerCollapse playerId={playerId} show={currentTrack}>
        <YouTubePlayer
          className="hidden-player"
          playerRef={playerRef}
          playerId={playerId}
        />
      </PlayerCollapse>

      <div className="ambience-tracks">
        {tracklist.map(({ trackName, trackVideoId }, i) => {
          return (
            <AmbientTrack
              buttonKey={i}
              name={trackName}
              trackVideoId={trackVideoId}
              changeTrackFunc={changeTrack}
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
