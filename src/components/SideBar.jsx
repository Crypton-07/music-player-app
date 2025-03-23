import React, { useContext } from "react";
import { Button, Nav } from "react-bootstrap";
import { SIDEPANEL } from "../utils/constants";
import { MusicContext } from "../context/MusicContext";

const SideBar = () => {
  const {
    activeTab,
    setActiveTab,
    showSidebar,
    setShowSidebar,
    dominantColors,
  } = useContext(MusicContext);
  const gradientStyle = {
    background: `${
      showSidebar
        ? `linear-gradient(135deg, ${dominantColors.primary} 0%, ${dominantColors.secondary} 100%)`
        : ""
    }`,
  };

  return (
    <div
      className={`sidebar ${showSidebar ? "show" : ""}`}
      style={{ background: gradientStyle.background }}
    >
      <div className="sidebar-header">
        <img
        className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/2560px-Spotify_logo_with_text.svg.png"
          alt="logo"
          
        />
        {showSidebar && (
          <button
            className="close-sidebar"
            onClick={() => {
              setShowSidebar(false);
            }}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        )}
      </div>
      <Nav className="flex-column sidebar-nav">
        <Nav.Link
          className={activeTab === "all" ? "active" : ""}
          onClick={() => {
            setActiveTab("all");
            setShowSidebar(false);
          }}
        >
          <i className="bi bi-music-note"></i>
          {SIDEPANEL.FOR_YOU}
        </Nav.Link>

        <Nav.Link
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => {
            setActiveTab("favorites");
            setShowSidebar(false);
          }}
        >
          <i className="bi bi-heart"></i>
          {SIDEPANEL.FAV}
        </Nav.Link>

        <Nav.Link
          className={activeTab === "recent" ? "active" : ""}
          onClick={() => {
            setActiveTab("recent");
            setShowSidebar(false);
          }}
        >
          <i className="bi bi-clock-history"></i>
          {SIDEPANEL.RECENT}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
