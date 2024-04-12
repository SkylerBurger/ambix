import PlayButton from '../../Controls/PlayButton/PlayButton.js';
import Volume from '../../Controls/Volume/Volume.js';

import "./YouTubePlaylist.css";
import useYouTube from './useYouTubePlaylist.js';


const YouTubePlaylist = () => {
  const {
    changePlayerVolume,
    changeTrack,
    isPaused,
    isTrackLoaded, 
    rangeValue,
    togglePlayback,
  } = useYouTube();

  return (
    <section className='youtube-player media-module'>
      <h2>youtube playlist</h2>
      <div id='youtube-playlist-player'></div>
      <button onClick={() => changeTrack('PLu6Ikpqc0gHVCcDaYQy0_W6WyvP_Kx3Wg')}>Test</button>
      <div className='player-controls'>
        <PlayButton
          isPaused={isPaused}
          togglePlayback={togglePlayback}
          isTrackLoaded={isTrackLoaded} />

        <Volume 
          changePlayerVolume={changePlayerVolume}
          isTrackLoaded={isTrackLoaded}
          rangeValue={rangeValue} />
      </div>
    </section>
  );
};


export default YouTubePlaylist;