import React, { Component } from 'react';

import Routes from './pages/mainPage/Routes.jsx';
import Footer from './pages/mainPage/Foorter';

export default class Public extends Component {
    

  render() {
    return (
        <React.Fragment>
            <Routes />
            <Footer />
        </React.Fragment>
    );
  }
}
