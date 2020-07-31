import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import ScrollToTop from 'react-router-scroll-top';

import Dashboard from '../pages/dashboard/dashboard';

import Equipment from '../pages/equipment/equipment';
import addEquipment from '../pages/equipment/addEquipment';

import Users from '../pages/users/users';
import UserEdit from '../pages/users/userEdit';
import addUser from '../pages/users/addUser';
import UsersProfile from '../pages/users/usersProfile';

import Solicitations from '../pages/solicitations/solicitations';
import SampleSingle from '../pages/solicitations/sampleSingle';
import addSolicitation from '../pages/solicitations/addSolicitation';
import editSolicitation from '../pages/solicitations/editSolicitation';

import Profile from '../pages/profile/profile';
import ChangePass from '../pages/changePass/changePass';
import editAccount from '../pages/editAccount/editAccount';

import Files  from '../pages/files/files';
import AddFiles  from '../pages/files/addFiles';
import EditFiles  from '../pages/files/editFiles';

import Statistics from '../pages/mainPage/Statistics';

import Proposals from '../pages/Proposals/proposals';
import AddProposals from '../pages/Proposals/addProposals';

import NotFound from '../pages/notFound';


// import { Container } from './styles';

function AuthRoute() {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Switch>
      	<Route exact path='/' component={Dashboard} />
      	<Route exact path='/dashboard' component={Dashboard} />

      	<Route exact path='/equipamentos' component={Equipment} />
      	<Route exact path='/equipamentos/cadastro' component={addEquipment} />
      	<Route exact path='/equipamentos/editar/:id' component={addEquipment} />

      	<Route exact path='/usuarios' component={Users} />
      	<Route exact path='/usuarios/cadastro' component={addUser} />
      	<Route exact path='/usuarios/propostas' component={Proposals} />
      	<Route exact path='/usuarios/propostas/cadastrar' component={AddProposals} />
      	<Route path='/usuarios/editar/:id' component={UserEdit} />
        <Route path='/usuarios/ver-perfil/:id' component={UsersProfile} />

      	<Route exact path='/meus-alunos' component={Users} />

        <Route exact path='/solicitacoes' component={Solicitations} />
        <Route exact path='/solicitacoes/cadastro' component={addSolicitation} />
      	<Route path='/solicitacoes/ver-amostra/:id' component={SampleSingle} />
      	<Route path='/solicitacoes/editar/:name' component={editSolicitation} />

      	<Route exact path='/perfil' component={Profile} />
      	<Route exact path='/alterar-senha' component={ChangePass} />
      	<Route exact path='/editar-conta' component={editAccount} />

      	<Route exact path='/arquivos-uteis' component={Files} />
      	<Route exact path='/arquivos-uteis/enviar' component={AddFiles} />
      	<Route exact path='/arquivos-uteis/editar/:id' component={EditFiles} />

				<Route exact path='/estatisticas' component={()=><Statistics />} />

      	<Route exact path='/404' component={NotFound} />
      	<Redirect from="*" to='/' />

      </Switch>

    </React.Fragment>
  );
}

export default AuthRoute;