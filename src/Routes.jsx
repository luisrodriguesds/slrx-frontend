import React from 'react';
import {Switch, Route, Redirect} from 'react-router';

import Dashboard from './pages/dashboard/dashboard';

import Equipment from './pages/equipment/equipment';
import addEquipment from './pages/equipment/addEquipment';

import Users from './pages/users/users';
import UserEdit from './pages/users/userEdit';
import addUser from './pages/users/addUser';
import UsersProfile from './pages/users/usersProfile';

import Solicitations from './pages/solicitations/solicitations';
import SampleSingle from './pages/solicitations/sampleSingle';
import addSolicitation from './pages/solicitations/addSolicitation';

import Profile from './pages/profile/profile';
import ChangePass from './pages/changePass/changePass';
import editAccount from './pages/editAccount/editAccount';

import NotFound from './pages/notFound';

import { isAuthenticated } from "./services/auth";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/inicio", state: { from: props.location } }} />
        )
      }
    />
  );

const Routes = (props) => {
  return (
    <Switch>
    	<PrivateRoute exact path='/' component={Dashboard} />
    	<PrivateRoute exact path='/dashboard' component={Dashboard} />

    	<PrivateRoute exact path='/equipamentos' component={Equipment} />
    	<PrivateRoute exact path='/equipamentos/cadastro' component={addEquipment} />

    	<PrivateRoute exact path='/usuarios' component={Users} />
    	<PrivateRoute exact path='/usuarios/cadastro' component={addUser} />
    	<PrivateRoute path='/usuarios/editar/:id' component={UserEdit} />
      <PrivateRoute path='/usuarios/ver-perfil/:id' component={UsersProfile} />

      <PrivateRoute exact path='/solicitacoes' component={Solicitations} />
      <PrivateRoute exact path='/solicitacoes/cadastro' component={addSolicitation} />
    	<PrivateRoute path='/solicitacoes/ver-amostra/:id' component={SampleSingle} />

    	<PrivateRoute exact path='/perfil' component={Profile} />
    	<PrivateRoute exact path='/alterar-senha' component={ChangePass} />
    	<PrivateRoute exact path='/editar-conta' component={editAccount} />

    	<PrivateRoute exact path='/404' component={NotFound} />
    	<Redirect from="*" to='/404' />
    </Switch>
  )
}

export default Routes;