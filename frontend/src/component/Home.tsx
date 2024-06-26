import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import { Link } from 'react-router-dom';
import Loader from './Loader';

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
  const [Data, setData] = useState<CategoryItem[]>([]);
  const clientId = localStorage.getItem('id');
  const redirectUrl = 'http://localhost:3000/';
  const clientSecret = localStorage.getItem('secret')
  const [loading, setLoading] = useState(false)

  const code = new URLSearchParams(window.location.search).get('code');

  const tokenUrl = 'https://accounts.spotify.com/api/token';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
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
        localStorage.setItem('access_token', response.data.access_token);
        window.location.reload()
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
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
          setLoading(true)
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };

          const res = await axios.get(
            `https://api.spotify.com/v1/browse/categories?limit=30`,
            config
          );
          setData(res.data.categories.items);
        } catch (err) {
          console.log(err);
        } finally {
          setTimeout(() => {
            setLoading(false)
          }, 2000);
        }
      }
    };
    fetchAlbums();
  }, []);

  return (
    loading ? <Loader /> :
      <div><br />
        {!Data.length && <Login />}
        <hr />
        {!Data.length ? <h1 className="title"> Welcome to Music Web, Please login to see our suggestions</h1> : <h1 className="title">Browse the most exiting music categories on Music Web</h1>}

        <div className="container mt-4">
          <div className="row">
            {Data?.map((category: { id: string; icons: { url: string | undefined; }[]; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; href: string | undefined; }, index: React.Key | null | undefined) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="card" style={{ width: '18rem' }}>
                  <img src={category.icons[0].url} className="card-img-top" alt={`${category.name}`} />
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <Link to={`/category/${category.id}`} className="btn btn-primary">
                      Explore
                    </Link>
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
