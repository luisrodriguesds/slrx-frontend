import React from 'react';

import Logo from '../../assets/img/logo_lrx@2x.png';
import Main from './Main';
import api from "../../services/api";
import { URL_BASE } from '../../services/routesBackend';

export default class forgotPass extends React.Component {
	state = {
        error:'',
		data:{password:'', confirmPass:'', token:''},
		loading:false
    };
    
    componentDidMount(){
        const query = window.location.search.slice(1);
        const partes = query.split('&');
        let data = {};
        partes.forEach(function (parte) {
            const chaveValor = parte.split('=');
            const chave = chaveValor[0];
            const valor = chaveValor[1];
            data[chave] = valor;
        });
        this.setState({data:{token:data.token}});

    }
	_onChange = (e) => {
        let value = e.target.value;
        const data = {...this.state.data};
        data[e.target.name] = value;
        this.setState({data, error:''});
        console.log(this.state)
    }

    onSubmit = async e => {
        e.preventDefault();
        //Set loading
        this.setState({loading:true});
        setTimeout(() => {
            this.setState({loading:false});
        }, 2000);

        if(this.state.data.password != this.state.data.confirmPass){
            this.setState({error:'As senha não são correspondentes!'});
        }else{
            const pass = this.state.data;
            const res = await api.post(`/user/set-newpass`, pass);
            if (res.data.error == true) {
                this.setState({error:res.data.message});
            }else{
                this.setState({error:''});
                alert(res.data.message);
                window.location=URL_BASE;
            }
            
        }
    }

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
	                                <h4>Nova Senha</h4>
	                            </div>
	                            <div className="card-body">
				                <p className="text-muted">Digite sua nova senha</p>
				                {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}                
								<form method="POST" onSubmit={this.onSubmit}>
				                  <div className="form-group">
				                    <label htmlFor="password">Senha</label>
				                    <input id="password" type="password" className="form-control" onChange={(e) => this._onChange(e)} name="password" tabIndex={1} required autoFocus />
				                  </div>
                                  <div className="form-group">
				                    <label htmlFor="confirmPass">Confirmar Senha</label>
				                    <input id="confirmPass" type="password" className="form-control" onChange={(e) => this._onChange(e)} name="confirmPass" tabIndex={1} required />
				                  </div>
				                  <div className="form-group">
				                    <button type="submit" disabled={this.state.loading} className="btn btn-primary btn-lg btn-block" tabIndex={1}>
									{this.state.loading && <i className="fas fa-sync-alt rotation"></i>}
									{this.state.loading && <span>Enviando...</span>}
									{!this.state.loading && <span>Enviar</span>}
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
