import './Volume.css';
import useVolume from './useVolume.js';


const Volume = ({ changePlayerVolume, isTrackLoaded, rangeValue }) => {
  
  const { rangeHandler, volumeButtonHandler } = useVolume(changePlayerVolume, isTrackLoaded, rangeValue);

  return (
    <div className="volume-controls">
      <i className={`fas fa-volume-down ${isTrackLoaded ? '' : 'dim'}`} 
        onClick={ () => volumeButtonHandler(-0.01) }></i>
      <input type="range" min="0" max="1" step="0.01" 
        className={`range ${isTrackLoaded ? '' : 'dim-range'}`} 
        value={ rangeValue } onChange={ rangeHandler }/>
      <i className={`fas fa-volume-up ${isTrackLoaded ? '': 'dim'}`}
        onClick={ () => volumeButtonHandler(0.01) }></i>
    </div>  
  )
}


export default Volume;