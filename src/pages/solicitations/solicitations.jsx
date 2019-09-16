import React from 'react';
import {Link} from 'react-router-dom';

import {getUser, getSolicitation, searchSolicitation} from '../../services/api';

import Main from '../../components/template/Main';

export default class solicitations extends React.Component {
	//SALVAR AS MARCAÇÕES 

	state = {
		user:{},
		solicitations:{data:[], lastPage:'', page:'', total:'', perPage:''},
		status:[
			{number:1, descripiton:'Aguardando autorização'},
			{number:2, descripiton:'Aguardando aprovação do Laboratório'},
			{number:3, descripiton:'Aguardando confirmação da entrega da amostra'},
			{number:4, descripiton:'Na fila do equipamento'},
			{number:5, descripiton:'Em processo de análise'},
			{number:6, descripiton:'Análise concluída. Aguardando recolhimento da amostra'},
			{number:7, descripiton:'Solicitação Finalizada'},
		],
		selectSol:[],
		checkboxAll:false,
		loading:false,
	  	loadpage:true
	}

	async componentDidMount(){
		const user = await getUser();
		//Check if user is adm or oper to get all solicitations or this solicitations are they
		let res = await getSolicitation({page:1});
		let solicitations = res.data;

		// for (let i = 0; i < res.data.data.length; i++) {
		// 	let date = new Date(solicitations.data.data[i].created_at);
		// 	solicitations.data.data[i].created_at = date.toLocaleDateString();
		// }

		this.setState({user:user.data.user, solicitations, loadpage:false})
		console.log(this.state);
	}

	handleSearch = async (e) => {
		const filter = e.target.value;
		const res = await searchSolicitation({filter});
		let solicitations = res.data;
		this.setState({solicitations});

		// console.log(res, filter);
	}

	handleCheckboxAll = () => {
		let selectSol = [];
		if (this.state.checkboxAll == false) {
			selectSol = this.state.solicitations.data.map(value => value.id);
		}else{
			selectSol = [];
		}
		this.setState({checkboxAll:!this.state.checkboxAll, selectSol});
		// console.log(selectSol);
	}

	handleCheckbox = (id) => {
		//Não consegue desmarcar enquanto todos estão marcados
		let {selectSol} = this.state;
		//Isolate sections
	    let check = selectSol.filter((v,i) => selectSol.indexOf(id) === i);
    	if(check.length >= 1){
	    	selectSol = selectSol.filter((v,i) => selectSol.indexOf(id) !== i);
	    	this.setState({selectSol});
	    	console.log(selectSol);
    	}else{		
	    	selectSol.push(id);
		    this.setState({selectSol});
	    	// console.log(selectSol);
    	}
	}

	handlePaginate = async (page) => {
		let res = await getSolicitation({page});
		let solicitations = res.data;
		
		this.setState({solicitations});
		window.scroll(0,0);
	}

