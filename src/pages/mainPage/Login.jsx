import React, { useState, useRef } from 'react';
import {Link, withRouter} from 'react-router-dom';

import Button from '../../components/events/LoadingButtom';
import InputIcon from '../../components/form/InputIcon';
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useAuth } from '../../context/auth'

function Login(){
    const { signIn } = useAuth()

    const formRef = useRef(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const schemaLogin = Yup.object().shape({
                email: Yup.string()
                    .email('Digite um válido')
                    .required('Campo Obrigatório'),
                password: Yup.string()
                    .min(8, 'Número de caracteres menor que 8')
                    .required('Campo Obrigatório')
            })

            await schemaLogin.validate(data, {
                abortEarly:false
            })

            const response = await signIn(data)
            if (response.error) {
                setError(response.message)
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const message = {}
                //Transforma as mensagens e array para obj
                err.inner.forEach(error => {
                    message[error.path] = error.message
                })
                formRef.current.setErrors(message)
            }
        }
       setLoading(false)
    }


    return (
        <div className="card" id="sample-login">
            <Form ref={formRef} onSubmit={onSubmit}>
            <div className="card-header">
                <h4>Sistema LRX - Login</h4>
            </div>
            <div className="card-body pb-0">
                {/* <p className="text-muted">Click login to change the card to progress mode.</p> */}
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="form-group" style={{marginBottom:'5px'}}>
                    <InputIcon 
                        name="email"
                        label="Email"
                        icon="fas fa-envelope"
                        placeholder="Digite seu email"
                        type="text"
                    />
                </div>
                <div className="form-group" style={{marginBottom:'5px'}}>
                    <InputIcon 
                        name="password"
                        label="Senha"
                        icon="fas fa-lock"
                        placeholder="Digite sua senha"
                        type="password"
                    />
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
                    <Button type="submit" className="btn btn-primary" loading={loading} name="Login" loadName="Carregando ..."></Button>
                    <Link to="/cadastro" className="ml-2" title="Alunos, Professores, Operadores, Empresa e Funcionários">Cadastre-se</Link>
                    <Link to="/recuperar-senha" className="ml-2">Esqueci Minha Senha</Link>
                </div>
            </div>
            </Form>
        </div>

    
        );

}

export default withRouter(Login)