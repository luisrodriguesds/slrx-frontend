import React from 'react';

import {changePass} from '../../services/api';

import Main from '../../components/template/Main';
import Button from '../../components/events/LoadingButtom';

export default class changePassPage extends React.Component {

	state ={
		data:{current_password:'', password:'', password_confirm:''},
		loading:false
	}

	onSubmit = async e => {
		e.preventDefault();
		
		this.setState({loading:true});

		setTimeout(() => {
			this.setState({loading:false});
		  }, 1000);

		if (this.state.data.current_password === '' || this.state.data.password === '' || this.state.data.password_confirm === '') {
			return;
		}else if(this.state.data.password !== this.state.data.password_confirm){
			alert(`As senhas não correspondem`);       
			return;
		}
		
			//send register to backend
			try {
				const update = this.state.data;
				const res = await changePass(update);
				if (res.data.error === true) {
				  alert(`${res.data.message}`);       
				}else{
				  alert(`${res.data.message}`);
				  window.scrollTo(0,0);
				  this.props.history.push("/");
				//   window.location=URL_BASE+'editar-conta';
				}
			  } catch (error) {
				alert(`Algo de errado aconteceu, procure o suporte técnico.`);
			  }

	}

	_onChange = (e) => {
		let value = e.target.value;
		const data = {...this.state.data};
		data[e.target.name] = value;
		this.setState({data});
		console.log(this.state);
	}

	render() {
		return (
			<Main title="Alterar Senha">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-6">
							<div className="card">
					        <form className="needs-validation" method="post" noValidate onSubmit={this.onSubmit}>
					          <div className="card-header">
					            <h4>Alterar Senha</h4>
					          </div>
					          <div className="card-body">
					            <div className="form-group">
					              <label>Senha atual</label>
					              <input type="password" onChange={(e) => this._onChange(e) } name="current_password" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
								  {/* <div className="valid-feedback">
					                Isso!
					              </div> */}
					            </div>
					            <div className="form-group">
					              <label>Nova senha</label>
					              <input type="password" onChange={(e) => this._onChange(e) } name="password" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					            <div className="form-group">
					              <label>Confirmar nova senha</label>
					              <input type="password" onChange={(e) => this._onChange(e) } name="password_confirm" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					          </div>
					          <div className="card-footer text-right">
								<Button type="submit" className="btn btn-primary btn-lg btn-block" loading={this.state.loading} name="Salvar" loadName="Salvando..."></Button>
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
