import React from 'react';
import {Link} from 'react-router-dom';

import Main from '../../components/template/Main';
import store from '../../store/store';
import {getUserById, getProfessorStudant, searchSolicitationByUser, getProposta, deleteProposta} from '../../services/api';

import Avatar from '../../assets/img/avatar/avatar-1.png';
import ModalProposta from '../../components/events/ModalProposta';
import ModalAddSolicitation from '../../components/events/ModalAddSolicitation';
import LoadingPage from '../../components/events/LoadingPage';
import SendPicture from '../profile/sendPicture';

export default class usersProfile extends React.Component {
	state = {
		userSingle:{},
		user:{},
		status:[
			{number:-3, descripiton:'Cancelada por falta de entrega da amostra.'},
			{number:-2, descripiton:'Cancelada pelo operador.'},
			{number:-1, descripiton:'Cancelada pelo responsável.'},
			{number:1, descripiton:'Aguardando autorização'},
			{number:2, descripiton:'Aguardando aprovação do Laboratório'},
			{number:3, descripiton:'Aguardando confirmação da entrega da amostra'},
			{number:4, descripiton:'Na fila do equipamento'},
			{number:5, descripiton:'Em processo de análise'},
			{number:6, descripiton:'Análise concluída. Aguardando recolhimento da amostra'},
			{number:7, descripiton:'Solicitação Finalizada'},
		],
		selectSol:[],
		solicitations:[],
		professor:null,
		studants:[],
		company:null,
		employees:[],
		showProposta:false,
		showOrdem:false,
		propostas:[],
		user_id:'',
		loading:false,
	  	loadpage:true
	}

	async componentDidMount(){
		store.subscribe(() =>{
			this.setState({
				user:store.getState().user.user
			})
			// console.log(this.state)
		});
		store.dispatch({
			type:'REQUEST_USER'
		});

		
			const {id} = this.props.match.params;
			const res = await getUserById(id);
			console.log(res.data.user, 'User');
			let obs = ``, studants, propostas;
			switch(res.data.user.access_level_slug){
				case "aluno":
					obs = (res.data.user.academic == null ? '' : `${res.data.user.academic.laboratory}`);
					let professor = await getProfessorStudant(res.data.user.id);
					console.log(professor.data, 'prof');
					propostas = await getProposta(res.data.user.id);
					this.setState({professor:professor.data, propostas:propostas.data});
				break;
				case "professor":
					obs = (res.data.user.academic == null ? '' : `${res.data.user.academic.laboratory}`);
					studants = await getProfessorStudant(null,	res.data.user.id);
					propostas = await getProposta(res.data.user.id);
					this.setState({studants:studants.data, propostas:propostas.data});
				break;
				case "tecnico":
				case "financeiro":
					obs = `${res.data.user.company.fantasy_name}`;
					propostas = await getProposta(res.data.user.id);
					this.setState({company:res.data.user.company, propostas:propostas.data});
				break;
				case "autonomo":
				case "operador":

				break;
				case "administrador":
					// obs = `${res.data.academic.laboratory}`;
					studants = await getProfessorStudant(null,	res.data.user.id);
					this.setState({studants:studants.data});
				break;
				case "empresa":
					obs = `${res.data.user.cnpj}`;
					if (res.data.user.employees.length > 0) {
						propostas = await getProposta(res.data.user.employees[0].id);
						this.setState({employees:res.data.user.employees, propostas:propostas.data});
					}
				break;
				default:
				break;
			}

			this.setState({userSingle:{obs, ...res.data.user}, solicitations:res.data.user.solicitations, user_id:id, loadpage:false});

		
	}

	handleLoadSol = async (id) =>{
		const res = await getUserById(id)
		console.log(res.data.solicitations)
		this.setState({...this.state, solicitations:res.data.solicitations})
	}

