import './App.css';
import YouTube from './Youtube/Youtube';
import YouTubePlaylist from './YouTubePlaylist/YouTubePlaylist';

function App() {
  return (
    <div className="App">
      <h1>Ambix</h1>
      <div className='media-modules'>
        <YouTubePlaylist />
        <YouTube />
      </div>
    </div>
  );
}

export default App;
