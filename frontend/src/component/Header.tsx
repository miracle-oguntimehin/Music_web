import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header: React.FC = () => {
  const navigate = useNavigate()
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">Music Web</span>
        <button className="btn-s" title=' search' type="button">
          <FaSearch onClick={() => navigate('/search')} />
        </button>
      </div>
    </nav>
  );
};

export default Header;
