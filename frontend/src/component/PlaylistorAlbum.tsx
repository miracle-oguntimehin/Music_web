import React from 'react';
import { useParams } from 'react-router-dom'; // For handling URL parameters


const PlaylistOrAlbum: React.FC = () => {

  const id = useParams<{ id: string }>();




  return (
    <div>
      {id &&
        <iframe
          title='Album'
          src={`https://open.spotify.com/embed/album/${id.id}`}
          width="800"
          height="800"
        ></iframe>}
    </div>
  );
};

export default PlaylistOrAlbum;