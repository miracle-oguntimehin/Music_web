import React from 'react';
import './App.css';
import MusicApp from './component/MusicApp';
import Header from './component/Header';
import MainContent from './component/MainContent';
import Sidebar from './component/SideBar';
import Footer from './component/Footer';
import { BrowserRouter as Router,} from 'react-router-dom';
import Player from './component/PlayerTest';


function App() {
  return (
    <div>
      <Router>
      
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <MainContent />
            {/* <Player /> */}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
