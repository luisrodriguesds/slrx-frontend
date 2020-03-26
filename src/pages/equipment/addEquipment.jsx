import React from 'react';

import Main from '../../components/template/Main';
import store from '../../store/store';

import {showEquipment, putEquipment, postEquipment} from '../../services/api';


export default class addEquipment extends React.Component {
	state = {
		data:{status:1},
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

		const {id} = this.props.match.params
		if (id != null ) {
			try {
				const equipment = await showEquipment(id)
				this.setState({data:equipment.data})
				console.log(equipment)
			} catch (error) {
				
			}
		}
		
	}
	
	_onChange = (e) => {
		let value = e.target.value;
		const data = {...this.state.data};
		data[e.target.name] = value;
		this.setState({data});
	    console.log(this.state);
	  }

	onSubmit = async e => {
		e.preventDefault();
		const {id} = this.props.match.params
		try {
				let res
				if (id != null) {
					res = await putEquipment(id, {...this.state.data})
				}else{
					res = await postEquipment({...this.state.data})
				}
				if (res.data.error == true) {
					window.scroll(0,0);
					alert(`${res.data.message}`);       			
				}else{
					alert(`${res.data.message}`);
					this.props.history.push("/equipamentos");
				}
			} catch (error) {
				this.props.history.push("/equipamentos");
			}
	}
	
	  
	render() {
		const {data, user} = this.state
		return (
			<Main title="Cadastrar Equipamento">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
							<div className="card">
					        	<form className="needs-validation" id="" onSubmit={this.onSubmit} method="post" noValidate>
						        	<div className="card-header">
						        		<h4>Cadastrar Equipamento</h4>
						          	</div>
						        	<div className="card-body">
						        		<div className="form-group">
						            		<label>Nome</label>
						            		<input type="text" defaultValue={data && data.name} name="name" onChange={(e) => this._onChange(e)} className="form-control" disabled={user.access_level_slug == 'administrador' ? false : true} required />
						            		<div className="invalid-feedback">
						                		Como? Não entendi.
						              		</div>
						            	</div>
						            	<div className="form-group">
						            		<label>Tipo</label>
						            		<select className="form-control" value={data && data.type} name="type" onChange={(e) => this._onChange(e)} disabled={user.access_level_slug == 'administrador' ? false : true} required>
						                        <option value="">Selecione o tipo de equipamento ...</option>
						                        <option value="DRX">DRX - Difratômetro de Raios-X</option>
						                        <option value="FRX">FRX - Espectômetro de Fluorescência de Raios-X</option>
						                    </select>
						            		<div className="invalid-feedback">
						                		Como? Não entendi.
						              		</div>
						            	</div>
						            	<div className="form-group">
						            		<label>Tubo</label>
						            		<select className="form-control" value={data && data.tube} name="tube" onChange={(e) => this._onChange(e)} disabled={user.access_level_slug == 'administrador' ? false : true} required>
						                        <option value="">Selecione o tipo de tubo ...</option>
						                        <option value="CO">Co - Cobalto</option>
						                        <option value="CU">Cu - Cobre</option>
						                        <option value="PD">Pd - Paládio</option>
						                        <option value="RH">Rh - Rhódio</option>
						                    </select>
						            		<div className="invalid-feedback">
						                		Como? Não entendi.
						              		</div>
						            	</div>
						            	<div className="form-group">
					                      <div className="control-label">Habilitado</div>
										  	<select className="form-control" value={data && data.status} name="status" onChange={(e) => this._onChange(e)} disabled={user.access_level_slug == 'administrador' ? false : true} required>
						                        <option value={1}>Ativo</option>
						                        <option value={0}>Inativo</option>
						                    </select>
											{/*  
					                      <div className="custom-switches-stacked mt-2">
					                        <label className="custom-switch">
					                          <input type="radio" name="option" value="1" className="custom-switch-input" defaultChecked />
					                          <span className="custom-switch-indicator"></span>
					                          <span className="custom-switch-description">Sim</span>
					                        </label>
					                        <label className="custom-switch">
					                          <input type="radio" name="option" value="0" className="custom-switch-input" />
					                          <span className="custom-switch-indicator"></span>
					                          <span className="custom-switch-description">Não</span>
					                        </label>
					                      </div>
											*/}
					                    </div>
					                    <div className="form-group mb-0">
							              <label>Observação</label>
							              <textarea className="form-control" name="note" style={{height:'200px'}} disabled={user.access_level_slug == 'administrador' ? false : true} onChange={(e) => this._onChange(e)} value={data && data.note} />
							            </div>
						           	</div>
						           	<div className="card-footer text-right">
						            	<button className="btn btn-primary" disabled={user.access_level_slug == 'administrador' ? false : true}>Salvar</button>
						        	</div>
					        	</form>
					        </div>
						</div>
					</div>
				</div>
			</Main>
		);
	}
}
