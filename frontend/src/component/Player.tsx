import React from 'react';



const EmbeddedTrack: React.FC = () => {
    const src = localStorage.getItem('id');
    console.log(src)
    return (

        <div className='track-player'>
            {src &&
                <iframe
                    src={`https://open.spotify.com/embed/track/${src}?utm_source=generator?autoplay=true`}
                    width='100%'
                    height='100'
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '12px' }}
                ></iframe>
            }
        </div>

    );
};


export default EmbeddedTrack;
