import React from 'react';
import {Link} from 'react-router-dom';

import {getUsefulFiles, deleteUsefulFiles} from '../../services/api';


import Main from '../../components/template/Main';

import store from '../../store/store';

export default class files extends React.Component {
	state = {
		user:{},
		files:{data:[], lastPage:'', page:1, total:'', perPage:''},
		selectFiles:[],
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
		try {
			const res = await getUsefulFiles();
			if (res.data.error == true) {
				alert(`${res.data.message}`);
				return false;
			}else{
				this.setState({files:res.data})
				console.log(this.state)
			}
		} catch (error) {
			
		}
	}

	handleDelete = async (id) => {
		if (!window.confirm('Deseje realmente excluir este arquivo?')) {
			return false;
		}
		try {
			const res = await deleteUsefulFiles(id);
			if (res.data.error == true) {
				alert(`${res.data.message}`);
			}else{
				this.setState({data:[], lastPage:'', page:1, total:'', perPage:''});
				alert(`${res.data.message}`);
				const update = await getUsefulFiles();
				this.setState({files:update.data})
			}
		} catch (error) {
			
		}
	}

	render() {
		const {files} = this.state;
		return (
			<Main title="Arquivos Úteis	">
				 <div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Arquivos</h4>
			              <div className="card-header-form" style={{width:'100%'}}>
							<div className="row" style={{width:'100%'}}>
								<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-left p-0">
									<div className="option-group">
										{ this.state.user.permission == true && <Link to="/arquivos-uteis/enviar" title="Cadastrar" className="btn btn-primary ml-1"><i className="fas fa-plus"></i></Link> }
										{ this.state.user.permission == true && <button data-toggle="tooltip" title="Excluir" className="btn btn-danger"><i className="fas fa-trash"></i></button> }
									</div>
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right">
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
			                      <th>Descrição</th>
								  <th>Status</th>
			                      <th>Ações</th>
			                    </tr>
								{files.data.length != 0 && files.data.map((file, i) => (
									<tr key={i}>
										<td className="p-0 text-center">
											<div className="custom-checkbox custom-control">
											<input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id={`checkbox-${i}`} />
											<label htmlFor={`checkbox-${i}`} className="custom-control-label">&nbsp;</label>
											</div>
										</td>
										<td>{file.name}</td>
										<td>{file.description}</td>
										<td>
											{file.status == 1 && <div className="badge badge-success">Disponível</div>}
											{file.status == 0 && <div className="badge badge-danger">Indisponível</div>}
										</td>
										<td>
											<div className="btn-group" role="group" aria-label="Exemplo básico">
												{this.state.user.permission == false && <a href={file.status == 1 && `${file.link}`} target="_blank" className="btn btn-warning" title="Donwload"> Download </a>}
												{this.state.user.permission == true && <a href={file.status == 1 && `${file.link}`} target="_blank" className="btn btn-warning" title="Donwload"> <i className="fas fa-arrow-alt-circle-down"></i> </a>}
												{this.state.user.permission == true && <Link to={`/arquivos-uteis/editar/${file.id}`} className="btn btn-info" title="Editar"><i className="fas fa-edit"></i> </Link>}
												{this.state.user.permission == true && <button className="btn btn-danger" onClick={() => this.handleDelete(file.id)} title="Excluir"> <i className="fas fa-trash"></i> </button>}

											</div>
										</td>
									</tr>

								))}

			                    {/* <tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-00" />
			                          <label htmlFor="checkbox-00" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>Z00310.RAW</td>
								  <td>LaB6, Tubo de cobre, fenda 1o, feito na data de 05/08/2015 Rigaku DMAXB.</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
			                      		
			                      		<a href="https://drive.google.com/open?id=1ECVvhKHMqdksXW3mS4vFxfYa-xokrVyq" target="_blank" className="btn btn-warning"> Download </a>
									</div>
			                      </td>
			                    </tr>
			                    <tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-0" />
			                          <label htmlFor="checkbox-0" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>Xpert_366.zip</td>
								  <td>LaB6, Tubo de cobre, fenda 1/2, feito na data de 02/05/2015.</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
			                      		
			                      		<a href="https://drive.google.com/open?id=1pfAacXTjwpsBoAyKGzIkjeWulZhuy1Q_" target="_blank" className="btn btn-warning"> Download </a>
									</div>
			                      </td>
			                    </tr>

								<tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-1" />
			                          <label htmlFor="checkbox-1" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>Xpert_0131_LaB6.zip</td>
								  <td>LaB6, Tubo de cobalto, fenda de 1/8, Monocromador Hibrido (espelho+monocromador Ge) feito na data de 13/03/2018.</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
			                      		
			                      		<a href="https://drive.google.com/open?id=1qC7fLL8PKml3QgpAakgE1goYu2uCmTpD" target="_blank" className="btn btn-warning"> Download </a>
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
			                      <td>Xpert_456 - 1-4.zip</td>
								  <td>LaB6, Tubo de cobalto, fenda de 1/4, Monocromador Hibrido (espelho+monocromador Ge) feito na data de 5/03/2016.</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
			                      		
			                      		<a href="https://drive.google.com/open?id=1w7FwLiN6kRZrTt73SOeUAJAYJkRrf6GJ" target="_blank" className="btn btn-warning"> Download </a>
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
			                      <td>Fenda-1_4.rar</td>
								  <td>LaB6, Tubo de cobalto, fenda de 1/4, Monocromador Hibrido (espelho+monocromador Ge) feito na data de 5/03/2016.</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
			                      		
			                      		<a href="https://drive.google.com/open?id=1cfyfI7GARh6TNynfb46cWGwUqGQ1vxn8" target="_blank" className="btn btn-warning"> Download </a>
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
			                      <td>Xpert_0250.zip</td>
								  <td>Arquivo de difratometria do Hexaboreto de Lantânio (LaB6); 1/4° de abertura da fenda (um quarto de grau). Feito na data de 12/02/2019.</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
			                      		
			                      		<a href="https://drive.google.com/open?id=1EK8UDFprusmOpgLa-C4RAfUobKmAL-bC" target="_blank" className="btn btn-warning"> Download </a>
									</div>
			                      </td>
			                    </tr>

								<tr>
			                      <td className="p-0 text-center">
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-5" />
			                          <label htmlFor="checkbox-5" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </td>
			                      <td>Xpert_0132_Si.zip</td>
								  <td>Silício, Tubo de cobalto, fenda de 1/8, Monocromador Hibrido (espelho+monocromador Ge), feito na data de 13/03/2018.</td>
			                      <td><div className="badge badge-success">Disponível</div></td>
			                      <td>
								  	<div className="btn-group" role="group" aria-label="Exemplo básico">
			                      		
			                      		<a href="https://drive.google.com/open?id=1uWeLT-wdzB9LHpznOGNySfL6StZkJ5kE" target="_blank" className="btn btn-warning"> Download </a>
									</div>
			                      </td>
			                    </tr> */}

			                  </tbody>
			                </table>
			              </div>
			            </div>
					      {/* <div className="card-footer text-right">
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
					      </div> */}
			          </div>
			        </div>
			      </div>
			</Main>
		);
	}
}
