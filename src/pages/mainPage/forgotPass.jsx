import React, { useRef, useState } from 'react';
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
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	// state = {
	// 	error:'',
	// 	data:{email:''},
	// 	loading:false
	// };



	async function handleSubmit(data) {
		setLoading(true)

		try {
			const schema = Yup.object().shape({
				email: Yup.string().email('Email inválido').required('Campo Obrigatório')
			})

			await schema.validate(data, {abortEarly: false })
      const MySwal = withReactContent(Swal)
			try {
				const res = await api.post(`/user/request-newpass`, { email: data.email })
				if (res.data) {
          MySwal.fire({
            title: <p>Sucesso!</p>,
            icon: 'success',
            text: res.data.message 
          }).then(() => {
            props.history.push('/')
          })
        }
			} catch (err) {
				if (err.response.status === 403) {
					setError(err.response.data.message)	
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
				});
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
								<h4>Esqueci Minha Senha</h4>
							</div>
							<div className="card-body">
								<p className="text-muted">Será enviado um email de recuperação de senha para o email informado</p>
									{error && <div className="alert alert-danger" role="alert">{error}</div>}                
									<Form ref={formRef} onSubmit={handleSubmit}>
										<div className="form-group">
											<Input 
												label="Email"
												type="text"
												name="email"
												placeholder="Digite seu email"
												obs="Ex: exemplo@ememplo.com"
												required="true"
												autoFocus
											/>
										</div>
										<div className="form-group">
											<Button type="submit" className="btn btn-primary btn-block" loading={loading} name="Enviar" loadName="Enviando ..."></Button>
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