	handleCheckbox = (id) => {
		//Não consegue desmarcar enquanto todos estão marcados
		let {selectSol} = this.state;
		//Isolate sections
	    let check = selectSol.filter((v,i) => selectSol.indexOf(id) === i);
    	if(check.length >= 1){
	    	selectSol = selectSol.filter((v,i) => selectSol.indexOf(id) !== i);
	    	this.setState({selectSol});
	    	// console.log(selectSol);
    	}else{		
	    	selectSol.push(id);
		    this.setState({selectSol});
	    	// console.log(selectSol);
    	}
	}

	handleSearch = async (e) => {
		const filter = e.target.value;
		const res = await searchSolicitationByUser(filter, this.state.user_id);
		let solicitations = res.data;
		this.setState({solicitations});
	}

	deleteProposta = async (id) => {
		if (window.confirm("Deseja excluir esta proposta?")) {
			try {
				const res = await deleteProposta(id);
				if (res.data.error == true) {
					alert(res.data.message)
				}else{
					alert(res.data.message);
					let propostas;
					if (this.state.employees.length > 0) {
						propostas = await getProposta(this.state.employees[0].id);						
					}else{
						propostas = await getProposta(this.props.match.params.id);
					}

					this.setState({propostas:propostas.data});
				}
			} catch (error) {
				
			}
		}
	}

	

	renderProfessor(){
		const {professor} = this.state;
		const badge = professor.status !=1 ? "danger" : "primary";
		return (
			<div className="card">
              <div className="card-header">
                <h4 className="d-inline">Orientador</h4>
                {/*<div className="card-header-action">
                  <Link to="#" className="btn btn-primary">Ver todas</Link>
                </div>*/}
              </div>
              <div className="card-body">             
                <ul className="list-unstyled list-unstyled-border">
                  <li className="media">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="cbx-1" />
                      <label className="custom-control-label" htmlFor="cbx-1" />
                    </div>
                    <img className="mr-3 rounded-circle" width={50} src={professor.photo} alt="avatar" />
                    <div className="media-body">
                      <div className={`badge badge-pill badge-${badge} mb-1 float-right`}>{professor.status == 1 ? "Ativo" : "Inativo"}</div>
                      <h6 className="media-title"><a href={`/usuarios/ver-perfil/${professor.id}`}>{professor.name}</a></h6>
                      <div className="text-small text-muted">{professor.phone1} <div className="bullet" /> {professor.email} </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-footer pt-0">
                {/*<button className="btn btn-primary">Aprovar</button>*/}
              </div>
            </div>
		);
	}

	renderStudants(){
		const {studants} = this.state;

		return (
			<div className="card">
              <div className="card-header">
                <h4 className="d-inline">Alunos</h4>
                {/*<div className="card-header-action">
                  <Link to="#" className="btn btn-primary">Ver todas</Link>
                </div>*/}
              </div>
              <div className="card-body">             
                <ul className="list-unstyled list-unstyled-border">
                {studants.map((studant,i) => (
                  <li className="media" key={i}>
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="cbx-1" />
                      <label className="custom-control-label" htmlFor="cbx-1" />
                    </div>
                    <img className="mr-3 rounded-circle" width={50} src={studant.photo} alt="avatar" />
                    <div className="media-body">
                      <div className={`badge badge-pill badge-${studant.status == 1 ? 'primary' : 'danger'} mb-1 float-right`}>{studant.status == 1 ? 'Ativo' : 'Inativo'}</div>
                      <h6 className="media-title"><a href={`/usuarios/ver-perfil/${studant.id}`}>{studant.name}</a></h6>
                      <div className="text-small text-muted">{studant.phone1} <div className="bullet" /> {studant.email}</div>
                    </div>
                  </li>
                ))}
                </ul>
              </div>
              <div className="card-footer pt-0">
                {/*<button className="btn btn-primary">Aprovar</button>*/}
              </div>
          </div>
		)
	}

