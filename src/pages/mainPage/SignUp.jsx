import React, { useEffect, useState, useRef } from 'react';

import api, { userRegister } from '../../services/api'

import { withRouter } from "react-router-dom";
import { Form } from '@unform/web'

import Main from './Main'

import Input from '../../components/form/Input'
import InputMask from '../../components/form/InputMask'
import Button from '../../components/form/Button';
import Select from '../../components/form/Select'
import TextArea from '../../components/form/TextArea'
import Choice from '../../components/form/Choice'

import * as Yup from 'yup'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//urls
const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const urlCity = (state) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
const urlCEP = (cep) => `https://viacep.com.br/ws/${cep}/json/`

function SignUp(props) {
  const formRef = useRef(null)

  const [states, setStates] = useState([])
  const [state, setState] = useState('')
  const [cities, setCities] = useState([])
  const [level, setLevel] = useState('')
  const [cep, setCep] = useState('')
  const [cnpj, setCnpj] = useState({})
  const [loading, setLoading] = useState(false)
  const titles = [
    'Graduando',
    'Graduado',
    'Especializando',
    'Especialista',
    'Mestrando',
    'Mestre',
    'Doutorando',
    'Doutor',
  ]

  const levels = {
    aluno: 'Aluno(a)',
    professor: 'Professor(a)',
    empresa: 'Empresa',
    autonomo: 'Autônomo(a)'
  }

  //Load main
  useEffect(() => {
    async function load(){
      const tipo = props.match.params.level
      if (levels[tipo] === undefined) {
        props.history.goBack()
      }
      setLevel(tipo)
    }
    load()
  },  [levels, props.history, props.match.params])

  //Load state
  useEffect(() => {
    async function loadStates(){
      try {
        const res = await api.get(urlStates)
        setStates(res.data)
      } catch (error) {
        props.history.goBack()
      }
    }
    loadStates()
  }, [props.history])

  //load city
  useEffect(() => {
    async function loadCity(){
      try {
        const res = await api.get(urlCity(state))
        setCities(res.data)
      } catch (error) {
        
      }
    }
    loadCity()
  }, [state])

  //LoadCEP
  useEffect(()=> {
    async function loadCep(){
      if (cep.length < 9) {
        return
      }

      try {
        const newCep = cep.replace('-', '')
        const res = await api.get(urlCEP(newCep))
        if (level === 'empresa') {
          formRef.current.setData({
            company:{
              company_city: res.data.localidade,
              company_state: res.data.uf,
              neighborhood: res.data.bairro,
              street: res.data.logradouro
            }
          })
          return
        }

        formRef.current.setData({
          address:{
            city_address: res.data.localidade,
            state_address: res.data.uf,
            neighborhood_address: res.data.bairro,
            street_address: res.data.logradouro
          }
        })

      } catch (error) {
        
      }
    }
    loadCep()
  }, [cep, level])

  //Load CNPJ
  useEffect(() => {
    async function loadCNPJ(){
      if (cnpj.length < 18) {
        return
      }
      try {
        const res = await api.get(`/company/cnpj?cnpj=${cnpj}`);
        formRef.current.setFieldValue('company.cep', res.data.cep)
      } catch (error) {
        
      }
    }
    loadCNPJ()
  }, [cnpj])

  async function handleSubmit(data){
    
    setLoading(true)
    const MySwal = withReactContent(Swal)

    try {
      const shema = Yup.object().shape({
        name: Yup.string().min(3, 'Campo deve ter no mínimo 3 caracteres').required('Campo Obrigatório'),
        cpf: Yup.string().min(9, 'Campo deve ter no mínimo 9 caracteres').required('Campo Obrigatório'),
        birthday: Yup.date().typeError('Data Inválida').required("Campo Obrigatório"),
        sex: Yup.string().required('Campo Obrigatório').oneOf(['1', '2', null], 'Campo Obrigatório'),
        email: Yup.string().required('Campo Obrigatório').email('Email inválido'),
        state: Yup.string().min(2, 'Campo Obrigatório').required('Campo Obrigatório'),
        city: Yup.string().required('Campo Obrigatório'),
        phone1: Yup.string().required('Campo Obrigatório'),
        password: Yup.string().min(8, 'Campo deve ter no mínimo 8 caracteres').required('Campo Obrigatório'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas não correspondem').required('Campo Obrigatório'),
        address: level === 'empresa' ? null : Yup.object().shape({
          cep_address: Yup.string().required('Campo Obrigatório').min(9, 'Campo deve ter no mínimo 9 caracteres'),
          street_address: Yup.string().required('Campo Obrigatório'),
          neighborhood_address: Yup.string().required('Campo Obrigatório'),
          number_address: Yup.string().required('Campo Obrigatório'),
          state_address: Yup.string().required('Campo Obrigatório').min(2, 'Campo deve ter no mínimo 2 caracteres'),
          city_address: Yup.string().required('Campo Obrigatório'),
        }),
        academic: (level !== 'aluno' && level !== 'professor') ? null : Yup.object().shape({
          email_leader: level !== 'aluno' ? null : Yup.string().required('Campo obrigatório').email('Email inválido'),
          ies: Yup.string().required('Campo Obrigatório'),
          department: Yup.string().required('Campo Obrigatório'),
          title: Yup.string().required('Campo Obrigatório').oneOf(titles, 'Título Inválido'),
          laboratory: Yup.string().required('Campo Obrigatório'),
          research: Yup.string().required('Campo Obrigatório'),
          description: Yup.string().required('Campo Obrigatório'),
        }),
        company: level !== 'empresa' ? null : Yup.object().shape({
          cnpj: Yup.string().required('Campo Obrigatório'),
          fantasy_name: Yup.string().required('Campo Obrigatório'),
          company_name: Yup.string().required('Campo Obrigatório'),
          company_email: Yup.string().required('Campo Obrigatório'),
          company_phone: Yup.string().required('Campo Obrigatório'),
          cep: Yup.string().required('Campo Obrigatório'),
          street: Yup.string().required('Campo Obrigatório'),
          neighborhood: Yup.string().required('Campo Obrigatório'),
          number: Yup.string().required('Campo Obrigatório'),
          company_state: Yup.string().required('Campo Obrigatório'),
          company_city: Yup.string().required('Campo Obrigatório'),
          type_company: Yup.string().required('Campo Obrigatório').oneOf(['tecnico', 'financeiro'], 'Escolha entre técnico ou financeiro'),
        })
      })
      
      await shema.validate(data, {
        abortEarly: false
      })
      try {
        const res = await userRegister({...data, level})
        if (res.data) {
          MySwal.fire({
            title: <p>Parabéns!</p>,
            icon: 'success',
            text: res.data.message 
          }).then(() => {
            props.history.push('/')
          })
        }
      } catch (error) {
        MySwal.fire({
          title: <p>Ops ...</p>,
          icon: 'error',
          text: 'Aconteceu um erro em nossos servidores, por favor tente novamente mais tarde ou entre em contato com o suporte.' 
        })
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors)
        MySwal.fire({
          title: <p>Ops ...</p>,
          icon: 'error',
          text: 'Um ou mais campos obrigatórios foram deixados em branco, por favor verificar.' 
        })
        window.scroll(0,0)
      }
    }
    setLoading(false)
  }

  function renderAcademy(){
    return (
      <>
        <div className="form-divider">
            Informações Acadêmicas
        </div>
        {level === 'aluno' && (
        <div className="row">
          <div className="form-group col-12">
            <Input 
              label="Email do seu Orientador"
              name="academic.email_leader"
              required="true"
              obs="Seu Orientador precisa estar cadastrado na plataforma para que você possa ser vinculado a ele."
              type="text"
              placeholder="Digite o email do seu orientador"
            />
          </div>
        </div>
        )}
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Instituição de Ensino Superior"
              name="academic.ies"
              required="true"
              obs="Ex: UFC"
              type="text"
              placeholder="Digite o nome ou a Sigla da sua IES"
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Departamento"
              name="academic.department"
              required="true"
              obs="Ex: Departamento de Fisica"
              type="text"
              placeholder="Digite seu departamento"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Select 
              label="Título"
              name="academic.title"
              required="true"
              obs="Ex: Feminino"
            >
              <option value="">Selecione sua Título ...</option>
              {titles.map((title, i) => (
                <option key={`titles-${i}`} value={title}>{title}</option>
              ))}
            </Select>
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Laboratório"
              name="academic.laboratory"
              required="true"
              obs="Ex: LABOSAM"
              type="text"
              placeholder="Digite seu laboratório"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <Input 
              label="Área de Pesquisa"
              name="academic.research"
              required="true"
              obs="Apenas um o título da pesquisa"
              type="text"
              placeholder="Digite sua Área de Pesquisa"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <TextArea 
              label="Descrição da Pesquisa"
              name="academic.description"
              required="true"
              obs="Informe com detalhes sua área de pesquisa e se possível informar links sobre."
              placeholder="Digite sua descrição da pesquisa"
              style={{height:'80px'}}
            />
          </div>
        </div>
      </>
    )
  }

  function renderCompany(){
    return (
      <>
        <div className="form-divider">
            Informações da Empresa
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <InputMask 
              label="CNPJ"
              name="company.cnpj"
              required="true"
              obs="Ex: 99.999.999/9999-99"
              type="text"
              placeholder="Digite o CNPJ da empresa"
              mask="99.999.999/9999-99" 
              maskChar={null}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Nome Fantasia"
              name="company.fantasy_name"
              required="true"
              obs="Nome usado em logo e peças de arte."
              type="text"
              placeholder="Digite o nome fantasia da empresa"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Razão Social"
              name="company.company_name"
              required="true"
              obs="Nome da empresa usado cartório"
              type="text"
              placeholder="Digite a razão social da empresa"
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Inscrição Estadual"
              name="company.state_registration"
              obs="Digite somente se caso houver"
              type="text"
              placeholder="Digite a inscrição estadual da empresa"
            />
          </div>
        </div>
        <div className="row">
            <div className="form-group col-12">
              <Input 
                label="Email da Empresa"
                name="company.company_email"
                obs="Ex: empresa@empresa.com.br"
                required="true"
                type="email"
                placeholder="Digite o email da empresa"
              />
            </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <InputMask 
              label="Fone"
              name="company.company_phone"
              required="true"
              obs="Ex: (85)99999-9999"
              type="text"
              placeholder="Digite o fone (wpp) da empresa"
              mask="(85)99999-9999" 
              maskChar={null}
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <InputMask 
              label="CEP"
              name="company.cep"
              required="true"
              obs="Digite o CEP da sede da empresa. Ex: 99999-999."
              type="text"
              placeholder="Digite o CEP da empresa"
              mask="99999-999" 
              maskChar={null}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <Input 
              label="Logradouro"
              name="company.street"
              obs="Ex: Av Humberto Monte"
              required="true"
              type="text"
              placeholder="Digite o logradouro da empresa"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Bairro"
              name="company.neighborhood"
              obs="Ex: Pici"
              required="true"
              type="text"
              placeholder="Digite o bairro da empresa"
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Número"
              name="company.number"
              obs="Ex: 134"
              required="true"
              type="text"
              placeholder="Digite o número do local da empresa"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Estado"
              name="company.company_state"
              obs="Ex: Ce"
              required="true"
              type="text"
              placeholder="Digite o estado da empresa"
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Cidade"
              name="company.company_city"
              obs="Ex: Fortaleza"
              required="true"
              type="text"
              placeholder="Digite a cidade da empresa"
            />
          </div>
        </div>
        <div className="form-group">
          <Choice 
            name="company.type_company"
            label="Cargo"
            required="true"
            options={[
              { id: "tecnico", label: "Técnico" },
              { id: "financeiro", label: "Financeiro" },
            ]}
          />
        </div>
      </>
    )
  }

  function renderAddress(){
    return (
      <>
        <div className="form-divider">
            Endereço
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <InputMask 
              label="CEP"
              name="address.cep_address"
              required="true"
              obs="Ex: 99999-999"
              type="text"
              placeholder="Digite seu CEP"
              mask="99999-999" 
              maskChar={null}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Logradouro"
              name="address.street_address"
              obs="Ex: Av Humberto Monte"
              required="true"
              type="text"
              placeholder="Digite o logradouro"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Bairro"
              name="address.neighborhood_address"
              obs="Ex: Pici"
              required="true"
              type="text"
              placeholder="Digite seu Bairro"
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Número"
              name="address.number_address"
              obs="Ex: 134, Ap 201"
              required="true"
              type="text"
              placeholder="Digite o número da sua residência"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Estado"
              name="address.state_address"
              obs="Ex: Ce"
              required="true"
              type="text"
              placeholder="Digite o estado da sua residência"
            />
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
            <Input 
              label="Cidade"
              name="address.city_address"
              obs="Ex: Fortaleza"
              required="true"
              type="text"
              placeholder="Digite a cidade da sua residência"
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <Main title="Cadastrar Solicitações">
        <div className="container">
          <div className="row justify-content-md-center">
              <div className="col-12 col-sm-12 col-lg-8">
                  <div className="card card-primary">
                      <div className="card-header">
                          <h4>Cadastro de {levels[level]}</h4>
                      </div>
                      <div className="card-body">
                        <Form ref={formRef} onSubmit={handleSubmit}>
                        <span style={{color:'red'}}>* Campo Obrigatório</span>
                            <div className="form-divider">
                                Dados Pessoas
                            </div>
                            <div className="row">
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                <Input 
                                  label="Nome Completo"
                                  name="name"
                                  autoFocus
                                  required="true"
                                  obs="Ex: Francisco da Silva Nunes"
                                  type="text"
                                  placeholder="Digite seu nome completo"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                  <InputMask 
                                    label="CPF"
                                    name="cpf"
                                    required="true"
                                    obs="Ex: 999.999.999-99"
                                    type="text"
                                    placeholder="Digite seu CPF"
                                    mask="999.999.999-99" 
                                    maskChar={null}
                                  />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                <Input 
                                  label="Data de Nascimento"
                                  name="birthday"
                                  required="true"
                                  obs="Ex: 12/01/1996"
                                  type="date"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                <Select 
                                  label="Sexo"
                                  name="sex"
                                  required="true"
                                  obs="Ex: Feminino"
                                >
                                  <option value="">Selecione seu sexo ...</option>
                                  <option value="1">Masculino</option>
                                  <option value="2">Feminino</option>
                                </Select>
                              </div>
                            </div>
                            <div className="form-group">
                              <Input 
                                label="Email"
                                name="email"
                                required="true"
                                obs="Ex: exemplo@exemplo.com"
                                type="email"
                                placeholder="Digite seu email princial"
                              />
                            </div>
                            <div className="form-group">
                              <Input 
                                label="Email Alternativo"
                                name="other_email"
                                obs="Ex: exemplo2@exemplo.com"
                                type="email"
                                placeholder="Digite seu email alternativo"
                              />
                            </div>
                            <div className="row">
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                <Select 
                                    label="Estado"
                                    name="state"
                                    required="true"
                                    obs="Estado de origem"
                                    onChange={(e) => setState(e.target.value)}
                                  >
                                  <option value="">Selecione seu estado...</option>
                                  {states.map((st, i) => (
                                    <option key={i} value={st.sigla}>{st.nome}</option>
                                  ))}
                                </Select>
                              </div>
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                  <Select 
                                    label="Cidade"
                                    name="city"
                                    required="true"
                                    obs="Cidade de origem"
                                  >
                                  <option value="">Selecione seu estado ...</option>
                                  {cities.map((city, i) => (
                                    <option key={`city-${i}`} value={city.nome}>{city.nome}</option>
                                  ))}
                                </Select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                  <InputMask 
                                    label="Fone Wpp"
                                    name="phone1"
                                    required="true"
                                    obs="Ex: (99)99999-9999"
                                    type="text"
                                    placeholder="Digite seu número principal"
                                    mask="(99)99999-9999"
                                    maskChar={null}
                                  />
                              </div>
                              <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                  <InputMask 
                                    label="Fone Alternativo"
                                    name="phone2"
                                    obs="Ex: (99)99999-9999"
                                    type="text"
                                    placeholder="Digite seu número principal"
                                    mask="(99)99999-9999"
                                    maskChar={null}
                                  />
                              </div>
                            </div>
                            {/* Render da entidade de cada usuário */}
                            {(level === 'aluno' || level === 'professor') && renderAcademy()}
                            
                            {level !== 'empresa' && renderAddress()}

                            {level === 'empresa' && renderCompany()}

                            <div className="form-divider">
                              Sistema
                            </div>
                            <div className="row">
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                    <Input 
                                      label="Senha"
                                      name="password"
                                      required="true"
                                      obs="Senha deve conter no mínimo 8 caracteres"
                                      type="password"
                                      placeholder="Digite uma senha"
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6">
                                  <Input 
                                    label="Confirmar Senha"
                                    name="password_confirmation"
                                    required="true"
                                    obs="As senhas devem corresponder"
                                    type="password"
                                    placeholder="Confirme sua senha"
                                  />
                                </div>
                            </div>
                            <div className="form-group">
                              <Button type="submit" className="btn btn-primary btn-lg btn-block" loading={loading} name="Cadastrar" loadName="Cadastrando..."></Button>
                            </div>
                        </Form>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </Main>
    );
}

export default withRouter(SignUp);