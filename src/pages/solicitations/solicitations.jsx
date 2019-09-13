import React from 'react';
import {Link} from 'react-router-dom';

import {getUser, getSolicitation} from '../../services/api';

import Main from '../../components/template/Main';

export default class solicitations extends React.Component {
	state = {
		user:{},
		solicitations:{},
		status:[
			{number:1, descripiton:'Aguardando autorização'},
			{number:2, descripiton:'Aguardando aprovação do Laboratório'},
			{number:3, descripiton:'Aguardando confirmação da entrega da amostra'},
			{number:4, descripiton:'Na fila do equipamento'},
			{number:5, descripiton:'Em processo de análise'},
			{number:6, descripiton:'Análise concluída. Aguardando recolhimento da amostra'},
			{number:7, descripiton:'Solicitação Finalizada'},
		],
		loading:false,
	  	loadpage:true
	}

	async componentDidMount(){
		const user = await getUser();
		//Check if user is adm or oper to get all solicitations or this solicitations are they
		let solicitations = await getSolicitation();
		console.log(solicitations);
		// for (let i = 0; i < solicitations.data.data.length; i++) {
		// 	solicitations.data[i].check = false;
		// }

		this.setState({user:user.data.user, solicitations:solicitations.data})
		console.log(this.state);
	}

	render() {
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
			                    <input type="text" className="form-control" placeholder="Pesquisar" />
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
			                  <tbody>
								<tr>
									<th>
										<div className="custom-checkbox custom-control">
										<input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" className="custom-control-input" id="checkbox-all" />
										<label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
										</div>
									</th>
									<th>Código</th>
									<th>Equipamento</th>
									<th>Status</th>
									<th>Data da Solicitação</th>
									<th>Ações</th>
								</tr>
			                    <tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-1" />
			                          <label htmlFor="checkbox-1" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>
			                      	<Link to="/solicitacoes/ver-amostra/1">MND298D005</Link>
			                      </td>
			                      <td className="align-middle">PANalytical X'Pert PRO</td>
			                      <td>
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando autorização">1</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Aguardando aprovação do Laboratório">2</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Aguardando confirmação da entrega da amostra">3</div>
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
			                  </tbody>
			                </table>
			              </div>
			            </div>
					      <div className="card-footer text-right">
					        <nav className="d-inline-block">
					          <ul className="pagination mb-0">
					            <li className="page-item disabled">
					              <a className="page-link" href="#" tabIndex={-1}><i className="fas fa-chevron-left" /></a>
					            </li>
					            <li className="page-item active"><a className="page-link" href="#">1 <span className="sr-only">(current)</span></a></li>
					            <li className="page-item">
					              <a className="page-link" href="#">2</a>
					            </li>
					            <li className="page-item"><a className="page-link" href="#">3</a></li>
					            <li className="page-item">
					              <a className="page-link" href="#"><i className="fas fa-chevron-right" /></a>
					            </li>
					          </ul>
					        </nav>
					      </div>
			          </div>
			        </div>
			    </div>
			</Main>
		);
	}
}
