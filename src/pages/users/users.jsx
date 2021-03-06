import React from 'react';
import {Link} from 'react-router-dom';

import Main from '../../components/template/Main';
import {getUsers, searchUsers, filterUsers, deleteUser, deleteUserAll} from '../../services/api';
import LoadingPage from '../../components/events/LoadingPage';
import store from '../../store/store';

export default class users extends React.Component {
	state = {
		user:{},
		users:{data:[], lastPage:'', page:1, total:'', perPage:''},
		selectUsers:[],
		filter:'Filtro',
		edit:true,
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

		try{
			const users = await getUsers();
			// console.log(users);
			this.setState({users:users.data, loadpage:false});
		}catch(e){

		}
	}

	handleFilter = async (filter) => {
		this.setState({loadpage:true});
		const res = await filterUsers(filter);
		if (filter == 'Empresas') {
			this.setState({filter, users:res.data, loadpage:false, edit:false});
		}else{
			this.setState({filter, users:res.data, loadpage:false, edit:true});
		}
	}

	handleSearch = async (e) => {
		this.setState({loadpage:true});
		const filter = e.target.value;
		const res = await searchUsers(filter);
		let users = res.data;
		this.setState({users, loadpage:false});
	}

	handleDelete = async (id) => {
		if (window.confirm(`Você deseja desativar este usuário?`)) {
			try {
				const res = await deleteUser(id);
				window.location=window.location.href;

				//O QUE ESTÁ ACONTECENDO COM ESSE PEDAÇO DE CÓDIGO, NÃO ESTÁ FUNCIONANDO APÓS A EXECUÇÃO DO deleteUser
				// console.log(res)
				alert(`${res.error.message}`);
				const users = await getUsers();
				this.setState({users:users.data});

				if (res.data.error == true) {
					alert(`${res.data.message}`)
				// console.log(res.data.message)

				}else{
					alert(`${res.error.message}`);
					const users = await getUsers();
					this.setState({users:users.data});
					// console.log(res.data.message)

				}
			} catch (error) {
				
			}
		}
	}

	handleDeleteAll = async () => {
		if (this.state.selectUsers.length == 0) {
			alert(`Você precisa selecionar alguma amostra.`);
		}else{
			if (window.confirm(`Você tem certeza que deseja desativar este(s) usuário(s)`)) {
				await deleteUserAll(this.state.selectUsers);
				alert(`Ação solicitada com sucesso!`);
				window.location=window.location.href;

			}
		}
	}

	handleCheckbox = (id) => {
		//Não consegue desmarcar enquanto todos estão marcados
		let {selectUsers} = this.state;
		//Isolate sections
	    let check = selectUsers.filter((v,i) => selectUsers.indexOf(id) === i);
    	if(check.length >= 1){
	    	selectUsers = selectUsers.filter((v,i) => selectUsers.indexOf(id) !== i);
	    	this.setState({selectUsers});
	    	// console.log(selectUsers);
    	}else{		
	    	selectUsers.push(id);
		    this.setState({selectUsers});
	    	// console.log(selectUsers);
    	}
	}

	handlePaginate = async (page) => {
		try {
			const res = await getUsers(page);
			let users = res.data;
			
			this.setState({users});
			window.scroll(0,0);
			
		} catch (error) {
			alert(`Algo de errado aconteceu, contate o suporte técnico.`);
		}
	}

	renderPaginate(){
		const {lastPage, page, total, perPage} = this.state.users;
		if (total <= perPage) {
			return;
		}

		let pages = [];
		if (lastPage > 5) {
			for (let i = 1; i <= 4; i++) {
				pages.push(i);
			}
			pages.push(lastPage);
		}else{
			for (let i = 1; i <= lastPage; i++) {
				pages.push(i);
			}
		}

		return (
			<nav className="d-inline-block">
	          <ul className="pagination mb-0">
	            <li className={((page == 1) ? "page-item disabled" : "page-item")}>
		            <button className="page-link" tabIndex={-1} onClick={() => this.handlePaginate(page-1)}>
		              <i className="fas fa-chevron-left" />
		            </button>
	            </li>
	            {pages.map((value, i) => (
		            <li key={i} className={((value == page) ? "page-item active" : "page-item")}>
		            	<button className="page-link" onClick={() => this.handlePaginate(value)}>
		            		{value}
		            	</button>
		            </li>
	            ))}
	            <li className={((page == lastPage) ? "page-item disabled" : "page-item")}>
	              <button className="page-link" onClick={() => this.handlePaginate(page+1)}>
	              	<i className="fas fa-chevron-right" />
	              </button>
	            </li>
	          </ul>
	        </nav>
		)
	}

