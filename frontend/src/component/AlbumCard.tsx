import React from "react";

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <div className="card">
      <img src={album.cover} alt={album.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{album.title}</h5>
        <p className="card-text">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
