import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

interface SearchResult {
    albums: {
        items: {
            album_type: string;
            artists: {
                name: string;
            }[];
            name: string;
            external_urls: {
                spotify: string;
            };
        }[];
    };
    artists: {
        items: {
            name: string;
            external_urls: {
                spotify: string;
            };
        }[];
    };
    tracks: {
        items: {
            album: {
                name: string;
                artists: {
                    name: string;
                }[];
                external_urls: {
                    spotify: string;
                };
            };
            name: string;
            external_urls: {
                spotify: string;
            };
        }[];
    };
    playlists: {
        items: {
            description: string;
            external_urls: {
                spotify: string;
            };
            name: string;
            owner: {
                display_name: string;
                external_urls: {
                    spotify: string;
                };
            };
        }[];
    };
}

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

    const handleSearch = async (query: string) => {

        const accessToken = localStorage.getItem('access_token');
        try {
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            const response = await axios.get<SearchResult>(`https://api.spotify.com/v1/search?q=${query}&type=album%2Cartist%2Cplaylist%2Ctrack&limit=30`, config);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='search'>
                <input
                    type="text"
                    placeholder="Search music, album, artist, playlist..."
                    value={searchTerm}
                    onChange={handleChange}
                    className='search-input'
                />
                <button title='search...' className='search-btn' type="submit"><FaSearch className='search-icon' /></button>
            </form>
            <div>
                {searchResults && (
                    <>
                        <h2>Albums</h2>
                        {searchResults.albums.items.length > 0 ? (
                            <ul>
                                {searchResults.albums.items.map((album) => (
                                    <li key={album.external_urls.spotify}>
                                        <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                            <strong>{album.name}</strong> - {album.artists.map(artist => artist.name).join(', ')}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No albums found.</p>
                        )}

                        <h2>Artists</h2>
                        {searchResults.artists.items.length > 0 ? (
                            <ul>
                                {searchResults.artists.items.map((artist) => (
                                    <li key={artist.external_urls.spotify}>
                                        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                            {artist.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No artists found.</p>
                        )}

                        <h2>Tracks</h2>
                        {searchResults.tracks.items.length > 0 ? (
                            <ul>
                                {searchResults.tracks.items.map((track) => (
                                    <li key={track.external_urls.spotify}>
                                        <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                            <strong>{track.name}</strong> - {track.album.name} - {track.album.artists.map(artist => artist.name).join(', ')}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tracks found.</p>
                        )}

                        <h2>Playlists</h2>
                        {searchResults.playlists.items.length > 0 ? (
                            <ul>
                                {searchResults.playlists.items.map((playlist) => (
                                    <li key={playlist.external_urls.spotify}>
                                        <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                            <strong>{playlist.name}</strong> by {playlist.owner.display_name} - {playlist.description}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No playlists found.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;