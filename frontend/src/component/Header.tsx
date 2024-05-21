import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import musicbg from "./music-bg.png"

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <div className="music-logo-1" onClick={() => navigate('/')}>
          <img src={musicbg} alt="Music Web" className="music-logo-img" />
        </div>
        <span className="navbar-brand" onClick={() => navigate('/')}>Music Web</span>
        <button className="btn-s" title=' search' type="button">
          <FaSearch onClick={() => navigate('/search')} />
        </button>
      </div>
    </nav>
  );
};

export default Header;
