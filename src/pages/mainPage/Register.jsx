import React, { Component } from 'react';
import aixos from 'axios';
import InputMask from 'react-input-mask';
import { Link, withRouter } from "react-router-dom";

import Main from './Main';
import Logo from '../../assets/img/logo_lrx@2x.png';
import api,{userRegister} from '../../services/api';
import Button from '../../components/events/LoadingButtom';
import { URL_BASE } from '../../services/routesBackend';

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

class Register extends Component {
    state = {
      tipo:"",
      tipoSlug:"",
      data:{state:"", ies:""},
      states:[],
      cities:[],
      address:{},
      company:{},
      loading:false
    };

    async componentDidMount(){
      let tipo = window.location.hash.split('/')[2];
      console.log(window.location)
      switch (tipo) {
        case 'aluno':
          init = { ...init,
            "ies":"",
            "department":"",
            "title":"",
            "laboratory":"",
            "research":"",
            "description":"",
            "email_leader":"",
            "access_level_slug":"aluno"
          }
          this.setState({tipo:"Aluno(a)",tipoSlug:tipo, data:{...init}});  
        break;
        case 'professor':
          init = {
            ...init,
            "ies":"",
            "department":"",
            "title":"",
            "laboratory":"",
            "research":"",
            "description":"",
            "access_level_slug":"professor"
          }
          this.setState({tipo:"Professor(a)",tipoSlug:tipo, data:{...init}})  
        break;
        case 'empresa':
          init = {
            ...init,
            "cnpj":"",
            "fantasy_name":"",
            "company_name":"",
            "state_registration":"",
            "company_email":"",
            "company_phone":"",
            "cep":"",
            "street":"",
            "neighborhood":"",
            "number":"",
            "company_city":"",
            "company_state":"",
            "type_company":"",
            "access_level_slug":"empresa"
          }
          this.setState({tipo:"Empresa",tipoSlug:tipo, data:{...init}})  
        break;
        case 'operador':
          init = {
            ...init,
            "cep_address":"",
            "street_address":"",
            "neighborhood_address":"",
            "number_address":"",
            "city_address":"",
            "state_address":"",
            "access_level_slug":"operador"
          }
          this.setState({tipo:"Operador",tipoSlug:tipo, data:{...init}})  
        break;
        default:
          init = {
            ...init,
            "cep_address":"",
            "street_address":"",
            "neighborhood_address":"",
            "number_address":"",
            "city_address":"",
            "state_address":"",
            "access_level_slug":"autonomo"
          }
          this.setState({tipo:"Autônomo",tipoSlug:'autonomo', data:{...init}})
        break;
      }

      //Load state
      const states = await aixos.get(urlStates);
      this.setState({states:states.data});
    }