	renderPaginate(){
		const {lastPage, page, total, perPage} = this.state.solicitations;
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
		            		{value} {/*<span className="sr-only">(current)</span>*/}
		            	</button>
		            </li>
	            ))}
	            {/*<li className="page-item">
	              <button className="page-link">2</button>
	            </li>
	            <li className="page-item">
	            	<button className="page-link">3</button>
	            </li>*/}
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
		let {solicitations} = this.state;
		return (

			<Main title="Solicitações">
				<div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Amostras</h4>
			              <div className="card-header-form">
			                <div className="option-group">
			                	<Link to="/solicitacoes/cadastro" title="Cadastrar" className="btn btn-primary ml-1 mr-1"><i className="fas fa-plus"></i></Link>
				            	<button data-toggle="tooltip" title="Passar todas para a próxima fase" className="btn btn-info mr-1"><i className="fas fa-arrow-alt-circle-right"></i></button>
				            	<button data-toggle="tooltip" title="Excluir" className="btn btn-danger mr-1"><i className="fas fa-trash"></i></button>
			                </div>
			                <form>
			                  <div className="input-group">
			                    <input type="text" className="form-control" placeholder="Pesquisar" onChange={(e) => this.handleSearch(e)} />
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
												<input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" onClick={() => this.handleCheckboxAll()} className="custom-control-input" id="checkbox-all" />
												<label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
											</div>
										</th>
										<th>Código</th>
										<th>Equipamento</th>
										<th>Status</th>
										<th>Data da Solicitação</th>
										<th>Ações</th>
									</tr>
			                	</thead>
			                  <tbody>
								
								{solicitations.data.map((solicitation, i) => (
								<tr key={i}>
			                      <td className="p-0 text-center">
			                      	<div className="custom-control custom-checkbox">
                                          <input type="checkbox" data-checkboxes="mygroup" checked={this.state.checkboxAll} onClick={() => this.handleCheckbox(solicitation.id)} className="custom-control-input" value={solicitation.id} name={`check-${i}`} id={`checkbox-${i}`} />
                                          <label className="custom-control-label" htmlFor={`checkbox-${i}`}>&nbsp;</label>
                                     </div>
			                      </td>
			                      <td>
			                      	<Link to={`/solicitacoes/ver-amostra/${solicitation.name}`}>{solicitation.name}</Link>
			                      </td>
			                      <td className="align-middle">{solicitation.equipment.name}</td>
			                      <td>
			                      {this.state.status.map((value, i) => (
			                      	<div className={((value.number <= solicitation.status) ? "badge badge-success" : "badge badge-danger")} key={`status-${i}`} data-toggle="tooltip" title={value.descripiton}>{value.number}</div>
			                      ))}
			                      </td>
			                      <td>{solicitation.created_at}</td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
										<button data-toggle="tooltip" title="Passar para a próxima fase" className="btn btn-primary"><i className="fas fa-arrow-alt-circle-right"></i></button>
			                      		<Link to={`/solicitacoes/editar/${solicitation.name}`} className="btn btn-info" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      		<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
									</div>
			                      </td>
			                    </tr>

								))}
			                    

			                    {/*<tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-2" />
			                          <label htmlFor="checkbox-2" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                     <td>
			                      	<Link to="/solicitacoes/ver-amostra/1">MND298D006</Link>
			                      </td>
			                      <td className="align-middle">PANalytical X'Pert PRO</td>
			                      <td>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando autorização">1</div>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando aprovação do Laboratório">2</div>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando confirmação da entrega da amostra">3</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Na fila do equipamento">4</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Em processo de análise">5</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Análise concluída. Aguardando recolhimento da amostra.">6</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Solicitação Finalizada">7</div>
			                      </td>
			                      <td>20/01/2018</td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
										<button data-toggle="tooltip" title="Passar para a próxima fase" className="btn btn-primary"><i className="fas fa-arrow-alt-circle-right"></i></button>
			                      		<Link to="/solicitacoes/editar/1" className="btn btn-info" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      		<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
									</div>
			                      </td>
			                    </tr>
			                    <tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-4" />
			                          <label htmlFor="checkbox-4" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>
			                      	<Link to="/solicitacoes/ver-amostra/1">MND298D007</Link>
			                      </td>
			                      <td className="align-middle">PANalytical X'Pert PRO</td>
			                      <td>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando autorização">1</div>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando aprovação do Laboratório">2</div>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando confirmação da entrega da amostra">3</div>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Na fila do equipamento">4</div>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Em processo de análise">5</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Análise concluída. Aguardando recolhimento da amostra.">6</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Solicitação Finalizada">7</div>
			                      </td>
			                      <td>20/01/2018</td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
										<button data-toggle="tooltip" title="Passar para a próxima fase" className="btn btn-primary"><i className="fas fa-arrow-alt-circle-right"></i></button>
			                      		<Link to="/solicitacoes/editar/1" className="btn btn-info" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      		<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
									</div>
			                      </td>
			                    </tr>
			                	*/}
			                  </tbody>
			                </table>
			              </div>
			            </div>
					      <div className="card-footer text-right">
					        {this.renderPaginate()}
					      </div>
			          </div>
			        </div>
			    </div>
			</Main>
		);
	}
}
