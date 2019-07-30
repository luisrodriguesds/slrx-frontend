import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router';

export default class Public extends Component {
    renderIncio(){

        return (
            
            <div className="main-wrapper container">
                <div className="mt-5"></div>
                <div className="row">
		          <div className="col-lg-8 col-md-12 col-12 col-sm-12 order-2 order-sm-2 order-md-1 order-lg-1">
		            <div className="card">
		              <div className="card-header">
		                <h4>Medida DRX em tempo Real</h4>
		              </div>
		              <div className="card-body">
		                {/* <canvas id="myChart" height={382} /> */}
		                <iframe src="http://csd.fisica.ufc.br:8080/iframe" height="452" frameborder="0" style={{border:0, width:"100%"}} allowfullscreen=""></iframe>
		              </div>
		            </div>
		          </div>
		          <div className="col-lg-4 col-md-12 col-12 col-sm-12 order-1 order-sm-1 order-md-2 order-lg-2">
                    <div className="card" id="sample-login">
                        <form>
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body pb-0">
                            <p className="text-muted">Click login to change the card to progress mode.</p>
                            <div className="form-group">
                            <label>Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-envelope" />
                                </div>
                                </div>
                                <input type="text" className="form-control" placeholder="Email" />
                            </div>
                            </div>
                            <div className="form-group">
                            <label>Senha</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-lock" />
                                </div>
                                </div>
                                <input type="password" className="form-control" placeholder="Senha" />
                            </div>
                            </div>
                            <div className="form-group mb-0">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" name="remember" className="custom-control-input" id="remember-me" />
                                <label className="custom-control-label" htmlFor="remember-me">Lembrar-se</label>
                            </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" onclick="$.cardProgress('#sample-login', {dismiss: true,onDismiss: function() {alert('Dismissed :)')}});return false;" className="btn btn-primary">Login</button>
                            <a href="#" className="ml-2">Cadastre-se</a>
                            <a href="#" className="ml-2">Esqueci Minha Senha</a>
                        </div>
                        </form>
                    </div>
                  </div>
                </div>
      	</div>
        );
    }

  render() {
    return (
        <Switch>
    	    <Route exact path='/' component={() => this.renderIncio()} />
    	    <Route exact path='/inicio' component={() => <h1>Início</h1>} />
    	    <Route exact path='/404' component={() => <h1>404</h1>} />
        	<Redirect from="*" to='/404' />
        </Switch>
    );
  }
}
