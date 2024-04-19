import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

interface AlbumProps {
  id: number;
  name: string;
  artists: {
    name: string;
  }[];
  images: {
    url: string;
  }[];
}

const App = () => {
  const [albumsData, setAlbumsData] = useState<AlbumProps[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const fetchAlbums = async () => {
      if (accessToken) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };

          const res = await axios.get(
            `https://api.spotify.com/v1/browse/new-releases?limit=15`,
            config
          );
          setAlbumsData(res.data.albums.items);
          console.log(res.data)
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div>
      <h1 className="title">Latest Albums</h1>
      <div className='container'>
        {albumsData.map((album, index) => (
          <Card album={album} key={index} />
        ))}
      </div>
    </div>
  );
};


export default App;
