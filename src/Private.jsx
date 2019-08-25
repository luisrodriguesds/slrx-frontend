import React, { Component } from 'react';
import {Provider} from 'react-redux';

import Nav from './components/template/Nav';
import Sidebar from './components/template/Sidebar';
import Footer from './components/template/Footer';
import Routes from './Routes';

import {user} from './services/auth';
import {URL_BASE} from './services/routesBackend';

import store from './store/store';


export default class Private extends Component {
  
  render() {
    return (
        <React.Fragment>
          <Provider store={store}>
              <Nav />
              <Sidebar />
              <Routes />
              <Footer />
          </Provider>
        </React.Fragment>
    );
  }
}
