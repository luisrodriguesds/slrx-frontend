import React from 'react';

import Header from './Header';

const Main = (props) => {
  return (
    <React.Fragment>
    	<div className="main-content">
	        <Header {...props} />
			<div className="section-body">
	        {props.children}
	        </div>
      	</div>
    </React.Fragment>
  )
}

export default Main;