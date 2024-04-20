import React from 'react';

interface ArtistData {
    external_urls: {
        spotify: string;
    };
    followers: {
        total: number;
    };
    genres: string[];
    images: {
        url: string;
    }[];
    name: string;
    popularity: number;
}

interface ArtistCardProps {
    artist: ArtistData;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
    return (
        <div className="card mb-4">
            <img src={artist.images[0]?.url} className="card-img-top rounded-circle" alt={artist.name} />
            <div className="card-body">
                <h5 className="card-title">{artist.name}</h5>
                <p className="card-text">
                    Followers: {artist.followers.total}<br />
                    Genres: {artist.genres.join(', ')}<br />
                    Popularity: {artist.popularity}
                </p>
                <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Profile</a>
            </div>
        </div>
    );
};

export default ArtistCard;