import React from 'react';

const LoadingPage = (props) => {
  return (
    <div className="loading-page" style={{display:((props.loading) ? 'block' : 'none')}}>
    	<i className="fas fa-sync-alt rotating"></i>
    </div>
  )
}

export default LoadingPage;