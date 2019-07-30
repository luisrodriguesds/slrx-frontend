import React from 'react';

import Main from '../../components/template/Main';


export default class addEquipment extends React.Component {
	
	render() {
		return (
			<Main title="Cadastrar Equipamento">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
							<div className="card">
					        	<form className="needs-validation" id="" noValidate>
						        	<div className="card-header">
						        		<h4>Cadastrar Equipamento</h4>
						          	</div>
						        	<div className="card-body">
						        		<div className="form-group">
						            		<label>Nome</label>
						            		<input type="text" className="form-control" required />
						            		<div className="invalid-feedback">
						                		Como? Não entendi.
						              		</div>
						            	</div>
						            	<div className="form-group">
						            		<label>Tipo</label>
						            		<select className="form-control" required>
						                        <option value="">Selecione o tipo de equipamento ...</option>
						                        <option value="drx">DRX - Difratômetro de Raios-X</option>
						                        <option value="frx">FRX - Espectômetro de Fluorescência de Raios-X</option>
						                    </select>
						            		<div className="invalid-feedback">
						                		Como? Não entendi.
						              		</div>
						            	</div>
						            	<div className="form-group">
						            		<label>Tubo</label>
						            		<select className="form-control" required>
						                        <option value="">Selecione o tipo de tubo ...</option>
						                        <option value="Co">Co - Cobalto</option>
						                        <option value="Cu">Cu - Cobre</option>
						                        <option value="Pd">Pd - Paládio</option>
						                        <option value="Rh">Rh - Rhódio</option>
						                    </select>
						            		<div className="invalid-feedback">
						                		Como? Não entendi.
						              		</div>
						            	</div>
						            	<div className="form-group">
					                      <div className="control-label">Habilitado</div>
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
					                    </div>
					                    <div className="form-group mb-0">
							              <label>Observação</label>
							              <textarea className="form-control" defaultValue={""} />
							            </div>
						           	</div>
						           	<div className="card-footer text-right">
						            	<button className="btn btn-primary">Salvar</button>
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
