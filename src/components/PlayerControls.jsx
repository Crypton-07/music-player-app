import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { Dropdown, ProgressBar } from "react-bootstrap";

const PlayerControls = () => {
  const {
    currentSong,
    isPlaying,
    playPause,
    playNextSong,
    playPrevSong,
    currentTime,
    duration,
    handleTimeUpdate,
    handleToggleFavorite,
    isFavorite,
  } = useContext(MusicContext);

  if (!currentSong)
    return <div className="player-controls-empty">No song selected</div>;
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const isFav = isFavorite(currentSong.id);

  return (
    <div className="player-controls">
      <div className="now-playing">
        <h4>{currentSong.title}</h4>
        <p>{currentSong.artistName}</p>
        <div className="now-playing-info">
          <img
            src={currentSong.thumbnail}
            alt={currentSong.title}
            className="now-playing-thumbnail"
          />
          <div className="progress-container">
            {/* <span className="time-current">{formatTime(currentTime)}</span> */}
            <ProgressBar
              now={Math.floor(progress)}
              className="song-progress"
              onClick={async (e) => {
                const progressBar = e.currentTarget;
                const clickPosition =
                  e.nativeEvent.offsetX / progressBar.offsetWidth;
                handleTimeUpdate(clickPosition * duration);
              }}
            />
            {/* <span className="time-total">{formatTime(duration)}</span> */}
          </div>
          <div className="player-main-controls">
            <div className="control-buttons">
              <div className="song-actions">
                <Dropdown>
                  <Dropdown
                    variant="link"
                    id={`dropdown-${currentSong.id}`}
                    className="no-arrow"
                  >
                    <i className="bi bi-three-dots"></i>
                  </Dropdown>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleToggleFavorite(currentSong)}
                    >
                      {isFav ? "Remove from favorites" : "Add to favorites"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <button className="control-btn" onClick={playPrevSong}>
                  <i className="bi bi-skip-start-fill"></i>
                </button>

                <button className="control-btn play-pause" onClick={playPause}>
                  <i
                    className={`bi ${
                      isPlaying ? "bi-pause-fill" : "bi-play-fill"
                    }`}
                  ></i>
                </button>

                <button className="control-btn" onClick={playNextSong}>
                  <i className="bi bi-skip-end-fill"></i>
                </button>
              </div>
              <div className="now-playing-actions">
                <button
                  className={`favorite-btn ${isFav ? "active" : ""}`}
                  onClick={() => handleToggleFavorite(currentSong)}
                >
                  <i
                    className={`bi ${isFav ? "bi-heart-fill" : "bi-heart"}`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
