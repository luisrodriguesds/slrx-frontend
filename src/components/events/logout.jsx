import React, {Component} from 'react';
import {logout} from '../../services/auth';
import {URL_BASE} from '../../services/routesBackend';
import api from '../../services/api';


export default class Logout extends Component {
    
    async componentDidMount(){
        const res = await api.get('/user/logout');
        logout();
        window.location=URL_BASE;
    }

    
    render() {
        return <div />;
    }
}
