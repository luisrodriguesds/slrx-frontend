import React from 'react';
import {Link} from 'react-router-dom';

import {getHead, filterUsers, postPedding, getAccessLevel, postEmail, storeProfessorStudant} from '../../services/api';
import store from '../../store/store';

import Main from '../../components/template/Main';
import Button from '../../components/events/LoadingButtom';
import ModalHead from '../../components/events/ModalHeaddash';

import LoadingPage from '../../components/events/LoadingPage';


export default class dashboard extends React.Component {
	state = {
		user:{},
		data:[],
		users:{data:[]},
		access:[],
		email:{subject:'', message:''},
		to:[],
		loading:false,
		loadpage:true
	}

	async componentDidMount(){
		store.subscribe(() =>{
			this.setState({
				user:store.getState().user.user
			})
		});
		store.dispatch({
			type:'REQUEST_USER'
		});

		const data = await getHead();

		const res = await filterUsers('pendentes', 1, 8);
		
		const access = await getAccessLevel();
		
		this.setState({users:res.data, data:data.data, access:access.data, loadpage:false});
		// console.log(this.state);
	}

	handleApprove = async (id) => {
		if (window.confirm('Tem certeza que deseja liberar o acesso deste usuário?')) {
			try {
				let res = await postPedding(id);
				if (res.data.error == true) {
					alert(`${res.data.message}`);
				}else{
					alert(`${res.data.message}`);
					res = await filterUsers('pendentes', 1, 8);
					this.setState({users:res.data});
				}
			} catch (error) {
				
			}
		}
	}

	handleEmail = async (e) => {
		e.preventDefault();
		const email = {...this.state.email, to:this.state.to};
		if (email.subject == '') {
			alert('Campo Assunto está vazio');
			return false;
		}else if (email.message == '') {
			alert('Campo Conteúdo está vazio');
			return false;
		}else if (this.state.to.length == 0) {
			alert('Campo Destinatário está vazio');	
			return false;
		}

		try {
			const res = await postEmail(email);
			if (res.data.error == true) {
				alert(`${res.data.message}`);
			}else{
				alert(`${res.data.message}`);
				window.location=window.location.href;
			}
		} catch (error) {
			
		}
	}

	onSubmitEmailStudant = async (e) => {
		e.preventDefault();
		const email = e.target.email_studant.value;
		if (email == '') {
			alert('Campo Email vazio');
			return false;
		}else if (email == this.state.user.email) {
			alert('Mesmo email');			
			return false;
		}

		//Send
		const res = await storeProfessorStudant(email);
		// console.log(res);
		if (res.data.error == true) {
			alert(res.data.message);
		}else{
			//alert
			alert(`${res.data.message}`);

			//Recarregar pendencias
			const pedding = await filterUsers('pendentes', 1, 8);
			this.setState({users:pedding.data});
		}
		// console.log(res);
	}

	_onChange = (e) => {
		let value = e.target.value;
		const email = {...this.state.email};
		email[e.target.name] = value;
		this.setState({email});
		// console.log(this.state);
	}

	handleCheckbox = (id) => {
		//Não consegue desmarcar enquanto todos estão marcados
		let {to} = this.state;
		//Isolate sections
	    let check = to.filter((v,i) => to.indexOf(id) === i);
    	if(check.length >= 1){
	    	to = to.filter((v,i) => to.indexOf(id) !== i);
	    	this.setState({to});
    	}else{		
	    	to.push(id);
		    this.setState({to});
		}
		// console.log(to);	
	}

	date_diff = (date) => {
		const date1     = new Date();
		const date2     = new Date(date);
		const timeDiff  = Math.abs(date2.getTime() - date1.getTime());
		let difHours  = Math.ceil(timeDiff / (1000 * 3600));
		let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		difHours = difHours >= 23 ? (diffDays == 1 ? `${diffDays} dia` : `${diffDays} dias`) : (difHours == 1 ? `${difHours} hora` : `${difHours} horas`);
		
		return difHours;
	  }

