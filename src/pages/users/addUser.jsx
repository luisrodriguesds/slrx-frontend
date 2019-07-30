import React from 'react';

import Main from '../../components/template/Main';

export default class addUser extends React.Component {

	render() {
		return (
			<Main title="Cadaastrar Usuário">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
						<div className="card">
					        <form className="needs-validation" id="" novalidate>
					          <div className="card-header">
					            <h4>Cadaastrar Usuário</h4>
					          </div>
					          <div className="card-body">
					            <div className="form-group">
					              <label>Nome Completo</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>CPF</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
				            		<label>Sexo</label>
				            		<select className="form-control" required>
				                        <option value="">Selecione o sexo do usuário ...</option>
				                        <option value="1">Masculino</option>
				                        <option value="2">Femino</option>
				                    </select>
				            		<div className="invalid-feedback">
				                		Como? Não entendi.
				              		</div>
				            	</div>

					            <div className="form-group">
					              <label>Email</label>
					              <input type="email" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Email Alternativo</label>
					              <input type="email" className="form-control" />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Contato</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Estato</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Cidade</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Departamento</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Laboratório</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Área de Pesquisa</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Instituição de Ensino</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div class="form-divider">Sistema</div>
					            <div className="form-group">
			                      <div className="control-label">Permissão de Envio de Amostra</div>
			                      <div className="custom-switches-stacked mt-2">
			                        <label className="custom-switch">
			                          <input type="checkbox" name="per_drx" value="1" className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">DRX</span>
			                        </label>
			                        <label className="custom-switch">
			                          <input type="checkbox" name="per_frx" value="1" className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">FRX</span>
			                        </label>
			                      </div>
			                    </div>
			                    <div className="form-group">
					              <label>Limite de Envio de Amostra</label>
					              <input type="number" className="form-control" min="0" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
				            		<label>Tipo</label>
				            		<select className="form-control" required>
				                        <option value="">Selecione o tipo de usuário ...</option>
				                        <option value="1">Aluno</option>
				                        <option value="2">Professor</option>
				                        <option value="3">Empresa</option>
				                        <option value="5">Operador</option>
				                        <option value="6">Gerente</option>
				                    </select>
				            		<div className="invalid-feedback">
				                		Como? Não entendi.
				              		</div>
				            	</div>
				            	<div class="form-group">
			                      <label>Associar (Caso seja aluno ou Empresa)</label>
			                      <select class="form-control select2">
			                        <option>Selecione o Professor Responsável ...</option>
			                        <option>Option 2</option>
			                        <option>Option 3</option>
			                      </select>
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
