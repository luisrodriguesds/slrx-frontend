import React from 'react';
import {Link} from 'react-router-dom';
import store from '../../store/store';

import Main from '../../components/template/Main';

import {getAllEquipment, deleteEquipment} from '../../services/api';

export default class equipment extends React.Component {
	state = {
		equipments:[],
		user:{access_level_slug:''}
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

		const equipment = await getAllEquipment()
		this.setState({equipments:equipment.data})
	}

	excluir = async (id) => {
		if (window.confirm("Deseja realmente exluir este equipamento?")) {
			try {
				const res = await deleteEquipment(id)
				if (res.data.error == true) {
					window.scroll(0,0);
					alert(`${res.data.message}`);       			
				}else{
					alert(`${res.data.message}`);
					const equipment = await getAllEquipment()
					this.setState({equipments:equipment.data})
				}
			} catch (error) {
				
			}
		}
	}

	render() {
		const {equipments, user} = this.state
		return (
			<Main title="Equipamentos">
				 <div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Equipamentos</h4>
			              <div className="card-header-form">
			                <div className="option-group">
			                	<Link to="/equipamentos/cadastro" title="Cadastrar" className="btn btn-primary ml-1"><i className="fas fa-plus"></i></Link>
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
			                      <th>Data do Cadastro</th>
			                      <th>Status</th>

			                      {user.access_level_slug == 'administrador' && <th>Ações</th>}
			                    </tr>
								{equipments.map((v,i) => (

									<tr key={i}>
										<td className="p-0 text-center">
											<div className="custom-checkbox custom-control">
											<input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id={`checkbox-${i}`} />
											<label htmlFor={`checkbox-${i}`} className="custom-control-label">&nbsp;</label>
											</div>
										</td>
										<td> <Link to={`/equipamentos/editar/${v.id}`}>{v.name}</Link> </td>
										<td className="align-middle">{v.type}</td>
										<td>{new Date(v.created_at).toLocaleString('pt-BR')}</td>
										<td>
											{v.status == 0 ? <div className="badge badge-danger">Indisponível</div> : <div className="badge badge-success">Disponível</div>}
										</td>

										{user.access_level_slug == 'administrador' && <td>
											<div className="btn-group" role="group" aria-label="Exemplo básico">
												<Link to={`/equipamentos/editar/${v.id}`} className="btn btn-info" title="Editar"> <i className="fas fa-edit"></i> </Link>
												<button className="btn btn-danger" onClick={() => this.excluir(v.id)}> <i className="fas fa-trash"></i> </button>
											</div>
										</td>}

									</tr>
								))}
							  </tbody>
			                </table>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			</Main>
		);
	}
}
