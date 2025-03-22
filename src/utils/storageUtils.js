export const saveToRecentlyPlayed = (song) => {
  try {
    let recentlyPlayed =
      JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [];

    // Remove if already exists
    recentlyPlayed = recentlyPlayed.filter((track) => track.id !== song.id);

    // Add to beginning
    recentlyPlayed.unshift(song);

    // Keep only last 10
    if (recentlyPlayed.length > 10) {
      recentlyPlayed = recentlyPlayed.slice(0, 10);
    }

    sessionStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  } catch (error) {
    console.error("Error saving to recently played:", error);
  }
};

export const getRecentlyPlayed = () => {
  try {
    return JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [];
  } catch (error) {
    console.error("Error getting recently played:", error);
    return [];
  }
};

export const toggleFavorite = (song) => {
  try {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const index = favorites.findIndex((track) => track.id === song.id);

    if (index === -1) {
      favorites.push(song);
    } else {
      favorites.splice(index, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    return index === -1; // Returns true if added to favorites, false if removed
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return false;
  }
};

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const isFavorite = (songId) => {
  try {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some((track) => track.id === songId);
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};