	renderCompany(){
		const {company} = this.state;
		const badge = company.status !=1 ? "danger" : "primary";

		return (
			<div className="card">
              <div className="card-header">
                <h4 className="d-inline">Empresa</h4>
                {/*<div className="card-header-action">
                  <Link to="#" className="btn btn-primary">Ver todas</Link>
                </div>*/}
              </div>
              <div className="card-body">             
                <ul className="list-unstyled list-unstyled-border">
                  <li className="media">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="cbx-1" />
                      <label className="custom-control-label" htmlFor="cbx-1" />
                    </div>
                    <img className="mr-3 rounded-circle" width={50} src={Avatar} alt="avatar" />
                    <div className="media-body">
                      <div className={`badge badge-pill badge-${badge} mb-1 float-right`}>{company.status == 1 ? "Ativo" : "Inativo"}</div>
                      <h6 className="media-title"><a href={`/usuarios/ver-perfil/company-${company.id}`}>{company.fantasy_name}</a></h6>
                      <div className="text-small text-muted">{company.company_phone} <div className="bullet" /> {company.company_email} </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-footer pt-0">
                {/*<button className="btn btn-primary">Aprovar</button>*/}
              </div>
            </div>
		)
	}

	renderEmployees(){
		const {employees} = this.state;
		
		return (
			<div className="card">
              <div className="card-header">
                <h4 className="d-inline">Funcionários</h4>
                {/*<div className="card-header-action">
                  <Link to="#" className="btn btn-primary">Ver todas</Link>
                </div>*/}
              </div>
              <div className="card-body">             
                <ul className="list-unstyled list-unstyled-border">
                {employees.map((employee,i) => (
                  <li className="media" key={i}>
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="cbx-1" />
                      <label className="custom-control-label" htmlFor="cbx-1" />
                    </div>
                    <img className="mr-3 rounded-circle" width={50} src={employee.photo} alt="avatar" />
                    <div className="media-body">
                      <div className={`badge badge-pill badge-${employee.status == 1 ? 'primary' : 'danger'} mb-1 float-right`}>{employee.status == 1 ? 'Ativo' : 'Inativo'}</div>
                      <h6 className="media-title"><a href={`/usuarios/ver-perfil/${employee.id}`}>{employee.name}</a></h6>
                      <div className="text-small text-muted">{employee.phone1} <div className="bullet" /> {employee.email}</div>
                    </div>
                  </li>
                ))}
                </ul>
              </div>
              <div className="card-footer pt-0">
                {/*<button className="btn btn-primary">Aprovar</button>*/}
              </div>
          </div>
		)
	}

	renderPropostas(){
		const {propostas} = this.state;
		// console.log(propostas)
		return (
			<div className="card">
              <div className="card-header">
                <h4 className="d-inline">Propostas</h4>
                {/*<div className="card-header-action">
                  <Link to="#" className="btn btn-primary">Ver todas</Link>
                </div>*/}
              </div>
              <div className="card-body">             
                <ul className="list-unstyled list-unstyled-border">
                {propostas.map((proposta,i) => (
                  <li className="media" key={i}>
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="cbx-1" />
                      <label className="custom-control-label" htmlFor="cbx-1" />
                    </div>
                    <img className="mr-3 rounded-circle" width={50} src={Avatar} alt="avatar" />
                    <div className="media-body">
                      <div className={`badge badge-pill badge-${proposta.status == 1 ? 'primary' : 'danger'} mb-1 float-right`}>{proposta.status == 1 ? 'Ativo' : 'Inativo'}</div>
                      <h6 className="media-title"><a href={`/usuarios/ver-perfil/${proposta.user.id}`}>Por: {proposta.user.name}</a></h6> { new Date(proposta.created_at).toLocaleString('pt-BR')}
                  {/*TROCAR ESSE LINK*/} 
						<div className="text-small text-muted"> 
							<a href={`${process.env.REACT_APP_API_URL}/solictation/ordem?data=${proposta.url}`} className="mr-2 text-warning" target="_blank">Ordem de Serviço</a>
							<a href={`${process.env.REACT_APP_API_URL}/solictation/proposta?data=${proposta.url}`} className="mr-2 color-primary" target="_blank">Ver Proposta</a>
							<a onClick={() => this.deleteProposta(proposta.id)} className="mr-2 text-danger">Excluir</a>
						</div>
                    </div>
                  </li>
                ))}
                </ul>
              </div>
              <div className="card-footer pt-0">
                {/*<button className="btn btn-primary">Aprovar</button>*/}
              </div>
          </div>
		)
	}


