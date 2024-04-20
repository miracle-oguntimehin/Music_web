import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PlaylistData {
    collaborative: boolean;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        height: number | null;
        url: string;
        width: number | null;
    }[];
    name: string;
    owner: {
        display_name: string;
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    primary_color: string | null;
    public: boolean | null;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
}

interface PlaylistCardProps {
    playlist: PlaylistData;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
    const navigate = useNavigate()
    return (
        <div className="card mb-4">
            {playlist.images.length > 0 && (
                <img src={playlist.images[0].url} className="card-img-top" alt={playlist.name} />
            )}
            <div className="card-body">
                <h5 className="card-title">{playlist.name}</h5>
                <p className="card-text">{playlist.description}</p>
                <p className="card-text">Total Tracks: {playlist.tracks.total}</p>
                <button type="button" onClick={() => navigate(`/player/playlist/${playlist.id}`)} className="btn btn-primary">
                    Play
                </button>
            </div>
        </div>
    );
};

export default PlaylistCard;