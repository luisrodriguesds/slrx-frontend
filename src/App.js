import React from 'react';
import {HashRouter, BrowserRouter, Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Private from './Private';
import Public from './Public';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app" id="app">
        <div className="main-wrapper main-wrapper-1">
          {/* Rota Publica */}
          {!isAuthenticated() && <Public />}
          {/* Rota Privada */}
          {isAuthenticated() && <Private />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
