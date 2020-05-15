import React from 'react';


import AppRoute from './routes/app.routes'
import Footer from './pages/mainPage/Foorter';

export default function Public(){
  return (
      <React.Fragment>
          <AppRoute />
          <Footer />
      </React.Fragment>
  );
}
