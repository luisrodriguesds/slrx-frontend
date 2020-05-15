import React from 'react';

import Private from '../Private'
import Publuc from '../Public'
import { useAuth } from '../context/auth'

function Routes(){
  const { signed, loading } = useAuth()

  if(loading){
    return (
      <div className="app" id="app">
        <div className="main-wrapper main-wrapper-1">
          <center>
            <h1>Carregando ...</h1>
          </center>
        </div>
      </div>
    )
  }

  return (
    <div className="app" id="app">
      <div className="main-wrapper main-wrapper-1">
        {signed ? <Private /> : <Publuc/> }
      </div>
    </div>
  );
}

export default Routes