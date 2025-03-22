import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { ProgressBar } from "react-bootstrap";

const PlayerControlsSmall = () => {
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
    return <div className="player-controls-emptysm">No song selected</div>;

  const progress = (currentTime / duration) * 100 || 0;
  const isFav = isFavorite(currentSong.id);

  return (
    <div className="player-controlssm">
      <div className="now-playingsm">
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
          className="now-playingsm-thumbnailsm"
        />
        <div className="now-playingsm-infosm">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artistName}</p>
        </div>
        <div className="now-playingsm-actionssm">
          <button
            className={`favorite-btnsm ${isFav ? "activesm" : ""}`}
            onClick={() => handleToggleFavorite(currentSong)}
          >
            <i className={`bi ${isFav ? "bi-heart-fill" : "bi-heart"}`}></i>
          </button>
        </div>
      </div>

      <div className="player-main-controlssm">
        <div className="control-buttonssm">
          <button className="control-btnsm" onClick={playPrevSong}>
            <i className="bi bi-skip-start-fill"></i>
          </button>

          <button className="control-btnsm play-pausesm" onClick={playPause}>
            <i
              className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}
            ></i>
          </button>

          <button className="control-btnsm" onClick={playNextSong}>
            <i className="bi bi-skip-end-fill"></i>
          </button>
        </div>

        <div className="progress-containersm">
          {/* <span className="time-current">{formatTime(currentTime)}</span> */}
          <ProgressBar
            now={progress}
            className="song-progresssm"
            onClick={(e) => {
              const progressBar = e.currentTarget;
              const clickPosition =
                e.nativeEvent.offsetX / progressBar.offsetWidth;
              handleTimeUpdate(clickPosition * duration);
            }}
          />
          {/* <span className="time-total">{formatTime(duration)}</span> */}
        </div>
      </div>
    </div>
  );
};

export default PlayerControlsSmall;
