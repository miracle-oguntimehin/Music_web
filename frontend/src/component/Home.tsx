import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Card from './Card';

interface Category {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: CategoryItem[];
}

interface CategoryItem {
  href: string;
  icons: {
    url: string;
    height: number;
    width: number;
  }[];
  id: string;
  name: string;
}


const Home: React.FC = () => {
  const [Data, setData] = useState<Category[]>([]);
  const clientId = 'b6c63c6eb96d49f2ae6aed718e5391bb';
  const redirectUrl = 'http://localhost:3000/';
  const clientSecret = '4bbb8502cc4a48b8ae37f006266516f1'

  const code = new URLSearchParams(window.location.search).get('code');

  const tokenUrl = 'https://accounts.spotify.com/api/token';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        const data = {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUrl,
          client_id: clientId,
          client_secret: clientSecret,
        };

        const response = await axios.post(tokenUrl, data, { headers });
        console.log(response.data);
        localStorage.setItem('access_token', response.data.access_token);
      } catch (error) {
        console.error(error);
      }
    };

    if (code) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  }, [code, clientId, clientSecret, redirectUrl, tokenUrl]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const fetchAlbums = async () => {
      if (accessToken) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };

          const res = await axios.get(
            `https://api.spotify.com/v1/browse/categories?limit=30`,
            config
          );
          setData(res.data.categories);
          console.log(res.data)
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div>
      <h1 className="title">Browse the most exiting music categories</h1>
      <hr />
      <div className="container mt-4">
        <div className="row">
          {Data.items?.map((category: { icons: { url: string | undefined; }[]; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; href: string | undefined; }, index: React.Key | null | undefined) => (
            <div key={index} className="col-lg-4 mb-4">
              <div className="card" style={{ width: '18rem' }}>
                <img src={category.icons[0].url} className="card-img-top" alt={category.name} />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <a href={category.href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Explore
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
