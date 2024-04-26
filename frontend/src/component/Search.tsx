import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import Card from './Card';
import ArtistCard from './ArtistCard';
import TrackCard from './TrackCard';
import PlaylistCard from './PlaylistCard';

interface SearchResult {
    albums: {
        items: {
            id: number;
            name: string;
            artists: {
                name: string;
            }[];
            images: {
                url: string;
            }[];
        }[];
    };
    artists: {
        items: {
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
        }[];
    };
    tracks: {
        items: {
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
        }[];
    };
    playlists: {
        items: {
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
            const response = await axios.get<SearchResult>(`https://api.spotify.com/v1/search?q=${query}&type=album%2Cartist%2Cplaylist%2Ctrack&limit=8`, config);
            setSearchResults(response.data);
            console.log(response.data)
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

                        <h2>Tracks</h2>
                        {searchResults.tracks.items.length > 0 ? (
                            <div className='container'>
                                {searchResults.tracks.items.map((track, index) => (
                                    <TrackCard track={track} key={index} />
                                ))}
                            </div>
                        ) : (
                            <p>No tracks found.</p>
                        )}

                        <h2>Playlists</h2>
                        {searchResults.playlists.items.length > 0 ? (
                            <div className='container'>
                                {searchResults.playlists.items.map((playlist, index) => (
                                    <PlaylistCard playlist={playlist} key={index} />
                                ))}
                            </div>
                        ) : (
                            <p>No playlists found.</p>
                        )}
                        <h2>Albums</h2>
                        {searchResults.albums.items.length > 0 ? (
                            <div className='container'>
                                {searchResults.albums.items.map((album, index) => (
                                    <Card album={album} key={index} />
                                ))}
                            </div>
                        ) : (
                            <p>No albums found.</p>
                        )}

                        <h2>Artists</h2>
                        {searchResults.artists.items.length > 0 ? (
                            <div className='container'>
                                {searchResults.artists.items.map((artist, index) => (
                                    <ArtistCard artist={artist} key={index} />
                                ))}
                            </div>
                        ) : (
                            <p>No artists found.</p>
                        )}

                    </>
                )}
            </div>
        </div>
    );
};

export default Search;