import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Owner {
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
}

interface ExternalUrls {
    spotify: string;
}

interface Image {
    url: string;
    height: null | number;
    width: null | number;
}

interface Tracks {
    href: string;
    total: number;
}

interface PlaylistItem {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
    primary_color: string;
}

interface Playlists {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: PlaylistItem[];
}



const Category = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);

    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchPlaylists = async () => {
            if (accessToken) {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    };

                    const res = await axios.get<Playlists>(
                        `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
                        config
                    );
                    setPlaylists(res.data.items);
                    console.log(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchPlaylists();
    }, [categoryId]);

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Category Detail</h1>
            <div className="row">
                {playlists.map((playlist) => (
                    <div key={playlist.id} className="col-lg-4 mb-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={playlist.images[0].url} className="card-img-top" alt={playlist.name} />
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

export default Category;