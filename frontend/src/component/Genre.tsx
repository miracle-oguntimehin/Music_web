import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaRegCirclePlay } from "react-icons/fa6";

interface Track {
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

const GenreRecommendations: React.FC = () => {
    const { genre } = useParams<{ genre: string }>();
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&seed_genres=${genre}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setTracks(response.data.tracks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [genre]);

    const handleTrackClick = (track: Track) => {
        localStorage.setItem('id', track.id);
        window.location.reload();
    };

    const formatDuration = (duration_ms: number) => {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Recommendations for {genre}</h2>
            <div className='tracks'>
                {tracks.map((track: Track) => (
                    <div key={track.id} className='track'>
                        <h4>{track.name}</h4>
                        <span>{formatDuration(track.duration_ms)}</span>
                        <button onClick={() => handleTrackClick(track)} type='button' title='Play'><FaRegCirclePlay /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenreRecommendations;