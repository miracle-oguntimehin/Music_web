import React from 'react';
import EmbeddedTrack from './Player';

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
    const handleTrackClick = async () => {
        localStorage.setItem('id', track.id)
        window.location.reload()

    }
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{track.name}</h5>
                <p className="card-text">
                    Album: {track.album.name}<br />
                    Artist: {track.artists.map(artist => artist.name).join(', ')}<br />
                    Track Number: {track.track_number}
                </p>
                <button type='button' onClick={handleTrackClick} className="btn btn-primary mt-2">Play</button>

            </div>
        </div>
    );
};

export default TrackCard;