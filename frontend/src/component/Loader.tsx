import React from 'react'

const Loader = () => {
    return (
        <div className='load'>
            <div className="loader">
                <div className="loader_cube loader_cube--color"></div>
                <div className="loader_cube loader_cube--glowing"></div>
            </div><br/>
            <h5>Loading ...</h5>
        </div>
    )
}

export default Loader