/* eslint-disable no-undef */
import React, { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import SongItem from "./SongItem";
const SongList = () => {
  const { songs } = useContext(MusicContext);

  return (
    <div className="song-list-container">
      {/* <h2 className="section-title">{title}</h2> */}

      {songs?.length === 0 ? (
        <div className="no-songs">
          <p>No songs found</p>
        </div>
      ) : (
        <div className="song-list">
          {songs?.map((song) => (
            <SongItem key={song?.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;