    handleStates = async (e) => {
      const cities = await aixos.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e.target.value}/municipios`);
      this.setState({cities:cities.data});
    }

    handleCEP = async (e) => {
      let cep = e.target.value.replace('-', '');
          cep = parseInt(cep);
      
      if (cep.toString().length == 8) {
        const address = await aixos.get(`https://viacep.com.br/ws/${cep}/json/`);
        let data = {...this.state.data};
        if (this.state.tipoSlug == 'empresa') {
          data.company_city = address.data.localidade;
          data.company_state = address.data.uf;
          data.neighborhood = address.data.bairro;
          data.street = address.data.logradouro;
        }else{
          data.city_address = address.data.localidade;
          data.state_address = address.data.uf;
          data.neighborhood_address = address.data.bairro;
          data.street_address = address.data.logradouro;
        }
        this.setState({address:address.data, data});
      }
    }
    handleCNPJ = async (e) => {
      let cnpj = e.target.value;
      const res = await api.get(`/company/cnpj?cnpj=${cnpj}`);
      if (res.data != '') {
        const req = res.data;
        const data = {...this.state.data, ...req};
        this.setState({company:res.data, data, address:{localidade:req.company_city, uf:req.company_state, bairro:req.neighborhood, logradouro:req.street}});
        // console.log(this.state);     
      }
    }

    _onChange = (e) => {
      let value = e.target.value;
      if (e.target.name =='ies') { e.target.value=e.target.value.toUpperCase(); value.toUpperCase(); }
      if (e.target.name == 'state') { 
        const states = this.state.states;
        const uf = states.filter(st => st.id == e.target.value); 
              value = uf[0].sigla;
      }
      const data = {...this.state.data};
      data[e.target.name] = value;
      this.setState({data});
      // console.log(this.state.data)
    }

    onSubmit = async e => {
      e.preventDefault();
      //Set loading
      this.setState({loading:true});
      
      //Layer of Validation

      //send register to backend
      //Check em outros erros
      try {
        const register = this.state.data;
        const res = await userRegister(register);
        if (res.data.error == true) {
          alert(`${res.data.message}`);       
        }else{
          alert(`${res.data.message}`);
          this.props.history.push("/");
          // window.location=URL_BASE;
        }
      } catch (error) {
        alert(`Algo inesperado aconteceu, sua pagina será recarregada`);        
        this.props.history.push("/");        
      }
      setTimeout(() => {
        this.setState({loading:false});
      }, 2000);
    }

    renderCompany(){
      return (
      <div className="infos-company">
        <div className="form-divider">
            Informações da Empresa
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="cnpj">CNPJ <Red /> </label>
                <InputMask id="cnpj" type="text" className="form-control" mask="99.999.999/9999-99" name="cnpj" onChange={(e) => {this._onChange(e); this.handleCNPJ(e); } } />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="fantasy_name">Nome Fantasia <Red /> </label>
                <input id="fantasy_name" type="text" className="form-control" name="fantasy_name" defaultValue={this.state.company.fantasy_name} onChange={(e) => this._onChange(e) } />
                  <div className="invalid-feedback">
                    como? Não entendi.
                  </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="company_name">Razão Social <Red /> </label>
                <InputMask id="company_name" type="text" className="form-control" name="company_name" defaultValue={this.state.company.company_name} onChange={(e) => this._onChange(e) } />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="state_registration">Inscrição Estadual </label>
                <input id="state_registration" type="text" className="form-control" name="state_registration" defaultValue={this.state.company.state_registration} onChange={(e) => this._onChange(e) } />
                  <div className="invalid-feedback">
                    como? Não entendi.
                  </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12">
                <label htmlFor="company_email">Email da Empresa <Red /> </label>
                <InputMask id="company_email" type="email" className="form-control" name="company_email" defaultValue={this.state.company.company_email} onChange={(e) => this._onChange(e) } />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="company_phone">Fone <Red />  <i className="fab fa-whatsapp"></i> </label>
                <InputMask id="company_phone" type="text" mask="(99)99999-9999" className="form-control" name="company_phone" value={this.state.company.company_phone} onChange={(e) => this._onChange(e) } />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="cep">CEP <Red /> </label>
                <InputMask id="cep" type="text" mask="99999-999" autoComplete="false" onChange={(e) => { this.handleCEP(e); this._onChange(e); }} value={this.state.company.cep} className="form-control" name="cep" />
                  <div className="invalid-feedback">
                    como? Não entendi.
                  </div>
            </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
                <label htmlFor="street">Logradouro <Red /> </label>
                <input id="street" type="text" defaultValue={this.state.address.logradouro} onChange={(e) => this._onChange(e) }  className="form-control" name="street" />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="neighborhood">Bairro <Red /> </label>
                <input id="neighborhood" type="text" defaultValue={this.state.address.bairro} onChange={(e) => this._onChange(e) } className="form-control" name="neighborhood" />
                  <div className="invalid-feedback">
                    como? Não entendi.
                  </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="number">Número <Red /> </label>
                <input id="number" type="text" className="form-control" name="number" defaultValue={this.state.company.number} onChange={(e) => this._onChange(e) } />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="company_city">Localidade <Red /> </label>
                <input id="company_city" type="text" defaultValue={this.state.address.localidade} onChange={(e) => this._onChange(e) } className="form-control" name="company_city" />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="company_state">Estado <Red /> </label>
                <input id="company_state" type="text" defaultValue={this.state.address.uf}  onChange={(e) => this._onChange(e) } className="form-control" name="company_state" />
                  <div className="invalid-feedback">
                    como? Não entendi.
                  </div>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="company_state">Cargo <Red /> </label>
            <div className="custom-control custom-radio">
                <input type="radio" name="type_company" defaultValue="tecnico"  onChange={(e) => this._onChange(e) } className="custom-control-input" id="type_company_1" />
                <label className="custom-control-label" htmlFor="type_company_1">Técnico</label>
            </div>
            <div className="custom-control custom-radio">
                <input type="radio" name="type_company" defaultValue="financeiro"  onChange={(e) => this._onChange(e) } className="custom-control-input" id="type_company_2" />
                <label className="custom-control-label" htmlFor="type_company_2">Financeiro</label>
            </div>
        </div>
      </div>
      );
    }

    renderStudent(){
      return (
        <div className="row">
            <div className="form-group col-12">
                <label htmlFor="email_leader" className="d-block">Email do seu Orientador</label>
                <input id="email_leader" type="email" className="form-control" name="email_leader" onChange={(e) => this._onChange(e) } />
                <div className="invalid-feedback">
                  como? Não entendi.
                </div>
            </div>
        </div>
      );
    }

    renderAcademy(){
      return (
          <div className="infos-acad">
            <div className="form-divider">
                Informações Acadêmicas
            </div>
            <div className="row">
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="ies">Instituição de Ensino Superior <Red /> </label>
                    <input id="ies" type="text" className="form-control" name="ies" onChange={(e) => this._onChange(e) } required />
                     <div className="invalid-feedback">
                       como? Não entendi.
                      </div>
                </div>
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="department">Departamento <Red /></label>
                    <input id="department" type="text" className="form-control" name="department" onChange={(e) => this._onChange(e)} required />
                     <div className="invalid-feedback">
                       como? Não entendi.
                      </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="title">Título <Red /></label>
                    <select className="form-control" name="title" required onChange={(e) => this._onChange(e)}>
                      <option value="">Selecione sua Título ...</option>
                      <option value="Graduando">Graduando</option>
                      <option value="Graduado">Graduado</option>
                      <option value="Especializando">Especializando</option>
                      <option value="Especialista">Especialista</option>
                      <option value="Mestrando">Mestrando</option>
                      <option value="Mestre">Mestre</option>
                      <option value="Doutorando">Doutorando</option>
                      <option value="Doutor">Doutor</option>
                    </select>
                    <div className="invalid-feedback">
                      como? Não entendi.
                    </div>
                </div>
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="laboratory">Laboratório <Red /></label>
                    <input id="laboratory" type="text" className="form-control" name="laboratory" onChange={(e) => this._onChange(e)} />
                     <div className="invalid-feedback">
                       como? Não entendi.
                      </div>
                </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                    <label htmlFor="research">Área de Pesquisa <Red /></label>
                    <input id="research" type="text" className="form-control" name="research" onChange={(e) => this._onChange(e)} />
                     <div className="invalid-feedback">
                       como? Não entendi.
                      </div>
                </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="description">Descrição da Pesquisa</label>
                <textarea className="form-control" name="description" required defaultValue={""} onChange={(e) => this._onChange(e)} />
              </div>
            </div>
          </div>
      );
    }

    renderOther(){
      return (
        <div className="infos-acad">
            <div className="form-divider">
                Endereço
            </div>
            <div className="row">
              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="cep">CEP <Red /> </label>
                  <InputMask id="cep" type="text" mask="99999-999" autoComplete="false" onChange={(e) => { this.handleCEP(e); this._onChange(e); }} value={this.state.company.cep} className="form-control" name="cep_address" />
                    <div className="invalid-feedback">
                      como? Não entendi.
                    </div>
              </div>
              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="street">Logradouro <Red /> </label>
                  <input id="street" type="text" defaultValue={this.state.address.logradouro} onChange={(e) => this._onChange(e) }  className="form-control" name="street_address" />
                  <div className="invalid-feedback">
                    como? Não entendi.
                  </div>
              </div>
            </div>
            <div className="row">
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="neighborhood">Bairro <Red /> </label>
                    <input id="neighborhood" type="text" defaultValue={this.state.address.bairro} onChange={(e) => this._onChange(e) } className="form-control" name="neighborhood_address" />
                      <div className="invalid-feedback">
                        como? Não entendi.
                      </div>
                </div>
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="number">Número <Red /> </label>
                    <input id="number" type="text" className="form-control" name="number_address" defaultValue={this.state.company.number} onChange={(e) => this._onChange(e) } />
                    <div className="invalid-feedback">
                      como? Não entendi.
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="company_city">Localidade <Red /> </label>
                    <input id="company_city" type="text" defaultValue={this.state.address.localidade} onChange={(e) => this._onChange(e) } className="form-control" name="city_address" />
                    <div className="invalid-feedback">
                      como? Não entendi.
                    </div>
                </div>
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="company_state">Estado <Red /> </label>
                    <input id="company_state" type="text" defaultValue={this.state.address.uf}  onChange={(e) => this._onChange(e) } className="form-control" name="state_address" />
                      <div className="invalid-feedback">
                        como? Não entendi.
                      </div>
                </div>
            </div>
        </div>

      );
    }

    render() {
        return (
          <Main title="Cadastrar Solicitações">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-sm-12 col-lg-7">
                      <div className="login-brand">
                        <Link to="/" >
                          <img src={Logo} alt="logo" width="300" className="" />
                        </Link>
                      </div>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4>Cadastro de {this.state.tipo}</h4>
                            </div>
                            <div className="card-body"> 
                              <form method="post" noValidate className="needs-validation" onSubmit={this.onSubmit} autoComplete="off">
                                  <span style={{color:'red'}}>* Campo Obrigatório</span>
                                  <div className="form-divider">
                                      Dados Pessoas
                                  </div>
                                  <div className="row">
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="name">Nome Completo <Red /></label>
                                          <input id="name" type="text" className="form-control" name="name" onChange={(e) => this._onChange(e)} autoFocus required />
                                          <div className="invalid-feedback">
                                            como? Não entendi.
                                          </div>
                                      </div>
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="cpf">CPF <Red /></label>
                                          <InputMask id="cpf" type="text" className="form-control" onChange={(e) => this._onChange(e)} name="cpf" mask="999.999.999-99" required />
                                          <div className="invalid-feedback">
                                            como? Não entendi.
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="birthday">Data de Nascimento <Red /></label>
                                          <InputMask id="birthday" type="date" className="form-control" onChange={(e) => this._onChange(e) } name="birthday" required />
                                          <div className="invalid-feedback">
                                            como? Não entendi.
                                          </div>
                                      </div>
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="sexo">Sexo <Red /></label>
                                          <select className="form-control" name="sex" required onChange={(e) => this._onChange(e) }>
                                            <option value="">Selecione seu sexo ...</option>
                                            <option value="1">Masculino</option>
                                            <option value="2">Feminino</option>
                                          </select>
                                           <div className="invalid-feedback">
                                             como? Não entendi.
                                            </div>
                                      </div>
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="email">Email <Red /></label>
                                      <input id="email" type="email" className="form-control" name="email" required onChange={(e) => this._onChange(e) } />
                                      <div className="invalid-feedback">
                                        como? Não entendi.
                                      </div>
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="other_email">Email Alternativo</label>
                                      <input id="other_email" type="other_email" className="form-control" name="other_email" onChange={(e) => this._onChange(e) } />
                                      <div className="invalid-feedback">
                                        como? Não entendi.
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="state">Estado <Red /></label>
                                          <select className="form-control" name="state" onChange={(e) => {this.handleStates(e); this._onChange(e);} } required>
                                            <option value="">Selecione seu estado ...</option>
                                            {this.state.states.map(sts => (
                                              <option key={sts.id} value={sts.id}>{sts.nome}</option>
                                            ))}
                                          </select>
                                          <div className="invalid-feedback">
                                            como? Não entendi.
                                          </div>
                                      </div>
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="city">Cidade <Red /></label>
                                          <select className="form-control" name="city" required onChange={(e) => this._onChange(e) }>
                                            <option value="">Selecione seu cidade ...</option>
                                            {this.state.cities.map(city => (
                                              <option key={city.id} value={city.nome}>{city.nome}</option>
                                            ))}
                                          </select>
                                          <div className="invalid-feedback">
                                            como? Não entendi.
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="phone1" className="d-block">Fone <Red /> <i title="Whatsapp" style={{fontSize:'16px', color:'green'}} className="fab fa-whatsapp"></i></label>
                                          <InputMask id="phone1" type="text" className="form-control" name="phone1" mask="(99)99999-9999" onChange={(e) => this._onChange(e) } />
                                          <div className="invalid-feedback">
                                            como? Não entendi.
                                          </div>
                                      </div>
                                      <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                          <label htmlFor="phone2" className="d-block">Fone Alternativo</label>
                                          <InputMask id="phone2" type="text" className="form-control" name="phone2" mask="(99)99999-9999" onChange={(e) => this._onChange(e) } />
                                      </div>
                                  </div>
                                  {(this.state.tipoSlug == 'aluno' || this.state.tipoSlug == 'professor') ? this.renderAcademy() : ""}
                                  {(this.state.tipoSlug == 'empresa') ? this.renderCompany() : ""}
                                  {(this.state.tipoSlug == 'operador' || this.state.tipoSlug == 'autonomo') ? this.renderOther() : ""}
                                  
                                  <div className="form-divider">
                                        Sistema
                                    </div>
                                  <div className="row">
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
                                          <input id="password2" type="password" className="form-control" name="password_confirm" onChange={(e) => this._onChange(e) } />
                                      </div>
                                  </div>
                                   {(this.state.tipoSlug == 'aluno') ? this.renderStudent() : ""} 
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

export default withRouter(Register);