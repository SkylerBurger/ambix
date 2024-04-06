import './Volume.css';

const Volume = ({ changePlayerVolume, isTrackLoaded, rangeValue, volumeLevel }) => {
  
  const adjustForHumans = (newRangeValue) => {
    return parseInt((Math.pow(newRangeValue, 2) * 100).toFixed(0));
  }

  const volumeButtonHandler = (increment) => {
    if (!isTrackLoaded) return;
    
    console.log(`*** current range value ${rangeValue}`);
    console.log(`*** Increment ${increment} Type ${typeof increment}`);
    let newRangeValue = rangeValue + increment;
    if (newRangeValue < 0 || newRangeValue > 100) {
      newRangeValue = newRangeValue > 100 ? 100 : 0;
    }
    console.log(`*** new range value ${newRangeValue}`);

    const newVolumeLevel = adjustForHumans(newRangeValue);
    console.log(`*** new volume level ${newVolumeLevel}`);
    changePlayerVolume(newVolumeLevel, newRangeValue);
  }

  const rangeHandler = (event) => {
    if (!isTrackLoaded) return;

    console.log(`*** current range value ${rangeValue}`);

    const newRangeValue = parseFloat(event.target.value);
    console.log(`*** new range value ${newRangeValue}`);

    const newVolumeLevel = adjustForHumans(newRangeValue);
    console.log(`*** new volume level ${newVolumeLevel}`);

    changePlayerVolume(newVolumeLevel, newRangeValue);
  }

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