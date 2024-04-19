import React from 'react'
import { useParams } from 'react-router-dom';

const Category = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Category Detail</h1>
            <iframe
                title='category_detail'
                src={`https://open.spotify.com/embed/playlist/${categoryId}`}
                width="300"
                height="380"
            ></iframe>
        </div>
    );
}

export default Category