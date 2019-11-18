import React from 'react';

import Logo from '../../assets/img/logo_lrx@2x.png';
import Main from './Main';
import api from "../../services/api";
import { URL_BASE } from '../../services/routesBackend';
import Button from '../../components/events/LoadingButtom';

export default class forgotPass extends React.Component {
	state = {
		error:'',
		data:{email:''},
		loading:false
	};

	_onChange = (e) => {
        let value = e.target.value;
        const data = {...this.state.data};
        data[e.target.name] = value;
        this.setState({data, error:''});
        
    }

    onSubmit = async e => {
        e.preventDefault();
        //Set loading
		this.setState({loading:true});
		
        const email = this.state.data.email;
		const res = await api.get(`/user/request-newpass/${email}`);
        if (res.data.error == true) {
            this.setState({error:res.data.message});
        }else{
			this.setState({error:''});
			alert(res.data.message);
            window.location=process.env.REACT_APP_HOME_URL;
        }
        setTimeout(() => {
            this.setState({loading:false});
        }, 2000);
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
	                                <h4>Esqueci Minha Senha</h4>
	                            </div>
	                            <div className="card-body">
				                <p className="text-muted">Será enviado um email de recuperação de senha para o email informado</p>
				                {this.state.error && <div className="alert alert-danger" role="alert">{this.state.error}</div>}                
								<form method="POST" onSubmit={this.onSubmit}>
				                  <div className="form-group">
				                    <label htmlFor="email">Email</label>
				                    <input id="email" type="email" className="form-control" onChange={(e) => this._onChange(e)} name="email" tabIndex={1} required autoFocus />
				                  </div>

				                  <div className="form-group">
								  <Button type="submit" className="btn btn-primary btn-block" loading={this.state.loading} name="Enviar" loadName="Enviando ..."></Button>
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
