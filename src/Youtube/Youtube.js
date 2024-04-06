import useYouTube from './useYouTube.js';
import Volume from '../Controls/Volume/Volume.js';
import "./Youtube.css";
import PlayButton from '../Controls/PlayButton/PlayButton.js';

const AmbientTrack = ({ name, trackVideoId, changeTrackFunc, selected }) => {
  return (
    <button 
      onClick={() => changeTrackFunc(trackVideoId)}
      className={ selected ? 'selected' : ''}>
        { name }
    </button>
  )
}

const YouTube = () => {
  const {
    changePlayerVolume,
    changeTrack,
    isPaused,
    isTrackLoaded,
    playerVideoId, 
    rangeValue,
    togglePlayback,
    volumeLevel, 
  } = useYouTube();

  const defaultTracks = [
    {trackName: "cafe", trackVideoId: "gaGrHUekGrc"},
    {trackName: "campfire", trackVideoId: "QMJYlmX1sNU"},
    {trackName: "fireplace", trackVideoId: "K0pJRo0XU8s"},
    {trackName: "lab", trackVideoId: "eGeJF85SOdQ"},
    {trackName: "rain", trackVideoId: "LlKyGAGHc4c"},
    {trackName: "storm", trackVideoId: "EbMZh-nQFsU"},
    {trackName: "waves", trackVideoId: "ibZUd-6pDeY"},
  ]

  return (
    <section className='youtube-player media-module'>
      <h2>youtube</h2>
      <div id='player'></div>
      <div className='ambience-tracks'>
        { defaultTracks.map(({trackName, trackVideoId}) => {
            return <AmbientTrack 
              name={ trackName } 
              trackVideoId={ trackVideoId} 
              changeTrackFunc={ changeTrack }
              selected={playerVideoId === trackVideoId}/>
          })
        }
      </div>
      <div className='player-controls'>
        <PlayButton
          isPaused={isPaused}
          togglePlayback={togglePlayback}
          isTrackLoaded={isTrackLoaded} />

        <Volume 
          changePlayerVolume={changePlayerVolume}
          isTrackLoaded={isTrackLoaded}
          rangeValue={rangeValue}
          volumeLevel={volumeLevel} />
      </div>
    </section>
  )
}

export default YouTube;