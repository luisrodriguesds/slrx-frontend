import React from 'react';

import Main from '../../components/template/Main';

export default class profile extends React.Component {

	render() {
		return (
			<Main title="Perfil">
				<div className="row">
					<div className="col-12 col-sm-12 col-lg-7">
					  <div className="card profile-widget">
				        <div className="profile-widget-header">                     
				          <img alt="image" src="assets/img/avatar/avatar-1.png" className="rounded-circle profile-widget-picture" />
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
					</div>
				</div>
			</Main>
		);
	}
}
