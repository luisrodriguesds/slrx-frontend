import React from 'react';
// , BrowserRouter, Route, Redirect
import {HashRouter } from 'react-router-dom';
// import { isAuthenticated, user } from "./services/auth";
// import Private from './Private';
// import Public from './Public';
import Routes from './routes/routes'
import AuthProvider from './context/auth'

import './App.css';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </HashRouter>
    // <BrowserRouter>
    //   <div className="app" id="app">
    //     <div className="main-wrapper main-wrapper-1">
    //       {/* Rota Publica */}
    //       {!isAuthenticated() && <Public />}
    //       {/* Rota Privada */}
    //       {isAuthenticated() && <Private />}
    //     </div>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
