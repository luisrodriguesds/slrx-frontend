import React from 'react';

// import {getUserById} from '../../services/api';

// import Main from '../../components/template/Main';
import store from '../../store/store';
import {sendPicture} from '../../services/api';

export default class profile extends React.Component {
	
	state = {
		user:{},
		file:null
	}

	async componentDidMount(){
		
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		
		if (this.state.file == null) {
			alert("Foto Obrigatória");
			return false;
		}
		
		try{
			let res = await this.fileUpload(this.state.file);
			if (res.data.error == true) {
				alert(res.data.message);
			}else{
				alert(res.data.message);
				//Atualizar estado
				window.location=window.location.href;
			}
		}catch(e){
			alert("Algo de errado aconteceu, por favor recarrege sua página");
			// console.log(e);
		}

	}


	onChange(e) {
		console.log(this.props);
	    this.setState({file:e.target.files[0]})
	}

	fileUpload = async (file) => {
	    const formData = new FormData();
	    formData.append('id', this.props.user.id)
	    formData.append('picture', file)
	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data'
	        }
	    }

	    return await sendPicture(formData, config)
	 }

	render() {
		const {user} = this.props;

		return (
			<div className="card">
		        <form className="needs-validation" name="result_upload" method="post" encType="multipart/form-data" onSubmit={(e) => this.handleSubmit(e)} noValidate>
		          <div className="card-header">
		            <h4>Editar Perfil</h4>
		          </div>
		          <div className="card-body">
		            {/*
		            <div className="form-group">
		              <label>Como Gostaria de ser chamado?</label>
		              <input type="text" className="form-control" required />
		              <div className="invalid-feedback">
		                Como? Não entendi.
		              </div>
		            </div>
		        	*/}
		            <div className="form-group">
		              <label>Escolha uma foto de perfil</label>
		              <div className="fallback">
						<input type="file" id="result_file" name="result_file" required=""  onChange={(e) => this.onChange(e)} data-validation="size required required required" data-validation-max-size="1M" data-validation-event="keyup change" />
                      </div>
		              <div className="invalid-feedback">
		                Qual sua foto?
		              </div>
		            </div>
		            {/*
		            <div className="form-group mb-0">
		              <label>Fale um pouco sobre você</label>
		              <textarea className="form-control" required defaultValue={""} />
		              <div className="invalid-feedback">
		                Como? Não entendi.
		              </div>
		            </div>
		        	*/}
		          </div>
		          <div className="card-footer text-right">
		            <button className="btn btn-primary">Salvar</button>
		          </div>
		        </form>
		      </div>
		);
	}
}
