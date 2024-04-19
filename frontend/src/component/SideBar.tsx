import React, { useState } from "react";
import { FaHome, FaUser, FaMusic } from "react-icons/fa";
import { IoAlbums } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import  Logo  from './logo.png';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item-container">
            <div className="nav-item" onClick={() => navigate('/')}>
              
              <FaHome className="nav-icon" />
              
              <span className="nav-span">Home</span>
              
            </div>
          </li>
          <li className="nav-item-container">
            <div className="nav-item"  onClick={() => navigate('/albums')}>
              <IoAlbums className="nav-icon" />
              <span className="nav-span">Albums</span>
            </div>
          </li>
          
          <li className="nav-item-container">
            <div className="nav-item" onClick={() => navigate('all-playlist')}>
              <FaMusic className="nav-icon" />
              <span className="nav-span">Playlist</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
