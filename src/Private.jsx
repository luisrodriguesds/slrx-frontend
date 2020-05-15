import React, { useState } from 'react';
import {Provider} from 'react-redux';

import Nav from './components/template/Nav';
import Sidebar from './components/template/Sidebar';
import Footer from './components/template/Footer';
import AuthRoute from './routes/auth.routes'

import store from './store/store';


export default function Private() {
  const [side, setSide] = useState(false)

  return (
      <React.Fragment>
        <Provider store={store}>
            <Nav />
            <Sidebar />
            <AuthRoute />
            <Footer />
        </Provider>
      </React.Fragment>
  );
}
