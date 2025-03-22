import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MusicContext } from "../context/MusicContext";
import SearchBar from "./SearchBar";
import SongList from "./SongList";
import PlayerControls from "./PlayerControls";
import SideBar from "./SideBar";
import PlayerControlsSmall from "./PlayerControlsSmall";

const MusicPlayer = () => {
  const { dominantColors, showSidebar, setShowSidebar } =
    useContext(MusicContext);

  const gradientStyle = {
    background: `linear-gradient(135deg, ${dominantColors.primary} 0%, ${dominantColors.secondary} 100%)`,
  };

  return (
    <div className="music-player-app" style={gradientStyle}>
      <Container fluid>
        <Row>
          <Col md={3} className="sidebar-col">
            <SideBar />
          </Col>

          <Col md={9} lg={4} className="main-content">
            <div className="mobile-header">
              <Button
                variant="link"
                className="menu-toggle"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <i className="bi bi-list"></i>
              </Button>
              {showSidebar && (
                <div className="show-sidebar-sm">
                  <SideBar />
                </div>
              )}
            </div>

            <div className="search-row">
              <SearchBar />
            </div>

            <div className="content-area">
              <SongList />
            </div>

            <div className="player-row-sm">
              <PlayerControlsSmall />
            </div>
          </Col>
          <Col lg={5}>
            <div className="player-row">
              <PlayerControls />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MusicPlayer;
