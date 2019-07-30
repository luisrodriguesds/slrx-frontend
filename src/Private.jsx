import React, { Component } from 'react';

import Nav from './components/template/Nav';
import Sidebar from './components/template/Sidebar';
import Footer from './components/template/Footer';
import Routes from './Routes';

export default class Private extends Component {
  render() {
    return (
        <React.Fragment>
            <Nav />
            <Sidebar />
            <Routes />
            <Footer />
        </React.Fragment>
    );
  }
}
