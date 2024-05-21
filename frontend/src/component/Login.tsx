import React, { useState } from 'react';
import { FaSpotify } from "react-icons/fa";
import { Modal } from 'antd';

const Login: React.FC = () => {
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [visible, setVisible] = useState(false);
  const redirectUrl = 'http://localhost:3000/';

  const handleLoginClick = () => {
    setVisible(true);
    localStorage.removeItem('id')
    
  };
  const handleLoginSubmit = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&scope=streaming%20user-read-private%20user-read-email`;
    window.location.href = authUrl;
  }

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(e.target.value)
  }

  const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientSecret(e.target.value)
  }

  return (
    <>
      <button type='button' className='btnl' onClick={handleLoginClick}>
        Login
        <FaSpotify className='icon' />
      </button>

      {visible && 
      <Modal
      title="Login using your spotify dev account"
      open={visible}
      onOk={handleLoginSubmit}
      onCancel={() => setVisible(false)}
  >
      <input
          type="text"
          placeholder="Please enter your client ID"
          value={clientId}
          onChange={handleIdChange}
          className='search-input'
      />
      <input
          type="text"
          placeholder="Please enter your client Secret"
          value={clientSecret}
          onChange={handleSecretChange}
          className='search-input'
      />
  </Modal>
      }

    </>);
};

export default Login;
