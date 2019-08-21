import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router';
import ScrollToTop from 'react-router-scroll-top';

import {isAuthenticated} from '../../services/auth';

import Home from './Home';
import Choose from './Choose';
import Register from './Register';
import ForgotPass from './forgotPass';
import NotFound from '../notFound';
import NewPass from './NewPass';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

export default class Routes extends Component {
  
  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  render() {
    return (
        <React.Fragment>
            <ScrollToTop />
            <Switch>
        	    <Route exact path='/' component={()=><Home />} />
        	    <Route exact path='/inicio' component={()=><Home />} />
        	    <Route exact path='/cadastro' component={()=><Choose />} />

        	    <Route exact path='/cadastro/aluno' component={()=><Register />} />
        	    <Route exact path='/cadastro/professor' component={()=><Register />} />
        	    <Route exact path='/cadastro/empresa' component={()=><Register />} />
              <Route exact path='/cadastro/operador' component={()=><Register />} />
              <Route exact path='/cadastro/autonomo' component={()=><Register />} />

              <Route exact path='/recuperar-senha' component={()=><ForgotPass />} />
        	    <Route exact path='/nova-senha' component={()=> <NewPass />} />

        	    <Route exact path='/404' component={() => <NotFound />} />
            	<Redirect from="*" to='/' />
            </Switch>
        </React.Fragment>

        );
  }
}
