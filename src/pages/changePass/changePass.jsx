import React from 'react';

import Main from '../../components/template/Main';

export default class changePass extends React.Component {

	render() {
		return (
			<Main title="Alterar Senha">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-5">
							<div className="card">
					        <form className="needs-validation" id="" noValidate>
					          <div className="card-header">
					            <h4>Alterar Senha</h4>
					          </div>
					          <div className="card-body">
					            <div className="form-group">
					              <label>Senha atual</label>
					              <input type="password" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Nova senha</label>
					              <input type="password" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Confirmar nova senha</label>
					              <input type="password" className="form-control" required />
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
						</div>
					</div>
				</div>
			</Main>
		);
	}
}
