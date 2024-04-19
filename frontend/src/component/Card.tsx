import React from 'react';
import { useNavigate} from 'react-router-dom';

interface AlbumProps {
    album : {
    id: number;
  name: string;
  artists: {
    name: string;
  }[];
  images: {
    url: string;
  }[];
}
}

const Card: React.FC<AlbumProps> = ({ album }) => {
    const navigate = useNavigate()
  return (
    <div className="card">
      <img src={album.images[1].url} className="card-img-top" alt={album.name} />
      <div className="card-body">
        <h5 className="card-title">{album.name}</h5>
        <p className="card-text">
          {album.artists.map((artist, index) => (
            <span key={index}>
              {artist.name}
              {index < album.artists.length - 1 && ', '}
            </span>
          ))}
        </p>
        <button type="button" onClick={() => navigate(`/player/${album.id}`)} className="btn btn-primary">
          Play
        </button>
      </div>
    </div>
  );
};

export default Card;