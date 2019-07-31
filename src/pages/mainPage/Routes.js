import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router';

import Home from './Home';
import Choose from './Choose';
import Register from './Register';

export default class home extends Component {
  render() {
    return (
        <Switch>
    	    <Route exact path='/' component={()=><Home />} />
    	    <Route exact path='/inicio' component={()=><Home />} />
    	    <Route exact path='/cadastro' component={()=><Choose />} />

    	    <Route exact path='/cadastro/aluno' component={()=><Register />} />
    	    <Route exact path='/cadastro/professor' component={()=><Register />} />
    	    <Route exact path='/cadastro/empresa' component={()=><Register />} />
    	    <Route exact path='/cadastro/operador' component={()=><Register />} />

    	    <Route exact path='/404' component={() => <h1>404</h1>} />
        	<Redirect from="*" to='/404' />
        </Switch>
        );
  }
}
