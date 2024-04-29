import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  externalUrl: string;
}

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPlaylists = async () => {

      const accessToken = localStorage.getItem('access_token');
      try {
        setLoading(true)
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists',
          config);
        const { items } = response.data.playlists;
        const formattedPlaylists: Playlist[] = items.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          imageUrl: item.images[0]?.url || '',
          externalUrl: item.external_urls.spotify,
        }));
        setPlaylists(formattedPlaylists);
      } catch (error) {
        console.error('Error fetching featured playlists:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Featured Playlists</h1>
      {loading ? <Loader /> :
        <div className="row">
          {playlists.map((playlist) => (
            <div className="col" key={playlist.id}>
              <div className="card h-100">
                <img src={playlist.imageUrl} className="card-img-top" alt={playlist.name} />
                <div className="card-body">
                  <h5 className="card-title">{playlist.name}</h5>
                  <p className="card-text">{playlist.description}</p>
                  <button type="button" onClick={() => navigate(`/player/playlist/${playlist.id}`)} className="btn btn-primary">
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Playlists;
