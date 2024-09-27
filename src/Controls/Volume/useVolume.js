const useVolume = (changePlayerVolume, isTrackLoaded, rangeValue) => {
  const adjustForHumans = (newRangeValue) => {
    return parseInt((Math.pow(newRangeValue, 2) * 100).toFixed(0));
  };

  const rangeHandler = (event) => {
    if (!isTrackLoaded) return;

    console.log(`*** current range value ${rangeValue}`);

    const newRangeValue = parseFloat(event.target.value);
    console.log(`*** new range value ${newRangeValue}`);

    const newVolumeLevel = adjustForHumans(newRangeValue);
    console.log(`*** new volume level ${newVolumeLevel}`);

    changePlayerVolume(newVolumeLevel, newRangeValue);
  };

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
  };

  return { rangeHandler, volumeButtonHandler };
};

export default useVolume;
