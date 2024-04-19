import React from "react";
import Home from "./Home";
import MusicApp from "./MusicApp";
import Playlist from "./PlayList";
import { Route, Routes } from "react-router-dom";
import PlaylistOrAlbum from "./PlaylistorAlbum";
import Album from "./Album";
import Category from "./Category";

const MainContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/music" element={<MusicApp />} />
      <Route path="/album" element={<Album />} />
      <Route path="/playlist/:id" element={<Playlist />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/player/:id" element={<PlaylistOrAlbum />} />
    </Routes>
  );
};

export default MainContent;
