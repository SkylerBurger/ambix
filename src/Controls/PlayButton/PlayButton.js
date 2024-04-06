const PlayButton = ({isPaused, togglePlayback, isTrackLoaded}) => {
  const getPlaybackClass = () => {
    const baseClass = 'fas';
    let playbackState;
    if (isTrackLoaded){
      playbackState  = isPaused ? ' fa-play' : ' fa-pause';
    } else {
      playbackState = ' fa-play dim';
    }
    return baseClass + playbackState;
  }

  return (
    <i className={getPlaybackClass()} onClick={togglePlayback}></i>

  )
}

export default PlayButton;