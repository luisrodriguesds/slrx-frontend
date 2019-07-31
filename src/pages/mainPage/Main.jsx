import React from 'react';

// import { Container } from './styles';

const Main = (props) => (
    <div className="main-wrapper container">
    <div className="mt-5"></div>
	    {props.children}
    </div>
    );

export default Main;