	render() {
		const {users} = this.state;
		return (
			<Main title="Usuários">
				 <div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Usuários</h4>
			              <div className="card-header-form" style={{width:'100%'}}>
						  	<div className="row" style={{width:'100%'}}>
							  	<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-left p-0">
								  <div className="option-group">
										{this.state.user.access_level_slug != 'professor' &&
										<div className="dropdown">
										<Link to="#" className="dropdown-toggle btn btn-primary" data-toggle="dropdown">{this.state.filter}</Link>
												<div className="dropdown-menu dropdown-menu-right">
												<button onClick={() => this.handleFilter('Filtro')} className="dropdown-item has-icon">Filtro</button>
												<button onClick={() => this.handleFilter('Professores')} className="dropdown-item has-icon">Professores</button>
												<button onClick={() => this.handleFilter('Alunos')} className="dropdown-item has-icon">Alunos</button>
												<button onClick={() => this.handleFilter('Operadores')} className="dropdown-item has-icon">Operadores</button>
												<button onClick={() => this.handleFilter('Empresas')} className="dropdown-item has-icon">Empresas</button>
												<button onClick={() => this.handleFilter('Funcionários')} className="dropdown-item has-icon">Funcionários</button>
												<button onClick={() => this.handleFilter('Usuários Pendentes')} className="dropdown-item has-icon">Usuários Pendentes</button>
											</div>
										</div>
										}
										{ this.state.user.access_level_slug != 'professor' &&
											<Link to="/usuarios/cadastro" title="Cadastrar" className="btn btn-primary ml-1 mr-1"><i className="fas fa-plus"></i></Link>
										}
										<button data-toggle="tooltip" title="Excluir" onClick={() => this.handleDeleteAll()} className="btn btn-danger mr-1"><i className="fas fa-trash"></i></button>
									</div>
									
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right">
									<form method="post" onSubmit={(e) => e.preventDefault()}>
										<div className="input-group">
											<input type="text" className="form-control" onChange={(e) => this.handleSearch(e)} placeholder="Pesquise pelo nome do usuário" />
											<div className="input-group-btn">
											<button className="btn btn-primary"><i className="fas fa-search" /></button>
											</div>
										</div>
									</form>
								</div>
							</div>
							  
			               
			              </div>
			            </div>
			            <div className="card-body p-0">
						 <LoadingPage loading={this.state.loadpage} />

			              <div className="table-responsive">
			                <table className="table table-striped">
			                  <tbody><tr>
			                      <th>
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" className="custom-control-input" id="checkbox-all" />
			                          <label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </th>
			                      <th className="">Nome</th>
			                      <th>Tipo</th>
			                      <th>Email</th>
			                      <th>Status</th>
			                      <th>Ações</th>
			                    </tr>
			                    {users.data.map((user,i) => (
				                    <tr key={i}>
				                      <td className="p-0 text-center">
				                        <div className="custom-checkbox custom-control">
				                          <input type="checkbox" data-checkboxes="mygroup" onClick={() => this.handleCheckbox(user.id)} className="custom-control-input" id={`checkbox-${user.id}`} />
				                          <label htmlFor={`checkbox-${user.id}`} className="custom-control-label">&nbsp;</label>
				                        </div>
				                      </td>
				                      <td>
				                      	<Link to={`/usuarios/ver-perfil/${user.id}`}>{user.name}</Link>
				                      </td>
				                      <td className="align-middle">{user.access_level}</td>
				                      <td>{user.email}</td>
				                      <td>
				                      	{user.status == 1 ? <div className="badge badge-success">Ativo</div> : <div className="badge badge-danger">Inativo</div>}
				                      </td>
				                      <td>
				                      	<div className="btn-group" role="group" aria-label="Exemplo básico">
					                      	<Link to={`/usuarios/ver-perfil/${user.id}`} className="btn btn-dark mr-1" title="Ver Amostras"> <i className="fas fa-vial"></i> </Link>
					                      	{this.state.user.access_level_slug != 'professor' && ( this.state.edit && <Link to={`/usuarios/editar/${user.id}`} className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link> )}
					                      	<button className="btn btn-danger" title="Excluir" onClick={() => this.handleDelete(user.id)}> <i className="fas fa-trash"></i> </button>
				                      	</div>
				                      </td>
				                    </tr>
			                    ))}
			                  </tbody>
			                </table>
			              </div>
			            </div>
						<div className="card-footer">
							  <div className="row">
								  <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-left">
								  	({this.state.users.data.length*(this.state.users.page == null ? 1 : this.state.users.page)}/{this.state.users.total})
								  </div>
								  <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right">
					        		{this.renderPaginate()}
								  </div>
							  </div>
					      </div>
			          </div>
			        </div>
			      </div>
			</Main>
		);
	}
}
