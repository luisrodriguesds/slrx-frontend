import React, { useRef, useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import Main from './Main';
import api from "../../services/api";

import { Form } from '@unform/web'
import Input from '../../components/form/Input'
import Button from '../../components/form/Button';
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ForgotPass(props){
    const formRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        let query = window.location.hash.split('?')
        const partes = query[1].split('&')
        let data = {}
        partes.forEach((parte) => {
            const chaveValor = parte.split('=')
            const chave = chaveValor[0]
            const valor = chaveValor[1]
            data[chave] = valor
        })

        setToken(data.token)
    }, [])

    async function handleSubmit(data){
        setLoading(true)
        try {
            const schema = Yup.object().shape({
                password: Yup.string()
                    .required('Campo Obrigatório')
                    .min(8, 'Deve ter no mínimo 8 caracteres'),
                password_confirmation: Yup.string()
                    .required('Campo Obrigatório')
                    .min(8, 'Deve ter no mínimo 8 caracteres')
                    .oneOf([Yup.ref('password'), null], 'As senhas não correspondem')
            })

            await schema.validate(data, { abortEarly: false })
            
            const MySwal = withReactContent(Swal)
            try {
                const res = await api.post(`/user/set-newpass`, {...data, token});
                if (res.data) {
                    MySwal.fire({
                      title: <p>Sucesso!</p>,
                      icon: 'success',
                      text: res.data.message 
                    }).then(() => {
                      props.history.push('/')
                    })
                }
            } catch (error) {
                if (error.response.status === 403) {
                    MySwal.fire({
						title: <p>Ops ...</p>,
						icon: 'error',
						text: error.response.data.message 
					})
                }else{
                    MySwal.fire({
						title: <p>Ops ...</p>,
						icon: 'error',
						text: 'Aconteceu um erro em nossos servidores, por favor tente novamente mais tarde ou entre em contato com o suporte.' 
					})
                }
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
				const validationErrors = {};
				err.inner.forEach(error => {
					validationErrors[error.path] = error.message;
				})
				formRef.current.setErrors(validationErrors);
			}
        }
        setLoading(false)
    }


    return (
        <Main>
            <div className="container">
                <div className="row justify-content-md-center mb-5">
                    <div className="col-12 col-sm-12 col-lg-6">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4>Nova Senha</h4>
                            </div>
                            <div className="card-body">
                            <p className="text-muted">Digite sua nova senha</p>
                            <Form ref={formRef} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <Input 
                                        label="Senha"
                                        type="password"
                                        name="password"
                                        placeholder="Digite uma nova senha"
                                        obs="Senha deve ter no mínimo 8 caracteres"
                                        required="true"
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                <Input 
                                    label="Confirmar Senha"
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Digite novamente a nova senha"
                                    obs="As senhas devem corresponder"
                                    required="true"
                                />
                                </div>
                                <div className="form-group">
                                    <Button type="submit" className="btn btn-primary btn-lg btn-block" loading={loading} name="Enviar" loadName="Enviando ..."></Button>
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
export default withRouter(ForgotPass)
