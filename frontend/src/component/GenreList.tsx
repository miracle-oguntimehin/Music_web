import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
    };

    const filteredGenres = genres.filter((genre: string) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Available Genres</h2>
            <input
                type='text'
                placeholder='Search genres'
                value={searchTerm}
                onChange={handleSearch}
                className='search'
            />
            <div className='genres'>
                {filteredGenres.map((genre, index) => (
                    <button type='button' className='button' key={index}>{genre}</button>
                ))}
            </div>
        </div>
    );
};

export default GenreList;