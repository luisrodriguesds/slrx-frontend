import React from 'react';

import Logo from '../../assets/img/logo_lrx@2x.png';
import Main from './Main';

export default class forgotPass extends React.Component {
	

	render() {
		return (
			<Main>
	            <div className="container">
	                <div className="row justify-content-md-center mb-5">
	                    <div className="col-12 col-sm-12 col-lg-6">
		                    <div className="login-brand">
				              <img src={Logo} alt="logo" width="300" className="" />
				            </div>
	                        <div className="card card-primary">
	                            <div className="card-header">
	                                <h4>Forgot Password</h4>
	                            </div>
	                            <div className="card-body">
				                <p className="text-muted">Será enviado um email de recuperação de senha para o email informado</p>
				                <form method="POST">
				                  <div className="form-group">
				                    <label htmlFor="email">Email</label>
				                    <input id="email" type="email" className="form-control" name="email" tabIndex={1} required autoFocus />
				                  </div>

				                  <div className="form-group">
				                    <button type="submit" className="btn btn-primary btn-lg btn-block" tabIndex={1}>
				                      Enviar
				                    </button>
				                  </div>
				                </form>
				              </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </Main>
		);
	}
}
