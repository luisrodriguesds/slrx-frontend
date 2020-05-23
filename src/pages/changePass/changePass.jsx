import React, { useState, useRef } from 'react';

import {changePass} from '../../services/api';

import Main from '../../components/template/Main';

import { Form } from '@unform/web'
import Input from '../../components/form/Input'
import Button from '../../components/form/Button';
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function ChangePassPage(){
	const formRef = useRef(null)
	const [loading, setLoading] = useState(false)

	// state ={
	// 	data:{current_password:'', password:'', password_confirm:''},
	// 	loading:false
	// }

	// onSubmit = async e => {
	// 	e.preventDefault();
		
	// 	this.setState({loading:true});

	// 	setTimeout(() => {
	// 		this.setState({loading:false});
	// 	  }, 1000);

	// 	if (this.state.data.current_password === '' || this.state.data.password === '' || this.state.data.password_confirm === '') {
	// 		return;
	// 	}else if(this.state.data.password !== this.state.data.password_confirm){
	// 		alert(`As senhas não correspondem`);       
	// 		return;
	// 	}
		
	// 		//send register to backend
	// 		try {
	// 			const update = this.state.data;
	// 			const res = await changePass(update);
	// 			if (res.data.error === true) {
	// 			  alert(`${res.data.message}`);       
	// 			}else{
	// 			  alert(`${res.data.message}`);
	// 			  window.scrollTo(0,0);
	// 			  this.props.history.push("/");
	// 			//   window.location=URL_BASE+'editar-conta';
	// 			}
	// 		  } catch (error) {
	// 			alert(`Algo de errado aconteceu, procure o suporte técnico.`);
	// 		  }

	// }

	async function handleSubmit(data, { reset }){
		setLoading(true)
		try {
				const schema = Yup.object().shape({
					current_password: Yup.string()
							.required('Campo Obrigatório'),
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
						const res = await changePass(data)
						if (res.data) {
								MySwal.fire({
									title: <p>Sucesso!</p>,
									icon: 'success',
									text: res.data.message 
								}).then(() => {
									// props.history.push('/')
									reset()
									formRef.current.setErrors({});
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
		<Main title="Alterar Senha">
			<div className="container">
				<div className="row justify-content-md-center">
					<div className="col-12 col-sm-12 col-lg-8">
						<div className="card">
								<Form ref={formRef} onSubmit={handleSubmit}>
									<div className="card-header">
										<h4>Alterar Senha</h4>
									</div>
									<div className="card-body">
										<div className="form-group">
											<Input 
												label="Senha atual"
												type="password"
												name="current_password"
												placeholder="Digite uma nova senha"
												required="true"
												autoFocus
											/>
										</div>
										<div className="form-group">
											<Input 
												label="Nova senha"
												type="password"
												name="password"
												placeholder="Digite uma nova senha"
												obs="Senha deve ter no mínimo 8 caracteres"
												required="true"
											/>
										</div>
										<div className="form-group">
											<Input 
												label="Confirmar nova senha"
												type="password"
												name="password_confirmation"
												placeholder="Digite novamente"
												obs="As senhas devem corresponder"
												required="true"
											/>
										</div>
										<div className="form-group">
											<Button type="submit" className="btn btn-primary btn-lg btn-block" loading={loading} name="Salvar" loadName="Salvando..."></Button>
										</div>
									</div>
								</Form>
							</div>
					</div>
				</div>
			</div>
		</Main>
	);
	
}
