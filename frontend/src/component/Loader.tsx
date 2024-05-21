import React from 'react'
import musicbg from "./music-bg.png"

const Loader = () => {
    return (
        <div className='load'>
            <div className="loader">
                <div className="loader_cube loader_cube--color"></div>
                <div className="loader_cube loader_cube--glowing">
                    <div className="music-logo">
                        <img src={musicbg} alt="Music Web" className="music-logo-img" />
                    </div>
                </div>
            </div><br />
            <h5>Loading ...</h5>
        </div>
    )
}

export default Loader