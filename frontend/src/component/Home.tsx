import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Card from './Card';
import PlaylistOrAlbum from './PlaylistorAlbum';

interface AlbumProps {
  id:  number;
  name: string;
  artists: {
      name: string;
  }[];
  images: {
      url: string;
  }[];
}

const Home: React.FC = () => {
  const [albumsData, setAlbumsData] = useState<AlbumProps[]>([]);
  const clientId = 'b6c63c6eb96d49f2ae6aed718e5391bb';
  const redirectUrl = 'http://localhost:3000/';
  const clientSecret = '234d3f18f5914c87a9ae72dc25c504ba';

  const code = new URLSearchParams(window.location.search).get('code');

  const tokenUrl = 'https://accounts.spotify.com/api/token';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        const data = {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUrl,
          client_id: clientId,
          client_secret: clientSecret,
        };

        const response = await axios.post(tokenUrl, data, { headers });
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
      } catch (error) {
        console.error( error);
      }
    };

    if (code) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  }, [code, clientId, clientSecret, redirectUrl, tokenUrl]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const fetchAlbums = async () => {
      if (accessToken) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };

          const res = await axios.get(
            `https://api.spotify.com/v1/browse/new-releases?limit=30`,
            config
          );
          setAlbumsData(res.data.albums.items);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div>
      <h1 className="title">Music Data</h1>
      <Login />
      <hr/>
      <div className='container'>
      {albumsData.map((album, index) => (
        <Card album={album} key={index} />
      ))}
      </div>
    </div>
  );
};

export default Home;
