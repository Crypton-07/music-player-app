/* eslint-disable no-unused-vars */
import React, { createContext, useState, useRef, useEffect } from "react";
import { songsData } from "../data/songs";
import {
  saveToRecentlyPlayed,
  getRecentlyPlayed,
  getFavorites,
  toggleFavorite,
  isFavorite,
} from "../utils/storageUtils";
import { extractDominantColor } from "../utils/colorExtractor";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dominantColors, setDominantColors] = useState({
    primary: "#555555",
    secondary: "#333333",
  });
  const [showSidebar, setShowSidebar] = useState(false);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    setRecentlyPlayed(getRecentlyPlayed());
    setFavorites(getFavorites());

    if (songs.length > 0 && !currentSong) {
      setCurrentSong(songs[0]);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (currentSong) {
      extractDominantColor(currentSong.thumbnail).then((colors) =>
        setDominantColors(colors)
      );
    }
  }, [currentSong]);

  // Handle audio events
  useEffect(() => {
    if (!currentSong) return;

    const audio = audioRef.current;

    // Set the source and load the audio
    audio.src = currentSong.musicUrl;
    audio.load();

    // Auto play if isPlaying is true
    if (isPlaying) {
      audio.play().catch((error) => console.error("Playback error:", error));
    }

    // Add to recently played
    saveToRecentlyPlayed(currentSong);
    setRecentlyPlayed(getRecentlyPlayed());

    // Set up event listeners
    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      // Play next song when current one ends
      playNextSong();
    };

    // Attach event listeners
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", onEnded);

    // Clean up event listeners
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentSong]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback error:", error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    if (!currentSong) return;

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevSong = () => {
    if (!currentSong) return;

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTimeUpdate = (newTime) => {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleToggleFavorite = (song) => {
    const isFav = toggleFavorite(song);
    setFavorites(getFavorites());
    return isFav;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredSongs = () => {
    let songsToShow = [];

    switch (activeTab) {
      case "favorites":
        songsToShow = favorites;
        break;
      case "recent":
        songsToShow = recentlyPlayed;
        break;
      default:
        songsToShow = songs;
    }

    if (searchTerm.trim() !== "") {
      return songsToShow.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return songsToShow;
  };

  return (
    <MusicContext.Provider
      value={{
        songs: filteredSongs(),
        currentSong,
        isPlaying,
        currentTime,
        duration,
        recentlyPlayed,
        favorites,
        activeTab,
        searchTerm,
        dominantColors,
        showSidebar,
        playPause,
        playNextSong,
        playPrevSong,
        playSong,
        handleTimeUpdate,
        handleToggleFavorite,
        setActiveTab,
        handleSearch,
        isFavorite,
        setShowSidebar,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
