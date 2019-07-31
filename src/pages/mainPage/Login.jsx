import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {
  render() {
    return (
        <div className="card" id="sample-login">
            <form method="post">
            <div className="card-header">
                <h4>Sistema LRX - Login</h4>
            </div>
            <div className="card-body pb-0">
                {/* <p className="text-muted">Click login to change the card to progress mode.</p> */}
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
            {/* onClick="$.cardProgress('#sample-login', {dismiss: true,onDismiss: function() {alert('Dismissed :)')}});return false;" */}
                <div className="button-login-footer">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/cadastro" className="ml-2" title="Alunos, Professores, Operadores, Empresa e Funcionários">Cadastre-se</Link>
                    <Link to="/recuperar-senha" className="ml-2">Esqueci Minha Senha</Link>
                </div>
            </div>
            </form>
        </div>

    
        );
  }
}
