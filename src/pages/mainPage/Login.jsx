import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Button from '../../components/events/LoadingButtom';
import api, {userLogin} from '../../services/api';
import { login } from "../../services/auth";
import { URL_BASE } from '../../services/routesBackend';

class Login extends Component {
    state = {
        data:{email:'', password:''},
        loading:false,
        error:''
    };

    _onChange = (e) => {
        let value = e.target.value;
        const data = {...this.state.data};
        data[e.target.name] = value;
        this.setState({data, error:''});
        
        console.log(this.state);
    }

    onSubmit = async e => {
        e.preventDefault();
        //Set loading
        this.setState({loading:true});
        setTimeout(() => {
            this.setState({loading:false});
        }, 1000);
        const auth = this.state.data;
        const res = await userLogin(auth);
        if (res.data.error == true) {
            this.setState({error:res.data.message});
        }else{
            this.setState({error:''});
            login(res.data.token);
            // this.props.history.push("/");
			window.location=window.location.href;    
        }
        
    }

  render() {
    return (
        <div className="card" id="sample-login">
            <form method="post" onSubmit={this.onSubmit}>
            <div className="card-header">
                <h4>Sistema LRX - Login</h4>
            </div>
            <div className="card-body pb-0">
                {/* <p className="text-muted">Click login to change the card to progress mode.</p> */}
                {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}
                <div className="form-group">
                <label>Email</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-envelope" />
                    </div>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => this._onChange(e)} name="email" placeholder="Email" />
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
                    <input type="password" className="form-control" onChange={(e) => this._onChange(e)} name="password" placeholder="Senha" />
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
                    <Button type="submit" className="btn btn-primary" loading={this.state.loading} name="Login" loadName="Carregando ..."></Button>
                    <Link to="/cadastro" className="ml-2" title="Alunos, Professores, Operadores, Empresa e Funcionários">Cadastre-se</Link>
                    <Link to="/recuperar-senha" className="ml-2">Esqueci Minha Senha</Link>
                </div>
            </div>
            </form>
        </div>

    
        );
  }
}

export default withRouter(Login)