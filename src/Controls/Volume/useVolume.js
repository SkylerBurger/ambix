const useVolume = (changePlayerVolume, isTrackLoaded, rangeValue) => {
  const adjustForHumans = (newRangeValue) => {
    return parseInt((Math.pow(newRangeValue, 2) * 100).toFixed(0));
  };

  const rangeHandler = (event) => {
    if (!isTrackLoaded) return;
    const newRangeValue = parseFloat(event.target.value);
    const newVolumeLevel = adjustForHumans(newRangeValue);
    changePlayerVolume(newVolumeLevel, newRangeValue);
  };

  const volumeButtonHandler = (increment) => {
    if (!isTrackLoaded) return;
    let newRangeValue = rangeValue + increment;
    if (newRangeValue < 0 || newRangeValue > 100) {
      newRangeValue = newRangeValue > 100 ? 100 : 0;
    }
    const newVolumeLevel = adjustForHumans(newRangeValue);
    changePlayerVolume(newVolumeLevel, newRangeValue);
  };

  return { rangeHandler, volumeButtonHandler };
};

export default useVolume;
