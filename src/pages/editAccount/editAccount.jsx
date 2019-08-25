import React from 'react';
import axios from 'axios';

import Main from '../../components/template/Main';
import InputMask from 'react-input-mask';
import Button from '../../components/events/LoadingButtom';

// import {user} from '../../services/auth';
import {useSelector} from 'react-redux';

const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const Red = () => (<span style={{color:'red'}}>*</span>);
let init = {
          "name":"",
          "email":"",
          "password":"",
          "cpf":"",
          "birthday":"",
          "sex":"",
          "other_email":"",
          "state":"",
          "city":"",
          "phone1":"",
          "phone2":"",
      };

export default class editAccount extends React.Component {
	state={
		loading:false
	}

	state = {
      tipo:"",
	  user:{},
      tipoSlug:"",
      data:{state:"", ies:""},
      states:[],
      cities:[],
      address:{},
      company:{},
      loading:false
    };


	static getDerivedStateFromProps(props, state) {
		if (Object.keys(props.user).length) {
			return {
		    	user: props.user
		    };
		}
		return null;
	}

	async componentDidMount(){
		//Load state
	    const states = await axios.get(urlStates);
	    this.setState({states:states.data});

	    //Carregar Todo o estado - Encontrar solução
	    setTimeout(async () => {
			let st = this.state.states.filter((st) => st.sigla == this.state.user.state && st.sigla);
				st = (st.length == 0) ? '' : st[0].id;
				this.setState({id_state:st});
				
				const cities = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${st}/municipios`);
      			this.setState({cities:cities.data});
	    }, 2000);
	    
	}


	_onChange = (e) => {
      let value = e.target.value;
      // if (e.target.name =='ies') { e.target.value=e.target.value.toUpperCase(); value.toUpperCase(); }
      // if (e.target.name == 'state') { 
      //   const states = this.state.states;
      //   const uf = states.filter(st => st.id == e.target.value); 
      //         value = uf[0].sigla;
      // }

      const data = {...this.state.data};
      data[e.target.name] = value;
      this.setState({data});
    }

    handleStates = async (e) => {
      const cities = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e.target.value}/municipios`);
      this.setState({cities:cities.data});
    }

	onSubmit = async e => {
      e.preventDefault();
      //Set loading
      this.setState({loading:true});
      
      //Layer of Validation

      //send register to backend
      // const register = this.state.data;
      // const res = await userRegister(register);
      // if (res.data.error == true) {
      //   alert(`${res.data.message}`);       
      // }else{
      //   alert(`${res.data.message}`);
      //   this.props.history.push("/");
      //   // window.location=URL_BASE;
      // }
      setTimeout(() => {
        this.setState({loading:false});
      }, 2000);

      console.log(this.state);
    }
	render() {
		return (
			<Main title="Editar Conta">
	            <div className="container">
	                <div className="row justify-content-md-center">
	                    <div className="col-12 col-sm-12 col-lg-7">
	                      
	                        <div className="card card-primary">
	                           
	                            <div className="card-body"> 
	                              <form method="post" noValidate onSubmit={this.onSubmit} autoComplete="off">
	                                  <span style={{color:'red'}}>* Campo Obrigatório</span>
	                                  <div className="form-divider">
	                                      Dados Pessoas
	                                  </div>
	                                  <div className="row">
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="name">Nome Completo <Red /></label>
	                                          <input id="name" type="text" className="form-control" name="name" defaultValue={this.state.user.name} onChange={(e) => this._onChange(e)} autoFocus required />
	                                          <div className="invalid-feedback">
	                                          </div>
	                                      </div>
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="cpf">CPF <Red /></label>
	                                          <InputMask id="cpf" type="text" className="form-control" value={this.state.user.cpf} onChange={(e) => this._onChange(e)} name="cpf" mask="999.999.999-99" required />
	                                          <div className="invalid-feedback">
	                                          </div>
	                                      </div>
	                                  </div>
	                                  <div className="row">
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="birthday">Data de Nascimento <Red /></label>
	                                          <input id="birthday" type="date" className="form-control" defaultValue={this.state.user.birthday} onChange={(e) => this._onChange(e) } name="birthday" required />
	                                          <div className="invalid-feedback">
	                                          </div>
	                                      </div>
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="sexo">Sexo <Red /></label>
	                                          <select className="form-control" name="sex" value={this.state.user.sex} required onChange={(e) => this._onChange(e) }>
	                                            <option value="">Selecione seu sexo ...</option>
	                                            <option value={1}>Masculino</option>
	                                            <option value={2}>Feminino</option>
	                                          </select>
	                                           <div className="invalid-feedback">
	                                            </div>
	                                      </div>
	                                  </div>
	                                  <div className="form-group">
	                                      <label htmlFor="email">Email <Red /></label>
	                                      <input id="email" type="email" className="form-control" defaultValue={this.state.user.email} name="email" required onChange={(e) => this._onChange(e) } />
	                                      <div className="invalid-feedback">
	                                      </div>
	                                  </div>
	                                  <div className="form-group">
	                                      <label htmlFor="other_email">Email Alternativo</label>
	                                      <input id="other_email" type="other_email" defaultValue={this.state.other_email} className="form-control" name="other_email" onChange={(e) => this._onChange(e) } />
	                                      <div className="invalid-feedback">
	                                      </div>
	                                  </div>
	                                  <div className="row">
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="state">Estado <Red /></label>
	                                          <select className="form-control" name="state" value={this.state.id_state} onChange={(e) => {this.handleStates(e); this._onChange(e);} } required>
	                                            <option value="">Selecione seu estado ...</option>
	                                            {this.state.states.map(sts => (
	                                              <option key={sts.id} value={sts.id} rel={sts.nome}>{sts.nome}</option>
	                                            ))}
	                                          </select>
	                                          <div className="invalid-feedback">
	                                          </div>
	                                      </div>
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="city">Cidade <Red /></label>
	                                          <select className="form-control" value={this.state.user.city} name="city" required onChange={(e) => this._onChange(e) }>
	                                            <option value="">Selecione seu cidade ...</option>
	                                            {this.state.cities.map(city => (
	                                              <option key={city.id} value={city.nome}>{city.nome}</option>
	                                            ))}
	                                          </select>
	                                          <div className="invalid-feedback">
	                                          </div>
	                                      </div>
	                                  </div>
	                                  <div className="row">
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="phone1" className="d-block">Fone <Red /></label>
	                                          <InputMask id="phone1" type="text" className="form-control" value={this.state.user.phone1} name="phone1" mask="(99)99999-9999" onChange={(e) => this._onChange(e) } />
	                                          <div className="invalid-feedback">
	                                          </div>
	                                      </div>
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="phone2" className="d-block">Fone Alternativo</label>
	                                          <InputMask id="phone2" type="text" className="form-control" value={this.state.user.phone2} name="phone2" mask="(99)99999-9999" onChange={(e) => this._onChange(e) } />
	                                      </div>
	                                  </div>
	                                  { /*(this.state.tipoSlug == 'aluno' || this.state.tipoSlug == 'professor') ? this.renderAcademy() : "" */}
	                                  {/*(this.state.tipoSlug == 'empresa') ? this.renderCompany() : ""*/}
	                                  {/*(this.state.tipoSlug == 'operador' || this.state.tipoSlug == 'autonomo') ? this.renderOther() : ""*/}
	                                  
	                                  <div className="form-divider">
	                                        Sistema
	                                    </div>
	                                  <div className="row">
	                                      {/*
										<div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="password" className="d-block">Senha <Red /></label>
	                                          <input id="password" type="password" className="form-control" name="password" onChange={(e) => this._onChange(e) } />
	                                          <div id="pwindicator" className="pwindicator">
	                                              <div className="bar" />
	                                              <div className="label" />
	                                          </div>
	                                      </div>
	                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
	                                          <label htmlFor="password2" className="d-block">Confirmar Senha <Red /></label>
	                                          <input id="password2" type="password" className="form-control" name="password-confirm" onChange={(e) => this._onChange(e) } />
	                                      </div>
	                                      */}
	                                  </div>
	                                   {/*(this.state.tipoSlug == 'aluno') ? this.renderStudent() : ""*/} 
	                                  <div className="form-group">
	                                      <div className="custom-control custom-checkbox">
	                                          <input type="checkbox" name="agree" className="custom-control-input" id="agree" />
	                                          <label className="custom-control-label" htmlFor="agree">Eu aceito os termos e as condições</label>
	                                      </div>
	                                  </div>
	                                  <div className="form-group">
	                                      <Button type="submit" className="btn btn-primary btn-lg btn-block" loading={this.state.loading} name="Cadastrar" loadName="Enviando..."></Button>
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
