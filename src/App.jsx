import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/main.scss";
import MusicPlayer from "./components/MusicPlayer";
import { MusicProvider } from "./context/MusicContext";

function App() {
  return (
    <MusicProvider>
      <MusicPlayer />
    </MusicProvider>
  );
}

export default App;
