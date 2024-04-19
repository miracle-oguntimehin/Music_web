import React from 'react';
import { useParams } from 'react-router-dom';



const PlaylistEmbed: React.FC = () => {
    const { playlistId } = useParams<{ playlistId: string }>();

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Playlist Embed</h1>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    className="embed-responsive-item"
                    src={`https://open.spotify.com/embed/playlist/${playlistId}`}
                    width="90%"
                    height="800"
                    frameBorder="0"
                    allowFullScreen
                    title="Playlist"
                ></iframe>
            </div>
        </div>
    );
};

export default PlaylistEmbed;
