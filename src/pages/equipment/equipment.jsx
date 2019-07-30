import React from 'react';
import {Link} from 'react-router-dom';

import Main from '../../components/template/Main';

export default class equipment extends React.Component {

	render() {
		return (
			<Main title="Equipamentos">
				 <div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Equipamentos</h4>
			              <div className="card-header-form">
			                <div className="option-group">
			                	<Link to="/equipamentos/cadastro" title="Cadastrar" className="btn btn-primary ml-1"><i class="fas fa-plus"></i></Link>
				            	<button data-toggle="tooltip" title="Excluir" className="btn btn-danger"><i class="fas fa-trash"></i></button>
			                </div>
			                <form>
			                  <div className="input-group">
			                    <input type="text" className="form-control" placeholder="Search" />
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
			                      <th>Cadastrado por</th>
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
			                      <td>Rigaku DMAXB</td>
			                      <td className="align-middle">DRX</td>
			                      <td>
			                        <img alt="image" src="assets/img/avatar/avatar-5.png" className="rounded-circle" width={35} data-toggle="tooltip" title="Wildan Ahdian" />
			                      </td>
			                      <td>2018-01-20</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div class="btn-group" role="group" aria-label="Exemplo básico">
			                      		<button className="btn btn-info"> <i className="fas fa-edit"></i> </button>
			                      		<button className="btn btn-danger"> <i className="fas fa-trash"></i> </button>
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
			                      <td>PANalytical X'Pert PRO</td>
			                      <td className="align-middle">DRX</td>
			                      <td>
			                        <img alt="image" src="assets/img/avatar/avatar-4.png" className="rounded-circle" width={35} data-toggle="tooltip" title="Bagus Dwi Cahya" />
			                      </td>
			                      <td>2018-04-10</td>
			                      <td><div className="badge badge-danger">Indisponível</div></td>
			                      <td>
								  	<div class="btn-group" role="group" aria-label="Exemplo básico">
			                      		<button className="btn btn-info"> <i className="fas fa-edit"></i> </button>
			                      		<button className="btn btn-danger"> <i className="fas fa-trash"></i> </button>
									</div>
			                      </td>
			                    </tr>
			                    <tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-3" />
			                          <label htmlFor="checkbox-3" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>Rigaku ZSX mini II</td>
			                      <td className="align-middle">FRX</td>
			                      <td>
			                        <img alt="image" src="assets/img/avatar/avatar-1.png" className="rounded-circle" width={35} data-toggle="tooltip" title="Rizal Fakhri" />
			                      </td>
			                      <td>2018-01-29</td>
			                      <td><div className="badge badge-danger">Indisponível</div></td>
			                      <td>
								  	<div class="btn-group" role="group" aria-label="Exemplo básico">
			                      		<button className="btn btn-info"> <i className="fas fa-edit"></i> </button>
			                      		<button className="btn btn-danger"> <i className="fas fa-trash"></i> </button>
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
			                      <td>PANalytical AxiosmAX - IPDI</td>
			                      <td className="align-middle">FRX</td>
			                      <td>
			                        <img alt="image" src="assets/img/avatar/avatar-4.png" className="rounded-circle" width={35} data-toggle="tooltip" title="Yudi Nawawi" />
			                      </td>
			                      <td>2018-01-16</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div class="btn-group" role="group" aria-label="Exemplo básico">
			                      		<button className="btn btn-info"> <i className="fas fa-edit"></i> </button>
			                      		<button className="btn btn-danger"> <i className="fas fa-trash"></i> </button>
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
