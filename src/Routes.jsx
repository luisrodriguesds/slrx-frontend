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

const Routes = (props) => {
  return (
    <Switch>
    	<Route exact path='/' component={Dashboard} />
    	<Route exact path='/dashboard' component={Dashboard} />

    	<Route exact path='/equipamentos' component={Equipment} />
    	<Route exact path='/equipamentos/cadastro' component={addEquipment} />

    	<Route exact path='/usuarios' component={Users} />
    	<Route exact path='/usuarios/cadastro' component={addUser} />
    	<Route path='/usuarios/editar/:id' component={UserEdit} />
        <Route path='/usuarios/ver-perfil/:id' component={UsersProfile} />

        <Route exact path='/solicitacoes' component={Solicitations} />
        <Route exact path='/solicitacoes/cadastro' component={addSolicitation} />
    	<Route path='/solicitacoes/ver-amostra/:id' component={SampleSingle} />

    	<Route exact path='/perfil' component={Profile} />
    	<Route exact path='/alterar-senha' component={ChangePass} />
    	<Route exact path='/editar-conta' component={editAccount} />

    	<Route exact path='/404' component={NotFound} />
    	<Redirect from="*" to='/404' />
    </Switch>
  )
}

export default Routes;