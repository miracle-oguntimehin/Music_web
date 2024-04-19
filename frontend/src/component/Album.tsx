import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumCard from './AlbumCard';
import Player from './Player';

const App = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('YOUR_API_ENDPOINT');
        setAlbums(response.data); // Assuming the response data is an array of albums
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      {/* {albums.map((album) => (
        <div key={album.id}>
          <AlbumCard album={album} />
          <Player tracks={album.tracks} />
        </div>
      ))} */}
    </div>
  );
};

export default App;
