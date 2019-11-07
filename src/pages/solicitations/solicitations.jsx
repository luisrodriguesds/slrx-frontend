import React from 'react';
import {Link} from 'react-router-dom';

import store from '../../store/store';
import {filterhSolicitation, getSolicitation, searchSolicitation, destroySolicitation, destroyAllSolicitation, nextStepSolicitation, nextStepAllSolicitation} from '../../services/api';

import Main from '../../components/template/Main';
import LoadingPage from '../../components/events/LoadingPage';
import ModalSolicitation from '../../components/events/ModalSolicitationClass';

export default class solicitations extends React.Component {
	//SALVAR AS MARCAÇÕES 

	state = {
		user:{},
		solicitations:{data:[], lastPage:'', page:'', total:'', perPage:''},
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
		checkboxAll:false,
		filter:'Filtro',
		loading:false,
	  	loadpage:true
	}

	async componentDidMount(){
		//Sempre que precisar chamar o usuário logado, basta chamar o estado do redux, pois está sendo guardado nele.
		store.subscribe(() =>{
			this.setState({
				user:store.getState().user.user
			})
		});
		store.dispatch({
			type:'REQUEST_USER'
		});

		let res = await getSolicitation({page:1});
		let solicitations = res.data;
		if (res.data.data.length > 0) {
			this.setState({solicitations, loadpage:false})
		}else{
			this.setState({loadpage:false})
		}
	}

	handleSearch = async (e) => {
		const filter = e.target.value;
		const res = await searchSolicitation(filter);
		let solicitations = res.data;
		this.setState({solicitations});

		// console.log(res, filter);
	}

