import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For handling URL parameters

interface MusicData {
  name: string; // Optional name of the album
}

interface AlbumProps {
  id: string; // ID of the album
}

const PlaylistOrAlbum: React.FC = () => {
  const [albumData, setAlbumData] = useState<MusicData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const id = useParams<{ id: string }>();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setIsLoading(true);
  //       setError(null);

  //       try {
  //         const endpoint = `https://api.spotify.com/v1/albums/${id}`;

  //         const response = await fetch(endpoint, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
  //           },
  //         });

  //         if (!response.ok) {
  //           throw new Error(`Error fetching album data: ${response.statusText}`);
  //         }

  //         const data = await response.json();
  //         setAlbumData({ name: data.name }); // Extract only album name if needed
  //       } catch (error: any) {
  //         console.error('Error fetching album data:', error);
  //         setError(error.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     if ( id) {
  //       fetchData();
  //     }
  //   }, [id]);

  if (isLoading) {
    return <p>Loading album data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }



  return (
    <div>
      {id &&
        <iframe
          title='Album'
          src={`https://open.spotify.com/embed/album/${id.id}`}
          width="800"
          height="800"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>}
    </div>
  );
};

export default PlaylistOrAlbum;