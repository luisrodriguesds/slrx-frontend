import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import ScrollToTop, { componentDidUpdate } from 'react-router-scroll-top';

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
import editSolicitation from './pages/solicitations/editSolicitation';

import Profile from './pages/profile/profile';
import ChangePass from './pages/changePass/changePass';
import editAccount from './pages/editAccount/editAccount';

import Files  from './pages/files/files';
import AddFiles  from './pages/files/addFiles';
import EditFiles  from './pages/files/editFiles';

import NotFound from './pages/notFound';

import { isAuthenticated } from "./services/auth";
// import {useSelector} from 'react-redux';

import store from './store/store';


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PrivateRoute = ({ component: Component,...rest }) => {
  store.dispatch({ type:'SELECT_MENU', url:rest.computedMatch.url});
  return (
    <Route
      {...rest}
      render={(routeProps, props)  =>
        isAuthenticated() ? (
          renderMergedProps(Component, routeProps, rest)
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  )
};

function Routes(props){
  // const user = useSelector(state => state.user.user);
  
  return (
    <React.Fragment>
      <ScrollToTop />
      <Switch>
      	<PrivateRoute exact path='/' component={Dashboard} />
      	<PrivateRoute exact path='/dashboard' component={Dashboard} />

      	<PrivateRoute exact path='/equipamentos' component={Equipment} />
      	<PrivateRoute exact path='/equipamentos/cadastro' component={addEquipment} />

      	<PrivateRoute exact path='/usuarios' component={Users} />
      	<PrivateRoute exact path='/usuarios/cadastro' component={addUser} />
      	<PrivateRoute path='/usuarios/editar/:id' component={UserEdit} />
        <PrivateRoute path='/usuarios/ver-perfil/:id' component={UsersProfile} />

      	<PrivateRoute exact path='/meus-alunos' component={Users} />

        <PrivateRoute exact path='/solicitacoes' component={Solicitations} />
        <PrivateRoute exact path='/solicitacoes/cadastro' component={addSolicitation} />
      	<PrivateRoute path='/solicitacoes/ver-amostra/:id' component={SampleSingle} />
      	<PrivateRoute path='/solicitacoes/editar/:name' component={editSolicitation} />

      	<PrivateRoute exact path='/perfil' component={Profile} />
      	<PrivateRoute exact path='/alterar-senha' component={ChangePass} />
      	<PrivateRoute exact path='/editar-conta' component={editAccount} />

      	<PrivateRoute exact path='/arquivos-uteis' component={Files} />
      	<PrivateRoute exact path='/arquivos-uteis/enviar' component={AddFiles} />
      	<PrivateRoute exact path='/arquivos-uteis/editar/:id' component={EditFiles} />

      	<PrivateRoute exact path='/404' component={NotFound} />
      	<Redirect from="*" to='/' />

      </Switch>

    </React.Fragment>
  )
}

export default Routes;