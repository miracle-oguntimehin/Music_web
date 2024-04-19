import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists');
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
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Featured Playlists</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
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
    </div>
  );
};

export default Playlists;