	render() {
		const {userSingle} = this.state;
		const {solicitations} = this.state;

		return (
			<Main title="Perfil do Usuário">
				<LoadingPage loading={this.state.loadpage} />
				<div className="row" style={{display:(this.state.loadpage ? 'none': 'flex')}}>
					<div className="col-12 col-sm-12 col-lg-7">

					  <div className="card profile-widget">
				        <div className="profile-widget-header">                     
				          <img alt="imge" src={userSingle.photo} className="rounded-circle profile-widget-picture" />
				          <div className="profile-widget-items">
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Total de Amostras</div>
				              <div className="profile-widget-item-value">{solicitations && solicitations.length}</div>
				            </div>
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Amostras Analisadas</div>
				              <div className="profile-widget-item-value">{solicitations && solicitations.filter((v,i) => v.status == 7).length}</div>
				            </div>
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Amostras Pendentes</div>
				              <div className="profile-widget-item-value">{solicitations && solicitations.filter((v,i) => v.status >= 1 && v.status < 7).length}</div>
				            </div>
				          </div>
				        </div>
				        <div className="profile-widget-description pb-0">
				          <div className="profile-widget-name"> 
				          	  {userSingle.name} 
					          <div className="text-muted d-inline font-weight-normal">
						          <div className="slash" /> 
						          {userSingle.access_level} 
						          <div className="slash" /> 
						          {userSingle.obs}
						          <div className="slash" /> 
						          {userSingle.email}
						          <div className="slash" /> 
						          {userSingle.phone1}
						       </div> 
				          </div>
				          <p><i>Sem descrição</i></p>
				          <p>
				          	{this.state.user.access_level_slug == 'administrador' && <Link to={`/usuarios/editar/${userSingle.id}`} className="btn btn-info mr-1" title="Editar"> Editar Usuário </Link>}
				          </p>
				        </div>
				        <div className="card-footer text-center pt-0">
				          
				        </div>
				      </div>
				      <div className="card">
			            <div className="card-header">
			              <h4>Amostras</h4>
			              <div className="card-header-form">
			                	{
			                		<div className="option-group">
										<ModalProposta title="Gerar Proposta pelo LRX" solicitations={this.state.selectSol} user_id={(this.state.solicitations.length > 0) ? this.state.solicitations[0].user_id : 0} />
										<ModalAddSolicitation title="Cadastrar Amostra" handleLoadSol={this.handleLoadSol.bind(this)} solicitations={this.state.selectSol} user_id={(this.state.solicitations.length > 0) ? this.state.solicitations[0].user_id : 0} />
               	
													</div>
			                	}
			                <form method="post" onSubmit={(e) => e.preventDefault()}>
			                  <div className="input-group">
			                    <input type="text" className="form-control" style={{width:'100px'}} onChange={(e) => this.handleSearch(e)} placeholder="Pesquisar" />
			                    <div className="input-group-btn">
			                      <button className="btn btn-primary"><i className="fas fa-search" /></button>
			                    </div>
			                  </div>
			                </form>
			              </div>
			            </div>
			            <div className="card-body p-0">
			              <div className="table-responsive">
			                <table className="table table-striped">
			                	<thead>
			                		<tr>
										<th>
											<div className="custom-checkbox custom-control">
												<input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" className="custom-control-input" id="checkbox-all" />
												<label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
											</div>
										</th>
										<th>Código</th>
										<th className="width-fixed">Status</th>
										<th>Data da Solicitação</th>
									</tr>
			                	</thead>
				                  <tbody>
									
									{solicitations.map((solicitation, i) => (
									<tr key={i}>
				                      <td className="p-0 text-center">
				                      	<div className="custom-control custom-checkbox">
	                                          <input type="checkbox" data-checkboxes="mygroup" onClick={() => this.handleCheckbox(solicitation.id)} className="custom-control-input" value={solicitation.id} name={`check-${i}`} id={`checkbox-${i}`} />
	                                          <label className="custom-control-label" htmlFor={`checkbox-${i}`}>&nbsp;</label>
	                                     </div>
				                      </td>
				                      <td className="weight">
				                      	<Link to={`/solicitacoes/ver-amostra/${solicitation.name}`}>{solicitation.name}</Link>
				                      </td>
				                      <td title={this.state.status.filter((value) => value.number == solicitation.status)[0].descripiton}>
				                      {this.state.status.map((value, i) => {
				                      	if (value.number >= 1) {		                      		
					                      	return (
					                      		<div className={((value.number <= solicitation.status) ? "badge badge-success" : "badge badge-danger")} key={`status-${i}`} data-toggle="tooltip" title={value.descripiton}>{(solicitation.status < 1) ? <i className="fa fa-times" aria-hidden="true"></i> : value.number}</div>
					                      	)
				                      	}
				                      })}
				                      </td>
				                      <td>{new Date(solicitation.created_at).toLocaleString('pt-BR')}</td>
				                      {/*
				                      	<td>
									  	<div className="btn-group" role="group" aria-label="Exemplo básico">
											{(this.state.user.permission || this.state.user.access_level_slug == 'professor') && <button data-toggle="tooltip" title="Passar para a próxima fase" onClick={() => this.handleNextStep(solicitation.id)} className="btn btn-info"><i className="fas fa-arrow-alt-circle-right"></i></button>}
				                      		<Link to={`/solicitacoes/editar/${solicitation.name}`} className="btn btn-warning" title="Editar"> <i className="fas fa-edit"></i> </Link>
				                      		<button className="btn btn-danger" title="Excluir" onClick={() => this.handleDelete(solicitation.name)}> <i className="fas fa-trash"></i> </button>
										</div>
				                      </td>
				                      */}
				                    </tr>

									))}
				                  </tbody>
			                </table>
			              </div>
			            </div>
					      	<div className="card-footer text-left">
					      		<p>({solicitations.length})</p>
					      	</div>
					      {/*
					      	<div className="card-footer text-right">
					        <nav className="d-inline-block">
					          <ul className="pagination mb-0">
					            <li className="page-item disabled">
					              <Link className="page-link" to="#" tabIndex={-1}><i className="fas fa-chevron-left" /></Link>
					            </li>
					            <li className="page-item active"><Link className="page-link" to="#">1 <span className="sr-only">(current)</span></Link></li>
					            <li className="page-item">
					              <Link className="page-link" to="#">2</Link>
					            </li>
					            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
					            <li className="page-item">
					              <Link className="page-link" to="#"><i className="fas fa-chevron-right" /></Link>
					            </li>
					          </ul>
					        </nav>
					      </div>
		
					      */}
			          </div>

					</div>
					<div className="col-12 col-sm-12 col-lg-5">
						 <SendPicture user={userSingle} />
					      {userSingle.access_level_slug == 'aluno' && this.renderProfessor() }
					      {(userSingle.access_level_slug == 'professor' || userSingle.access_level_slug == 'administrador') && this.renderStudants() }
					      {(userSingle.access_level_slug == 'tecnico' || userSingle.access_level_slug == 'financeiro') && this.renderCompany() }
					      {userSingle.access_level_slug == 'empresa' && this.renderEmployees() }
					      {this.renderPropostas() }

					</div>
				</div>
			</Main>
		);
	}
}
