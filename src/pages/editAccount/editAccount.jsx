import React from 'react';

import Main from '../../components/template/Main';

export default class editAccount extends React.Component {


	render() {
		return (
			<Main title="Editar Conta">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
						<div className="card">
					        <form className="needs-validation" id="" noValidate>
					          <div className="card-header">
					            <h4>Editar Conta</h4>
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