	handleFilter = async (filter) => {
		const res = await filterhSolicitation(filter);
		// console.log(res)
		this.setState({filter, solicitations:res.data});
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
	    	// console.log(selectSol);
    	}else{		
	    	selectSol.push(id);
		    this.setState({selectSol});
	    	// console.log(selectSol);
    	}
	}

	handleDelete = async (name) => {
		if (window.confirm("Você deseja realizar o cancelamento desta amostra?")) {
			try{
				const res = await destroySolicitation(name);
				if (res.data.error == true) {
					alert(`${res.data.message}`);
				}else{
					alert(`${res.data.message}`);

					let load = await getSolicitation({page:1});
					this.setState({solicitations:load.data, selectSol:[]});
				}
			}catch(error){
				// alert(`Algo Inesperado aconteceu, sua página será recarregada.`);
				//Recarregar a página aqui
				// console.log(error);
			}
		}
	}

	handleDeleteAll = async () => {
		if (this.state.selectSol.length == 0) {
			alert(`Você precisa selecionar alguma amostra.`);
		}else{
			if (window.confirm(`Você tem certeza que deseja cancelar as amostras selecionadas?`)) {
				await destroyAllSolicitation(this.state.selectSol);
				alert(`Amostras deletadas com sucesso`);
				window.location=window.location.href;

				const {page} = this.state.solicitations;
				let load = await getSolicitation({page});
				this.setState({solicitations:load.data, selectSol:[]});
				// console.log(this.state);
			}
		}
	}

	
	handlePaginate = async (page) => {
		try {
			let res = await getSolicitation({page});
			let solicitations = res.data;
			
			this.setState({solicitations});
			window.scroll(0,0);
			
		} catch (error) {
			alert(`Algo de errado aconteceu, contate o suporte técnico.`);
		}
	}

	handleNextStepAll = async () => {
		this.setState({loadpage:true});
		if (this.state.selectSol.length == 0) {
			alert(`Você precisa selecionar alguma amostra.`);
		}else{
			if (window.confirm(`Você tem certeza que deseja passar para a próxima fase as amostras selecionadas?`)) {
				try{
					const res = await nextStepAllSolicitation(this.state.selectSol);
					alert(`Amostras atualizadas com sucesso`);
					window.location=window.location.href;
					
				}catch(e){

				}
			}
		}
		this.setState({loadpage:false});
	}


	handleNextStep = async (id) => {
		this.setState({loadpage:true});
		if (window.confirm("Você deseja realizar a autorização dessa amostra?")) {
			try {
				const res = await nextStepSolicitation(id);
				if (res.data.error == true) {
					alert(`${res.data.message}`);
				}else{
					alert(`${res.data.message}`);
					const {page} = this.state.solicitations;
					let load = await getSolicitation({page});
					let solicitations = load.data;
					
					this.setState({solicitations});
				}
			} catch (error) {
				alert(`Algo de errado aconteceu, contate o suporte técnico.`);			
			}
		}
		this.setState({loadpage:false});
	}

	renderPaginate(){
		const {lastPage, page, total, perPage} = this.state.solicitations;
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
		let {solicitations} = this.state;
		return (

			<Main title="Solicitações">
				<div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Amostras</h4>
			              <div className="card-header-form">
							  <div className="row" style={{width:'100%'}}>
							  	<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-left p-0">
									

									<div className="option-group">
										{this.state.user.permission == true && 
								
											<div className="dropdown">
											<a href="#" className="dropdown-toggle btn btn-primary" data-toggle="dropdown">{this.state.filter}</a>
											<div className="dropdown-menu dropdown-menu-right">
												<button onClick={() => this.handleFilter('Filtro')} className="dropdown-item has-icon">Filtro</button>
												<button onClick={() => this.handleFilter('Abertas')} className="dropdown-item has-icon">Abertas</button>
												<button onClick={() => this.handleFilter('DRX')} className="dropdown-item has-icon">DRX</button>
												<button onClick={() => this.handleFilter('FRX')} className="dropdown-item has-icon">FRX</button>
												<button onClick={() => this.handleFilter('1')} className="dropdown-item has-icon">1</button>
												<button onClick={() => this.handleFilter('2')} className="dropdown-item has-icon">2</button>
												<button onClick={() => this.handleFilter('3')} className="dropdown-item has-icon">3</button>
												<button onClick={() => this.handleFilter('4')} className="dropdown-item has-icon">4</button>
												<button onClick={() => this.handleFilter('5')} className="dropdown-item has-icon">5</button>
												<button onClick={() => this.handleFilter('6')} className="dropdown-item has-icon">6</button>
												<button onClick={() => this.handleFilter('7')} className="dropdown-item has-icon">7</button>
											</div>
											</div>
										}
										<Link to="/solicitacoes/cadastro" title="Cadastrar" className="btn btn-primary ml-1 mr-1"><i className="fas fa-plus"></i></Link>
										{(this.state.user.permission || this.state.user.access_level_slug == 'professor') && <button data-toggle="tooltip" onClick={() => this.handleNextStepAll()} title="Passar todas para a próxima fase" className="btn btn-info mr-1"><i className="fas fa-arrow-alt-circle-right"></i></button>}
										<button data-toggle="tooltip" title="Cancelar" onClick={() => this.handleDeleteAll()} className="btn btn-danger mr-1"><i className="fas fa-trash"></i></button>
									</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right">
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
							  

							
			              </div>
			            </div>
			            <div className="card-body p-0">
						  <LoadingPage loading={this.state.loadpage} />

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
										<th>Equipamento</th>
										<th className="width-fixed">Status</th>
										<th>Data da Solicitação</th>
										<th>Ações</th>
									</tr>
			                	</thead>
			                  <tbody>
								
								{solicitations.data.map((solicitation, i) => (
								<tr key={i}>
			                      <td className="p-0 text-center">
			                      	<div className="custom-control custom-checkbox">
                                          <input type="checkbox" data-checkboxes="mygroup" onClick={() => this.handleCheckbox(solicitation.id)} className="custom-control-input" value={solicitation.id} name={`check-${i}`} id={`checkbox-${i}`} />
                                          <label className="custom-control-label" htmlFor={`checkbox-${i}`}>&nbsp;</label>
                                     </div>
			                      </td>
			                      <td className="weight">
			                      	<Link to={`/solicitacoes/ver-amostra/${solicitation.name}`}>{solicitation.name}</Link>
									{/* <ModalSolicitation solicitation={solicitation} user={this.state.user}>{solicitation.name}</ModalSolicitation> */}
								  </td>
			                      <td className="align-middle">{solicitation.equipment == null ? '' : solicitation.equipment.name}</td>
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
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
										{(this.state.user.permission || this.state.user.access_level_slug == 'professor') && <button data-toggle="tooltip" title="Passar para a próxima fase" onClick={() => this.handleNextStep(solicitation.id)} className="btn btn-info"><i className="fas fa-arrow-alt-circle-right"></i></button>}
			                      		<Link to={`/solicitacoes/editar/${solicitation.name}`} className="btn btn-warning" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      		<button className="btn btn-danger" title="Excluir" onClick={() => this.handleDelete(solicitation.name)}> <i className="fas fa-trash"></i> </button>
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
								  	({this.state.solicitations.data.length*(this.state.solicitations.page)}/{this.state.solicitations.total})
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
