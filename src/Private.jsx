import React, { Component } from 'react';

import Nav from './components/template/Nav';
import Sidebar from './components/template/Sidebar';
import Footer from './components/template/Footer';
import Routes from './Routes';

import {user} from './services/auth';
import {URL_BASE} from './services/routesBackend';
export default class Private extends Component {
  state = {
    user:{}
  };
  async componentDidMount(){
    const u = await user();
    if(u == null){
      window.location=URL_BASE;
    }
    this.setState({user:{...u}});
  }
  render() {
    return (
        <React.Fragment>
            <Nav user={this.state.user} />
            <Sidebar user={this.state.user} />
            <Routes user={this.state.user} />
            <Footer />
        </React.Fragment>
    );
  }
}
