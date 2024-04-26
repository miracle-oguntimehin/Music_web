import React from 'react';
import { FaSpotify } from "react-icons/fa";

const Login: React.FC = () => {
  const clientId = '1b744272ce5646098063ccb0ecdfbab0';
  const redirectUrl = 'http://localhost:3000/';
  const handleLoginClick = () => {
    localStorage.removeItem('id')
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&scope=streaming%20user-read-private%20user-read-email`;
    window.location.href = authUrl;
  };

  return (
    <>
      <button type='button' className='btnl' onClick={handleLoginClick}>
        Login
        <FaSpotify className='icon' />
      </button>

    </>);
};

export default Login;
