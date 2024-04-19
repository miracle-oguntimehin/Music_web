import React from 'react';

const Login: React.FC = () => {
  const clientId = 'b6c63c6eb96d49f2ae6aed718e5391bb';
  const redirectUrl = 'http://localhost:3000/';
  const handleLoginClick = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&scope=streaming%20user-read-private%20user-read-email`;
    window.location.href = authUrl;
  };

  return <button onClick={handleLoginClick}>Login with Spotify</button>;
};

export default Login;
