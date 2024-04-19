import React from "react";
import AlbumCard from "./AlbumCard";

const MusicApp: React.FC = () => {
  // Example data
  const albums = [
    {
      id: 1,
      title: "Album 1",
      artist: "Artist 1",
      cover: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Album 2",
      artist: "Artist 2",
      cover: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "Album 3",
      artist: "Artist 3",
      cover: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="container">
      <div className="row">
        {albums.map((album) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={album.id}>
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicApp;
