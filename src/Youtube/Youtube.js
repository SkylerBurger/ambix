import useYouTube from './useYouTube.js';
import "./Youtube.css";

const AmbientTrack = () => {
  return (
    <button>track name</button>
  )
}

const YouTube = () => {
  const { playerRef, isPaused, setIsPaused } = useYouTube();

  const togglePlayback = () => {
    if (isPaused) {
      console.log('*** starting playback');
      playerRef.current.playVideo();
    } else {
      console.log('*** stopping playback');
      playerRef.current.stopVideo();
    }
    setIsPaused(!isPaused);
  }

  return (
    <div>
      <div id='player'></div>
      <button onClick={togglePlayback}>toggle</button>
      <AmbientTrack />
    </div>
  )
}

export default YouTube;