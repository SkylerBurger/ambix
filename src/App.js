import YouTubeAmbience from "./YouTube/YouTubeAmbience/YouTubeAmbience";
import YouTubePlaylist from "./YouTube/YouTubePlaylist/YouTubePlaylist";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Ambix</h1>
      <div className="media-modules">
        <YouTubePlaylist />
        <YouTubeAmbience />
      </div>
    </div>
  );
}

export default App;