	render() {
		const {data, users, user, access} = this.state;
		return (
			<Main title="Dashboard">
				<LoadingPage loading={this.state.loadpage} />

				<div className="wrap_dashboard" style={{display:(this.state.loadpage ? 'none': 'block')}}>
					{/* Estatísticas */}
					<div className="row">
					<div className="col-lg-3 col-md-6 col-sm-6 col-12">
						<div className="card card-statistic-1">
						<div className="card-icon bg-success">
							<i className="fas fa-circle" />
						</div>
						<div className="card-wrap">
							<div className="card-header">
							<h4>Usuários Online Agora</h4>
							</div>
							<div className="card-body">
							{data.length == 0 ? '0' : data[0].count}
							</div>
						</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-12">
						<div className="card card-statistic-1">
						<div className="card-icon bg-primary">
							<i className="far fa-user" />
						</div>
						<div className="card-wrap">
							<div className="card-header">
							<h4>Total de Usuários</h4>
							</div>
							<div className="card-body">
							{data.length == 0 ? '0' : data[1].count}
							</div>
						</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-12">
						<div className="card card-statistic-1">
						<div className="card-icon bg-danger">
							<i className="far fa-newspaper" />
						</div>
						<div className="card-wrap">
							<div className="card-header">
							<h4>Total de Amostras DRX</h4>
							</div>
							<div className="card-body">
							<ModalHead method="DRX" data={data[2]}>{data.length == 0 ? '0' : data[2].count}</ModalHead> 
							</div>
						</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6 col-12">
						<div className="card card-statistic-1">
						<div className="card-icon bg-warning">
							<i className="far fa-file" />
						</div>
						<div className="card-wrap">
							<div className="card-header">
							<h4>Total de Amostras FRX</h4>
							</div>
							<div className="card-body">
							<ModalHead method="FRX" data={data[3]}>{data.length == 0 ? '0' : data[3].count}</ModalHead> 
							</div>
						</div>
						</div>
					</div>
					</div>
					{/* Medida DRX */}
					<div className="row">
					<div className="col-lg-12 col-md-12 col-12 col-sm-12">
						<div className="card">
						<div className="card-header">
							<h4>Medida DRX em tempo Real</h4>
							<div className="card-header-action">
							<a href="http://csd.fisica.ufc.br:8080/" target="_blank" className="btn btn-primary">Ver</a>
							</div>
						</div>
						<div className="card-body">
							{/*<canvas id="myChart" height={382} />*/}
							<iframe src="http://csd.fisica.ufc.br:8080/iframe" height="452" frameBorder="0" style={{border:0, width:"100%"}} allowFullScreen=""></iframe>
						</div>
						</div>
					</div>
					{/* Atividades Recentes */}
					{/* <div className="col-lg-4 col-md-12 col-12 col-sm-12" style={{display:'none'}}>
						<div className="card">
						<div className="card-header">
							<h4>Atividades Recentes</h4>
						</div>
						<div className="card-body">             
							<ul className="list-unstyled list-unstyled-border">
							<li className="media">
								<img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-1.png" alt="avatar" />
								<div className="media-body">
								<div className="float-right text-primary">Agora</div>
								<div className="media-title">César</div>
								<span className="text-small text-muted">Alterou o estado da amostra <a href="#">JCF023D0003</a> de esperando aprovação para na fila para o equipamento</span>
								</div>
							</li>
							<li className="media">
								<img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-2.png" alt="avatar" />
								<div className="media-body">
								<div className="float-right">12m</div>
								<div className="media-title">Isabela Oliveira</div>
								<span className="text-small text-muted">Cadastrou uma amostra chamada <a href="#">IOS123D0007</a> para ser analisada. </span>
								</div>
							</li>
							<li className="media">
								<img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-3.png" alt="avatar" />
								<div className="media-body">
								<div className="float-right">17m</div>
								<div className="media-title">Édipo</div>
								<span className="text-small text-muted">Efetuou seu cadastro no sistema e está aguardando aprovação.</span>
								</div>
							</li>
							<li className="media">
								<img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-4.png" alt="avatar" />
								<div className="media-body">
								<div className="float-right">21m</div>
								<div className="media-title">Juliana Silveira</div>
								<span className="text-small text-muted">Efetuou seu cadastro no sistema e está aguardando aprovação.</span>
								</div>
							</li>
							</ul>
							<div className="text-center pt-1 pb-1">
							<a href="#" className="btn btn-primary btn-lg btn-round">
								Ver Todas
							</a>
							</div>
						</div>
						</div>
					</div> */}
					</div>
					{/* Enviar Email */}
					<div className="row">
					<div className="col-lg-6 col-md-6 col-12" style={{display:(user.permission == true ? 'block' : 'none')}}>
						<form method="post" className="needs-validation" onSubmit={this.handleEmail} noValidate>
						<div className="card">
							<div className="card-header">
							<h4>Enviar Email</h4>
							</div>
							<div className="card-body pb-0">
							<div className="form-group">
								<label>Assunto</label>
								<input type="text" name="subject" className="form-control" required onChange={(e) => this._onChange(e)} />
								<div className="invalid-feedback">
								Please fill in the title
								</div>
							</div>
							<div className="form-group">
								<div className="control-label">Destinatário</div>
								{access.map((access, i) => (
									<div className="custom-switches-stacked mt-2" key={`ac-${i}`}>
										<label className="custom-switch">
											<input type="checkbox" name="to" value={access.name_slug} onClick={() => this.handleCheckbox(access.name_slug)} className="custom-switch-input" />
											<span className="custom-switch-indicator"></span>
											<span className="custom-switch-description">{access.name}</span>
										</label>
									</div>
								))}
							</div>
							<div className="form-group">
								<label>Conteúdo</label>
								{/* className="summernote-simple" */}
								<textarea className="form-control" style={{height:'300px'}} name="message" onChange={(e) => this._onChange(e)} placeholder="Conteúdo do Email" defaultValue={""} />
							</div>
							</div>
							<div className="card-footer pt-0">
							<button className="btn btn-primary">Enviar Email</button>
							</div>
						</div>
						</form>
					</div>
									
					
					<div className="col-lg-6 col-md-6 col-12" style={{display:(user.permission == true || user.access_level_slug == 'professor' ? 'block' : 'none')}}>
					{/* ADD ALUNO */}
					<div className="card">
						<div className="card-header">
							<h4 className="d-inline">Cadastrar Aluno</h4>
							<div className="card-header-action">
							{/* <a href="#" className="btn btn-primary">Ver todas</a> */}
							</div>
						</div>
						<div className="card-body"> 
							<form method="post" className="needs-validation" noValidate onSubmit={this.onSubmitEmailStudant} autoComplete="off">
								<div className="row">
									<div className="form-group col-12 col-sm-12 col-md-12 col-lg-12">
										<label htmlFor="name">Email <span style={{color:'red'}}>*</span> </label>
										<input id="email" type="email" placeholder="Digite o email de um aluno já cadastrado no sistema" className="form-control" name="email_studant" required />
										<div className="invalid-feedback">
										</div>
									</div>
								</div>
								<div className="form-group">
									<Button type="submit" className="btn btn-primary btn-lg" loading={this.state.loading} name="Cadastrar" loadName="Cadastrando..."></Button>
								</div>
							</form>
						</div>
						<div className="card-footer pt-0">
							{/* <button className="btn btn-primary">Aprovar</button> */}
						</div>
						</div>

					{/* Pendências de aprovações */}
						<div className="card">
						<div className="card-header">
							<h4 className="d-inline">Pendências de Cadastro</h4>
							<div className="card-header-action">
							{/* <a href="#" className="btn btn-primary">Ver todas</a> */}
							</div>
						</div>
						<div className="card-body">             
							<ul className="list-unstyled list-unstyled-border">
								{users.data.map((user,i) => (
									<li className="media" key={i}>
										<div className="custom-control custom-checkbox">
											<input type="checkbox" className="custom-control-input" id={`cbx-${i}`} />
											<label className="custom-control-label" htmlFor={`cbx-${i}`} />
										</div>
										<img className="mr-3 rounded-circle" width={50} src={user.photo} alt="avatar" />
										<div className="media-body">
											<div className="badge badge-pill badge-success mb-1 float-right" style={{cursor:'pointer'}} onClick={() => this.handleApprove(user.id)}>Aprovar</div>
											<h6 className="media-title"><Link to={`/usuarios/ver-perfil/${user.id}`}>{user.name}</Link></h6>
											<div className="text-small text-muted">{user.access_level} <div className="bullet" /> <span className="text-primary">{this.date_diff(user.updated_at)} </span> <div className="bullet" /> <span className="text-danger">{(user.confirm == 0) ? 'Não Autorizado' : (user.confirm_email == 0) ? 'Email não confirmado' : 'Não confirmado' }</span> </div>
										</div>
									</li>
								))}

							{/* <li className="media">
								<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="cbx-2" defaultChecked />
								<label className="custom-control-label" htmlFor="cbx-2" />
								</div>
								<img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-5.png" alt="avatar" />
								<div className="media-body">
								<div className="badge badge-pill badge-primary mb-1 float-right">Completo</div>
								<h6 className="media-title"><a href="#">Add a new component</a></h6>
								<div className="text-small text-muted">Serj Tankian <div className="bullet" /> 4 Min</div>
								</div>
							</li>
							<li className="media">
								<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="cbx-3" />
								<label className="custom-control-label" htmlFor="cbx-3" />
								</div>
								<img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-2.png" alt="avatar" />
								<div className="media-body">
								<div className="badge badge-pill badge-warning mb-1 float-right">Em progresso</div>
								<h6 className="media-title"><a href="#">Fix modal window</a></h6>
								<div className="text-small text-muted">Ujang Maman <div className="bullet" /> 8 Min</div>
								</div>
							</li>
							<li className="media">
								<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="cbx-4" />
								<label className="custom-control-label" htmlFor="cbx-4" />
								</div>
								<img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-1.png" alt="avatar" />
								<div className="media-body">
								<div className="badge badge-pill badge-danger mb-1 float-right">Incompleto</div>
								<h6 className="media-title"><a href="#">Remove unwanted classes</a></h6>
								<div className="text-small text-muted">Farhan A Mujib <div className="bullet" /> 21 Min</div>
								</div>
							</li> */}
							</ul>
						</div>
						<div className="card-footer pt-0">
							{/* <button className="btn btn-primary">Aprovar</button> */}
						</div>
						</div>
					</div>
					</div>
				</div>
			</Main>
		);
	}
}
