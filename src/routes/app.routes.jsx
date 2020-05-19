import React, { useEffect } from 'react';
import {Switch, Route, Redirect} from 'react-router';
import ScrollToTop from 'react-router-scroll-top';

import Home from '../pages/mainPage/Home'
import Choose from '../pages/mainPage/Choose';
import Register from '../pages/mainPage/Register';
import SignUp from '../pages/mainPage/SignUp'
import ForgotPass from '../pages/mainPage/forgotPass';
import NotFound from '../pages/notFound';
import NewPass from '../pages/mainPage/NewPass';

// import { Container } from './styles';

function AppRoute() {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <React.Fragment>
        <ScrollToTop />
        <Switch>
          <Route exact path='/' component={()=><Home />} />
          <Route exact path='/inicio' component={()=><Home />} />
          <Route exact path='/cadastro' component={()=><Choose />} />

          <Route exact path='/cadastro/:level' component={()=><SignUp />} />

          <Route exact path='/recuperar-senha' component={()=><ForgotPass />} />
          <Route exact path='/nova-senha' component={()=> <NewPass />} />

          <Route exact path='/404' component={() => <NotFound />} />
          <Redirect from="*" to='/' />
        </Switch>
    </React.Fragment>
  );
}

export default AppRoute;