import React, { Component } from 'react';
import aixos from 'axios';
import InputMask from 'react-input-mask';

import Main from './Main';

const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

export default class Register extends Component {
    state = {
      tipo:"",
      tipoSlug:"",
      data:{state:""},
      states:[],
      cities:[]
    };

    async componentDidMount(){
      let tipo = window.location.pathname.split('/')[2];
      switch (tipo) {
        case 'aluno':
          this.setState({tipo:"Aluno(a)",tipoSlug:tipo})  
        break;
        case 'professor':
          this.setState({tipo:"Professor(a)",tipoSlug:tipo})  
        break;
        case 'empresa':
          this.setState({tipo:"Empresa ou Individual",tipoSlug:tipo})  
        break;
        case 'operador':
          this.setState({tipo:"Operador",tipoSlug:tipo})  
        break;
      }

      //Load state
      const states = await aixos.get(urlStates);
      this.setState({states:states.data});
      console.log(this.state);
    }

    handleStates = async (e) => {
      console.log(e.target.value);
      const cities = await aixos.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e.target.value}/municipios`);
      this.setState({cities:cities.data});
    }

    _onChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
      e.preventDefault();
    }

    renderCompany(){
      return (
      <div className="infos-company">
        <div className="form-divider">
            Informações da Empresa
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="cnpj">CNPJ</label>
                <InputMask id="cnpj" type="text" className="form-control" mask="99.999.999/9999-99" name="cnpj" />
                <div className="invalid-feedback">
                </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="name_company">Nome Fantasia</label>
                <input id="name_company" type="text" className="form-control" name="name_company" />
                  <div className="invalid-feedback">
                  </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="razao_social">razao_social</label>
                <InputMask id="razao_social" type="text" className="form-control" mask="99.999.999/9999-99" name="razao_social" />
                <div className="invalid-feedback">
                </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="nameCompany">Nome Fantasia</label>
                <input id="nameCompany" type="text" className="form-control" name="nameCompany" />
                  <div className="invalid-feedback">
                  </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="ies">Instituição de Ensino Superior</label>
                <select className="form-control" name="ies" required>
                  <option value="">Selecione sua IES ...</option>
                </select>
                  <div className="invalid-feedback">
                  </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="department">Departamento</label>
                <select className="form-control" name="departamento" required>
                  <option value="">Selecione seu Departamento ...</option>
                </select>
                  <div className="invalid-feedback">
                  </div>
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="titulo">Título</label>
                <select className="form-control" name="titulo" required>
                  <option value="">Selecione sua Título ...</option>
                  <option value="0">Graduando</option>
                  <option value="1">Graduado</option>
                  <option value="2">Especializando</option>
                  <option value="3">Especialista</option>
                  <option value="4">Mestrando</option>
                  <option value="5">Mestre</option>
                  <option value="6">Doutorando</option>
                  <option value="7">Doutor</option>
                </select>
                <div className="invalid-feedback">
                </div>
            </div>
            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="lab">Laboratório</label>
                <input id="lab" type="text" className="form-control" name="lab" />
                  <div className="invalid-feedback">
                  </div>
            </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
                <label htmlFor="research">Área de Pesquisa</label>
                <input id="research" type="text" className="form-control" name="research" />
                  <div className="invalid-feedback">
                  </div>
            </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="research">Descrição da Pesquisa</label>
            <textarea className="form-control" required defaultValue={""} />
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
                    <label htmlFor="ies">Instituição de Ensino Superior</label>
                    <select className="form-control" name="ies" required>
                      <option value="">Selecione sua IES ...</option>
                    </select>
                     <div className="invalid-feedback">
                      </div>
                </div>
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="department">Departamento</label>
                    <select className="form-control" name="departamento" required>
                      <option value="">Selecione seu Departamento ...</option>
                    </select>
                     <div className="invalid-feedback">
                      </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="titulo">Título</label>
                    <select className="form-control" name="titulo" required>
                      <option value="">Selecione sua Título ...</option>
                      <option value="0">Graduando</option>
                      <option value="1">Graduado</option>
                      <option value="2">Especializando</option>
                      <option value="3">Especialista</option>
                      <option value="4">Mestrando</option>
                      <option value="5">Mestre</option>
                      <option value="6">Doutorando</option>
                      <option value="7">Doutor</option>
                    </select>
                    <div className="invalid-feedback">
                    </div>
                </div>
                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="lab">Laboratório</label>
                    <input id="lab" type="text" className="form-control" name="lab" />
                     <div className="invalid-feedback">
                      </div>
                </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                    <label htmlFor="research">Área de Pesquisa</label>
                    <input id="research" type="text" className="form-control" name="research" />
                     <div className="invalid-feedback">
                      </div>
                </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="research">Descrição da Pesquisa</label>
                <textarea className="form-control" required defaultValue={""} />
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
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4>Cadastro de {this.state.tipo}</h4>
                            </div>
                            <div className="card-body">
                                <form method="post" noValidate onSubmit={this.onSubmit}>
                                    <div className="form-divider">
                                        Dados Pessoas
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="name">Nome Completo</label>
                                            <input id="name" type="text" className="form-control" name="name" autoFocus required />
                                            <div className="invalid-feedback">
                                            </div>
                                        </div>
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="cpf">CPF</label>
                                            <InputMask id="cpf" type="text" className="form-control" name="cpf" mask="999.999.999-99" required />
                                            <div className="invalid-feedback">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="birthday">Data de Nascimento</label>
                                            <InputMask id="birthday" type="text" className="form-control" name="birthday" mask="99/99/9999" required />
                                            <div className="invalid-feedback">
                                            </div>
                                        </div>
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="sexo">Sexo</label>
                                            <select className="form-control" name="sexo" required>
                                              <option value="">Selecione seu sexo ...</option>
                                              <option value="1">Masculino</option>
                                              <option value="2">Feminino</option>
                                            </select>
                                             <div className="invalid-feedback">
                                              </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" className="form-control" name="email" required />
                                        <div className="invalid-feedback">
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="other_email">Email Alternativo</label>
                                        <input id="other_email" type="other_email" className="form-control" name="other_email" />
                                        <div className="invalid-feedback">
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="estado">Estado</label>
                                            <select className="form-control" name="estado" onChange={(e) => this.handleStates(e) } required>
                                              <option value="">Selecione seu estado ...</option>
                                              {this.state.states.map(sts => (
                                                <option key={sts.id} value={sts.id}>{sts.nome}</option>
                                              ))}
                                            </select>
                                            <div className="invalid-feedback">
                                            </div>
                                        </div>
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="cidade">Cidade</label>
                                            <select className="form-control" name="cidade" required>
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
                                            <label htmlFor="fone" className="d-block">Fone</label>
                                            <InputMask id="fone" type="text" className="form-control" name="password" mask="(99)99999-9999" />
                                            <div className="invalid-feedback">
                                            </div>
                                        </div>
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="fone2" className="d-block">Fone Alternativo</label>
                                            <InputMask id="fone2" type="text" className="form-control" name="fone2" mask="(99)99999-9999" />
                                        </div>
                                    </div>
                                    {(this.state.tipoSlug == 'aluno' || this.state.tipoSlug == 'professor') ? this.renderAcademy() : ""}
                                    
                                    <div className="form-divider">
                                          Sistema
                                      </div>
                                    <div className="row">
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="password" className="d-block">Senha</label>
                                            <input id="password" type="password" className="form-control" name="password" />
                                            <div id="pwindicator" className="pwindicator">
                                                <div className="bar" />
                                                <div className="label" />
                                            </div>
                                        </div>
                                        <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                            <label htmlFor="password2" className="d-block">Confirmar Senha</label>
                                            <input id="password2" type="password" className="form-control" name="password-confirm" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" name="agree" className="custom-control-input" id="agree" />
                                            <label className="custom-control-label" htmlFor="agree">Eu aceito os termos e as condições</label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                                            Cadastrar
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