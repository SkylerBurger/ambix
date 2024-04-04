import useYouTube from './useYouTube.js';
import "./Youtube.css";

const AmbientTrack = ({ name, trackVideoId, changeTrackFunc, selected }) => {
  console.log(`making track: ${trackVideoId}`);
  return (
    <button 
      onClick={() => changeTrackFunc(trackVideoId)}
      className={ selected ? 'selected' : ''}>
        { name }
    </button>
  )
}

const YouTube = () => {
  const { playerRef, isPaused, playerVideoId, setPlayerVideoId } = useYouTube();
  const defaultTracks = [
    {trackName: "rain", trackVideoId: "LlKyGAGHc4c"},
    {trackName: "cafe", trackVideoId: "gaGrHUekGrc"}
  ]

  const togglePlayback = () => {
    if (isPaused.current) {
      console.log('*** starting playback');
      playerRef.current.playVideo();
    } else {
      console.log('*** stopping playback');
      playerRef.current.stopVideo();
    }
    isPaused.current = !isPaused.current;
  }

  const changeTrack = (newVideoId) => {
    if (playerVideoId === newVideoId) {
      console.log('*** Same track selected, stopping player');
      playerRef.current.stopVideo();
      setPlayerVideoId('');
      isPaused.current = true;
    } else {
      console.log(`*** Changing track: ${newVideoId}`)
      playerRef.current.loadVideoById(newVideoId);
      setPlayerVideoId(newVideoId);
      playerRef.current.playVideo();
      isPaused.current = false;
    }
  }

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
        <button onClick={togglePlayback}>toggle</button>
      </div>
    </section>
  )
}

export default YouTube;