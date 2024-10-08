import YouTubeAmbience from "./YouTube/YouTubeAmbience/YouTubeAmbience";
import NewYTPlaylist from "./YouTube/NewYTPlaylist/NewYTPlaylist";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Ambix</h1>
      <div className="media-modules">
        <NewYTPlaylist />
        <YouTubeAmbience />
      </div>
    </div>
  );
}

export default App;
