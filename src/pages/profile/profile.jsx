import React from 'react';

import {getUserById} from '../../services/api';

import Main from '../../components/template/Main';
import SendPicture from './sendPicture';

import store from '../../store/store';

export default class profile extends React.Component {
	
	state = {
		user:{},
		solicitations:[]
	}

	async componentDidMount(){
		store.subscribe(async () =>{
			this.setState({
				user:store.getState().user.user
			})
			const solicitations = await getUserById(store.getState().user.user.id);
			this.setState({solicitations:solicitations.data.solicitations});
		});
		store.dispatch({
			type:'REQUEST_USER'
		});
	}
	render() {
		const {user} = this.state;
		const {solicitations} = this.state;

		return (
			<Main title="Perfil">
				<div className="row">
					<div className="col-12 col-sm-12 col-lg-7">
					  <div className="card profile-widget">
				        <div className="profile-widget-header">

				          <img alt="" src={user ? user.photo : `assets/img/avatar/avatar-1.png`} className="rounded-circle profile-widget-picture" />
				          <div className="profile-widget-items">
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Total de Amostras</div>
				              <div className="profile-widget-item-value">{solicitations && solicitations.length}</div>
				            </div>
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Amostras Analisadas</div>
				              <div className="profile-widget-item-value">{solicitations && solicitations.filter((v,i) => v.status === 7).length}</div>
				            </div>
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Amostras Pendentes</div>
				              <div className="profile-widget-item-value">{solicitations && solicitations.filter((v,i) => v.status >= 1 && v.status < 7).length}</div>
				            </div>
				          </div>
				        </div>
				        <div className="profile-widget-description pb-0">
				          <div className="profile-widget-name">{user.name} <div className="slash" /> {user.access_level}  {/* <div className="text-muted d-inline font-weight-normal"><div className="slash" /> Graduando <div className="slash" /> Laboratório de Raio X</div>*/} </div>
				          {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat.</p> */}
				          <p><i>Sem descrição</i></p>
							
				        </div>
				        <div className="card-footer text-center pt-0">
				          
				        </div>
				      </div>
					</div>
					<div className="col-12 col-sm-12 col-lg-5">
						 <SendPicture user={user} />
					</div>
				</div>
			</Main>
		);
	}
}
