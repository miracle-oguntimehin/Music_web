import React from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
}

const Playlist: React.FC = () => {
  // Simulated data
  const songs: Song[] = [
    { id: 1, title: "Song 1", artist: "Artist 1" },
    { id: 2, title: "Song 2", artist: "Artist 2" },
    { id: 3, title: "Song 3", artist: "Artist 3" },
    { id: 4, title: "Song 4", artist: "Artist 4" },
    { id: 5, title: "Song 5", artist: "Artist 5" }
  ];

  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul className="song-list">
        {songs.map(song => (
          <li key={song.id}>
            <strong>{song.title}</strong> - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
