import React from "react";
import Home from "./Home";
import MusicApp from "./MusicApp";
import Playlist from "./PlayList";
import Player from "./Player";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlaylistOrAlbum from "./PlaylistorAlbum";
import Album from "./Album";

const MainContent: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/music" element={<MusicApp/>} />
        <Route path="/album" element={<Album/>} />
        <Route path="/playlist/:id?" element={<Playlist/>} />
        <Route path="/all-playlist/" element={<Playlist/>} />
        <Route path="/player/:id" element={<PlaylistOrAlbum/>} />
      </Routes>
  );
};

export default MainContent;
