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
  );
}

export default App;
