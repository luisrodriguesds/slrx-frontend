import React from 'react';
import {Link} from 'react-router-dom';

import Main from '../../components/template/Main';

import Avatar from '../../assets/img/avatar/avatar-1.png';

export default class usersProfile extends React.Component {

	render() {
		return (
			<Main title="Perfil do Usuário">
				<div className="row">
					<div className="col-12 col-sm-12 col-lg-7">

					  <div className="card profile-widget">
				        <div className="profile-widget-header">                     
				          <img alt="image" src={Avatar} className="rounded-circle profile-widget-picture" />
				          <div className="profile-widget-items">
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Total de Amostras</div>
				              <div className="profile-widget-item-value">187</div>
				            </div>
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Amostras Analisadas</div>
				              <div className="profile-widget-item-value">45</div>
				            </div>
				            <div className="profile-widget-item">
				              <div className="profile-widget-item-label">Amostras Pendentes</div>
				              <div className="profile-widget-item-value">0</div>
				            </div>
				          </div>
				        </div>
				        <div className="profile-widget-description pb-0">
				          <div className="profile-widget-name">Luis Rodrigues <div className="text-muted d-inline font-weight-normal"><div className="slash" /> Graduando <div className="slash" /> Laboratório de Raio X</div> </div>
				          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				            consequat.</p>
				        </div>
				        <div className="card-footer text-center pt-0">
				          
				        </div>
				      </div>
				      <div className="card">
			            <div className="card-header">
			              <h4>Amostras</h4>
			              <div className="card-header-form">
			                <div className="option-group">
			                	<Link to="/usuarios/cadastro" title="Cadastrar" className="btn btn-primary ml-1 mr-1"><i className="fas fa-plus"></i></Link>
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
			                  <tbody><tr>
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
			                      	<Link to="/usuarios/ver-perfil/1">MND298D005</Link>
			                      </td>
			                      <td className="align-middle">PANalytical X'Pert PRO</td>
			                      <td>
			                      	{/*<div className="badge badge-success" data-toggle="tooltip" title="Aguardando autorização">1</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Aguardando aprovação do Laboratório">2</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Aguardando confirmação da entrega da amostra">3</div>*/}
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Na fila do equipamento">4</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Em processo de análise">5</div>
			                      	{/*<div className="badge badge-danger" data-toggle="tooltip" title="Análise concluída. Aguardando recolhimento da amostra.">6</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Solicitação Finalizada">7</div>*/}
			                      </td>
			                      <td>20/01/2018</td>
			                      <td>
			                      	<Link to="/usuarios/editar/1" className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      	<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
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
			                      	<Link to="/usuarios/ver-perfil/1">MND298D006</Link>
			                      </td>
			                      <td className="align-middle">PANalytical X'Pert PRO</td>
			                      <td>
			                      	{/*<div className="badge badge-success" data-toggle="tooltip" title="Aguardando autorização">1</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Aguardando aprovação do Laboratório">2</div>*/}
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando confirmação da entrega da amostra">3</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Na fila do equipamento">4</div>
			                      	{/*<div className="badge badge-danger" data-toggle="tooltip" title="Em processo de análise">5</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Análise concluída. Aguardando recolhimento da amostra.">6</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Solicitação Finalizada">7</div>*/}
			                      </td>
			                      <td>20/01/2018</td>
			                      <td>
			                      	<Link to="/usuarios/editar/1" className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      	<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
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
			                      	<Link to="/usuarios/ver-perfil/1">MND298D007</Link>
			                      </td>
			                      <td className="align-middle">PANalytical X'Pert PRO</td>
			                      <td>
			                      	{/*<div className="badge badge-success" data-toggle="tooltip" title="Aguardando autorização">1</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Aguardando aprovação do Laboratório">2</div>*/}
			                      	<div className="badge badge-success" data-toggle="tooltip" title="Aguardando confirmação da entrega da amostra">3</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Na fila do equipamento">4</div>
			                      	{/*<div className="badge badge-danger" data-toggle="tooltip" title="Em processo de análise">5</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Análise concluída. Aguardando recolhimento da amostra.">6</div>
			                      	<div className="badge badge-danger" data-toggle="tooltip" title="Solicitação Finalizada">7</div>*/}
			                      </td>
			                      <td>20/01/2018</td>
			                      <td>
			                      	<Link to="/usuarios/editar/1" className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      	<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
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
					<div className="col-12 col-sm-12 col-lg-5">
						 <div className="card">
					        <form className="needs-validation" id="" noValidate>
					          <div className="card-header">
					            <h4>Editar Perfil</h4>
					          </div>
					          <div className="card-body">
					            <div className="form-group">
					              <label>Como Gostaria de ser chamado?</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					          {/*<div className="valid-feedback">
					                Good job!
					              </div>*/}
					            </div>
					            <div className="form-group">
					              <label>Escolha uma foto de perfil</label>
					              <div className="fallback">
			                        <input name="file" type="file" required />
			                      </div>
					              <div className="invalid-feedback">
					                Qual sua foto?
					              </div>
					            </div>
					            <div className="form-group mb-0">
					              <label>Fale um pouco sobre você</label>
					              <textarea className="form-control" required defaultValue={""} />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					          </div>
					          <div className="card-footer text-right">
					            <button className="btn btn-primary">Salvar</button>
					          </div>
					        </form>
					      </div>
					      <div className="card">
				              <div className="card-header">
				                <h4 className="d-inline">Alunos</h4>
				                <div className="card-header-action">
				                  <a href="#" className="btn btn-primary">Ver todas</a>
				                </div>
				              </div>
				              <div className="card-body">             
				                <ul className="list-unstyled list-unstyled-border">
				                  <li className="media">
				                    <div className="custom-control custom-checkbox">
				                      <input type="checkbox" className="custom-control-input" id="cbx-1" />
				                      <label className="custom-control-label" htmlFor="cbx-1" />
				                    </div>
				                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-4.png" alt="avatar" />
				                    <div className="media-body">
				                      <div className="badge badge-pill badge-danger mb-1 float-right">Incompleto</div>
				                      <h6 className="media-title"><a href="#">Redesign header</a></h6>
				                      <div className="text-small text-muted">Alfa Zulkarnain <div className="bullet" /> <span className="text-primary">Now</span></div>
				                    </div>
				                  </li>
				                  <li className="media">
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
				                  </li>
				                </ul>
				              </div>
				              <div className="card-footer pt-0">
				                {/*<button className="btn btn-primary">Aprovar</button>*/}
				              </div>
				            </div>
					</div>
				</div>
			</Main>
		);
	}
}
