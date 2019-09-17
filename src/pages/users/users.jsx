import React from 'react';
import {Link} from 'react-router-dom';

import Main from '../../components/template/Main';

export default class users extends React.Component {

	render() {
		return (
			<Main title="Usuários">
				 <div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Usuários</h4>
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
			                      <th>Nome</th>
			                      <th>Tipo</th>
			                      <th>Email</th>
			                      <th>Data do Cadastro</th>
			                      <th>Status</th>
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
			                      	<Link to="/usuarios/ver-perfil/1">Adonay Rodrigues Loiola</Link>
			                      </td>
			                      <td className="align-middle">Professor</td>
			                      <td>adonay@ufc.br</td>
			                      <td>2018-01-20</td>
			                      <td><div className="badge badge-success">Ativo</div></td>
			                      <td>
			                      	<Link to="/usuarios/editar/1" className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      	<Link to="/solicitacoes/filtro/1" className="btn btn-dark mr-1" title="Ver Amostras"> <i className="fas fa-vial"></i> </Link>
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
			                      	<Link to="/usuarios/ver-perfil/1">Adriana Correia</Link>
			                      </td>
			                      <td className="align-middle">Professor</td>
			                      <td>adriana@ufc.br</td>
			                      <td>2018-04-10</td>
			                      <td><div className="badge badge-danger">Inativo</div></td>
			                      <td>
			                      	<Link to="/usuarios/editar/1" className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      	<Link to="/solicitacoes/filtro/1" className="btn btn-dark mr-1" title="Ver Amostras"> <i className="fas fa-vial"></i> </Link>
			                      	<button className="btn btn-danger" title="Excluir"> <i className="fas fa-trash"></i> </button>
			                      </td>
			                    </tr>
			                    <tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-3" />
			                          <label htmlFor="checkbox-3" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>
			                      	<Link to="/usuarios/ver-perfil/1">Airton de Sá Brandim</Link>
			                      </td>
			                      <td className="align-middle">Operador</td>
			                      <td>brandim@ifpi.edu.br</td>
			                      <td>2018-01-29</td>
			                      <td><div className="badge badge-success">Ativo</div></td>
			                      <td>
			                      	<Link to="/usuarios/editar/1" className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      	<Link to="/solicitacoes/filtro/1" className="btn btn-dark mr-1" title="Ver Amostras"> <i className="fas fa-vial"></i> </Link>
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
			                      	<Link to="/usuarios/ver-perfil/1">Alberto Adriano Cavalheiro</Link>
			                      </td>
			                      <td className="align-middle">Aluno</td>
			                      <td>albecava@uems.br</td>
			                      <td>2018-01-16</td>
			                      <td><div className="badge badge-success">Ativo</div></td>
			                      <td>
			                      	<Link to="/usuarios/editar/1" className="btn btn-info mr-1" title="Editar"> <i className="fas fa-edit"></i> </Link>
			                      	<Link to="/solicitacoes/filtro/1" className="btn btn-dark mr-1" title="Ver Amostras"> <i className="fas fa-vial"></i> </Link>
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
			          </div>
			        </div>
			      </div>
			</Main>
		);
	}
}
