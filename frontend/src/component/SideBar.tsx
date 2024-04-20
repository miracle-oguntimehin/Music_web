import React from "react";
import { FaHome, FaMusic } from "react-icons/fa";
import { IoAlbums } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

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
            <div className="nav-item" onClick={() => navigate('/albums')}>
              <IoAlbums className="nav-icon" />
              <span className="nav-span">Albums</span>
            </div>
          </li>

          <li className="nav-item-container">
            <div className="nav-item" onClick={() => navigate('playlist')}>
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
