import React from 'react';
import {Link} from 'react-router-dom';

import Main from '../../components/template/Main';
import {getUsers, searchUsers, filterUsers} from '../../services/api';
import LoadingPage from '../../components/events/LoadingPage';
import store from '../../store/store';

export default class users extends React.Component {
	state = {
		user:{},
		users:{data:[], lastPage:'', page:'', total:'', perPage:''},
		selectUsers:[],
		filter:'Filtro',
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
			this.setState({users:users.data, loadpage:false});
			console.log(users);
		}catch(e){

		}
	}

	handleFilter = async (filter) => {
		const res = await filterUsers(filter);
		this.setState({filter, users:res.data});
	}

	handleSearch = async (e) => {
		const filter = e.target.value;
		const res = await searchUsers(filter);
		let users = res.data;
		this.setState({users});

		console.log(res, filter);
	}

	renderPaginate(){
		const {lastPage, page, total, perPage} = this.state.users;
		if (total <= perPage) {
			return;
		}

		let pages = [];
		for (let i = 1; i <= lastPage; i++) {
			pages.push(i);
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
			              <div className="card-header-form">
			              
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
			                <div className="option-group">
			                	<Link to="/usuarios/cadastro" title="Cadastrar" className="btn btn-primary ml-1 mr-1"><i className="fas fa-plus"></i></Link>
				            	<button data-toggle="tooltip" title="Excluir" className="btn btn-danger mr-1"><i className="fas fa-trash"></i></button>
			                </div>
			                <form>
			                  <div className="input-group">
			                    <input type="text" className="form-control" onChange={(e) => this.handleSearch(e)} placeholder="Pesquisar" />
			                    <div className="input-group-btn">
			                      <button className="btn btn-primary"><i className="fas fa-search" /></button>
			                    </div>
			                  </div>
			                </form>
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
			                      <th>Nome</th>
			                      <th>Tipo</th>
			                      <th>Email</th>
			                      <th>Status</th>
			                      <th>Ações</th>
			                    </tr>
			                    {users.data.map((user,i) => (
				                    <tr key={i}>
				                      <td className="p-0 text-center">
				                        <div className="custom-checkbox custom-control">
				                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-1" />
				                          <label htmlFor="checkbox-1" className="custom-control-label">&nbsp;</label>
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
					                      	<Link to={`/usuarios/editar/${user.id}`} className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
					                      	<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
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
								  <div className="col-6 text-left">
								  	({this.state.users.data.length}/{this.state.users.total})
								  </div>
								  <div className="col-6 text-right">
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
