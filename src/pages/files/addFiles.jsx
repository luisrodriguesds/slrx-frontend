import React from 'react';

import Main from '../../components/template/Main';
import Button from '../../components/events/LoadingButtom';
import {postUsefulFiles} from '../../services/api';

const Red = () => (<span style={{color:'red'}}>*</span>);
export default class addFiles extends React.Component {
    state = {
        data:{},
        file:null,
		loading:false,
	  	loadpage:true
    }
    
    _onChange = (e) => {
        let value = e.target.value;
  
        const data = {...this.state.data};
        data[e.target.name] = value;
        this.setState({data});
    }

    onChangeFile(e) {
	    this.setState({file:e.target.files[0]})
    }
    
    handleSubmit = async (e) => {
		e.preventDefault();
		
		if (this.state.file == null) {
			alert("Campo Enviar resultado obrigatório")
			return false;
		}
		
		try{
			let res = await this.fileUpload(this.state.file);
			if (res.data.error == true) {
				alert(res.data.message);
			}else{
				alert(res.data.message);
				this.props.history.push("/arquivos-uteis");
			}
		}catch(e){
			alert("Algo de errado aconteceu, por favor recarrege sua página");
			// console.log(e);
		}

    }
    
    fileUpload = async (file) => {
        const formData = new FormData();
        //Add campos aqui
	    formData.append('name', this.state.data.name)
	    formData.append('description', this.state.data.description)
	    formData.append('file', file)
	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data'
	        }
        }
        // console.log(formData);
	    return await postUsefulFiles(formData, config)
	 }

    render() {
        return (
            <Main title="Cadastrar Arquivo">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-sm-12 col-lg-7">
                            <div className="card">
                                <form className="needs-validation" encType="multipart/form-data" onSubmit={(e) => this.handleSubmit(e)} id="" noValidate>
                                    <div className="card-header">
                                        <h4>Cadastrar Arquivo</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Nome do Arquivo <Red /></label>
                                            <input type="text" className="form-control" name="name" onChange={(e) => (this._onChange(e) )} placeholder="Digite o nome do arquivo" required />
                                            <div className="invalid-feedback">
                                                Como? Não entendi.
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Descrição do Arquivo <Red /></label>
                                            <textarea className="form-control" style={{height:'100px'}} name="description" onChange={(e) => (this._onChange(e) )} name="description" required />
                                            <div className="invalid-feedback">
                                                Como? Não entendi.
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Arquivo <Red /></label>
                                            <div className="row">
                                                <div className="col-12">
                                                    <input type="file" id="file" name="file" onChange={(e) => this.onChangeFile(e)} required="" data-validation="size required required required" data-validation-max-size="1M" data-validation-event="keyup change" />    
                                                </div>
                                            </div>
                                            <div className="invalid-feedback">
                                                Como? Não entendi.
                                            </div>
                                        </div>
                                        <div className="card-footer text-right">
                                            <Button type="submit" className="btn btn-primary btn-lg btn-block" loading={this.state.loading} name="Enviar" loadName="Enviando..."></Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        )
    }
}