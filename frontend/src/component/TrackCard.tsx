import React from 'react';

interface TrackData {
    album: {
        album_type: string;
        artists: {
            name: string;
        }[];
        external_urls: {
            spotify: string;
        };
        name: string;
    };
    artists: {
        external_urls: {
            spotify: string;
        };
        name: string;
    }[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    preview_url: string;
    track_number: number;
}

interface TrackCardProps {
    track: TrackData;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{track.name}</h5>
                <p className="card-text">
                    Album: {track.album.name}<br />
                    Artist: {track.artists.map(artist => artist.name).join(', ')}<br />
                    Track Number: {track.track_number}
                </p>
                <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">Play</a>
            </div>
        </div>
    );
};

export default TrackCard;