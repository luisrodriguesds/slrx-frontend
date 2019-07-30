import React from 'react';
import {HashRouter, BrowserRouter} from 'react-router-dom';

import Nav from './components/template/Nav';
import Sidebar from './components/template/Sidebar';
import Footer from './components/template/Footer';
import Routes from './Routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app" id="app">
        <div className="main-wrapper main-wrapper-1">
          <Nav />
          <Sidebar />
          <Routes />
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
