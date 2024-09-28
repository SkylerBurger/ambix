import { useEffect, useState } from "react";

import "./PlayerCollapse.css";

function PlayerCollapse({ playerId, children, show }) {
  const [showPlayer, setShowPlayer] = useState(false);

  const toggleVideo = () => {
    const newShowState = !showPlayer;
    const playerElement = document.getElementById(`${playerId}-container`);
    if (newShowState) {
      playerElement.classList.remove("hidden-player");
    } else {
      playerElement.classList.add("hidden-player");
    }
    setShowPlayer(!showPlayer);
  };

  useEffect(() => {
    const playerElement = document.getElementById(`${playerId}-container`);
    if (!show) {
      playerElement.classList.add("hidden-player");
      setShowPlayer(false);
    } else {
      playerElement.classList.remove("hidden-player");
      setShowPlayer(true);
    }
  }, [show]);

  return (
    <div className="PlayerCollapse">
      {children}
      <i
        className={`eye-icon fas fa-reguar ${showPlayer ? "fa-eye" : "fa-eye-slash"}`}
        onClick={toggleVideo}
      />
    </div>
  );
}

export default PlayerCollapse;
