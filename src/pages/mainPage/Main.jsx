import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/logo_lrx@2x.png';

// import { Container } from './styles';

const Main = (props) => (
    <>
    <nav className="navbar navbar-expand-lg main-navbar home-nav">
        <Link to="/" >
            <img src={Logo} alt="logo" className="navbar-brand" />
        </Link>       
        {/* <a href="#" className="nav-link sidebar-gone-show" data-toggle="sidebar"><i className="fas fa-bars"></i></a>
        <div className="nav-collapse">
            <a className="sidebar-gone-show nav-collapse-toggle nav-link" href="#">
                <i className="fas fa-ellipsis-v"></i>
            </a>
            <ul className="navbar-nav">
                <li className="nav-item active"><a href="#" className="nav-link">Application</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Report Something</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Server Status</a></li>
            </ul>
        </div> */}
    </nav>
    <div className="main-wrapper container">
    <div className="mt-1"></div>
	    {props.children}
    </div>
    </>
    );

export default Main;
