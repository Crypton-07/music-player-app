import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { MusicContext } from "../context/MusicContext";

const SongItem = ({ song }) => {
  const { currentSong, playSong } = useContext(MusicContext);

  const isActive = currentSong && currentSong.id === song.id;
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(Math.floor(time % 60)).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={`song-item ${isActive ? "active" : ""}`} onClick={() => playSong(song)}>
      <div className="song-thumbnail" >
        <img src={song.thumbnail} alt={song.title} />
        <div className="song-info">
          <h5 className="song-title">{song.title}</h5>
          <p className="song-artist">{song.artistName}</p>
        </div>
      </div>

      <div className="song-duration">{formatTime(song.duration)}</div>
    </div>
  );
};

export default SongItem;
