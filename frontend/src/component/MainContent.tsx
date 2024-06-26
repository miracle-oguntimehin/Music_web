import React from "react";
import Home from "./Home";
import Playlist from "./PlayList";
import { Route, Routes } from "react-router-dom";
import PlaylistOrAlbum from "./PlaylistorAlbum";
import Album from "./Album";
import Category from "./Category";
import PlaylistEmbed from "./PlaylistEmbed";
import Search from "./Search";
import EmbeddedTrack from "./Player";
import GenreList from "./GenreList";
import GenreRecommendations from "./Genre";
import Mood from "./Mood";

const MainContent: React.FC = () => {
  return (<>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/albums" element={<Album />} />
      <Route path="/playlist/" element={<Playlist />} />
      <Route path="/genres/" element={<GenreList />} />
      <Route path="/moody/" element={<Mood />} />
      <Route path="/genres/:genre" element={<GenreRecommendations />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/player/:id" element={<PlaylistOrAlbum />} />
      <Route path="/player/playlist/:id" element={<PlaylistEmbed />} />
    </Routes>
    <EmbeddedTrack />
  </>
  );
};

export default MainContent;
