import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import store from '../../store/store';

import {getUser, showSolicitation, nextStepSolicitationFiveToSex} from '../../services/api';

// import { Container } from './styles';


export default class events extends Component {

   state = {
        solicitation:{user:{name:'', id:''}, equipment:{name:''}, status:'', settings:{}},
        status:[
            {number:-3, descripiton:'Cancelada por falta de entrega da amostra.'},
            {number:-2, descripiton:'Cancelada pelo operador.'},
            {number:-1, descripiton:'Cancelada pelo responsável.'},
            {number:1, descripiton:'Aguardando autorização'},
            {number:2, descripiton:'Aguardando aprovação do Laboratório'},
            {number:3, descripiton:'Aguardando confirmação da entrega da amostra'},
            {number:4, descripiton:'Na fila do equipamento'},
            {number:5, descripiton:'Em processo de análise'},
            {number:6, descripiton:'Análise concluída. Aguardando recolhimento da amostra'},
            {number:7, descripiton:'Solicitação Finalizada'},
        ],
        user:{},
        phase:'',
        file:null,
        loading:false,
        loadpage:true,
        show:false
   }

   async componentDidMount(){
        const name = this.props.children;
        this.setState({solicitation:this.props.solicitation});
        // try{
        //     // const res = await showSolicitation(name);
        //     // const phase = this.state.status.filter((value) => value.number == res.data[0].status)[0].descripiton
            
        //     // this.setState({solicitation:res.data[0], phase})
        // }catch(error){
        //     alert(`Algo de errado acomteceu ou você não tem permissão para acessar esta página.`);
        //     this.props.history.push('/solicitacoes')
        // }

        store.subscribe(() =>{
            this.setState({
                user:store.getState().user.user
            })
        });
        store.dispatch({
            type:'REQUEST_USER'
        });
        // console.log(this.state);     
   }

  handleShow = () => this.setState({show:true});
  handleClose = () => this.setState({show:false});

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
                window.location=window.location.href;
                //Atualizar estado
                window.scroll(0,0);
                //Avisar ao redux
                const name = this.props.children;

                res = await showSolicitation(name);
                const phase = this.state.status.filter((value) => value.number == res.data[0].status)[0].descripiton
                
                this.setState({solicitation:res.data[0], phase})
            }
        }catch(e){
            alert("Algo de errado aconteceu, por favor recarrege sua página");
            console.log(e);
        }

    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
    }

    fileUpload = async (file) => {
        const formData = new FormData();
        formData.append('id', this.props.solicitation.id)
        formData.append('sample', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return await nextStepSolicitationFiveToSex(formData, config)
    }


  render() {
		const {solicitation} = this.props; 

    return (
        <React.Fragment>
            <a variant="primary" className="under" onClick={this.handleShow} style={{cursor:'pointer'}}>
                {this.props.children}
            </a>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.children}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ScrollStyle">
                    <p>
                        <strong>Status: </strong> <span id="status" style={{color:(solicitation.status < 1) ? 'red' : ((solicitation.status == 7) ? 'green' : 'blue')}}><strong>{this.state.status.filter((value) => value.number == solicitation.status)[0].descripiton}</strong></span><br />
                    </p>
                    <p>
                        <strong>Solicitante: </strong><span id="detalhe_Solicitante"><Link to={(solicitation.user ? `/usuarios/ver-perfil/${this.state.solicitation.user.id}` : ``)}>{(solicitation.user ? this.state.solicitation.user.name : '')}</Link></span><br />
                    </p>
                    <p>
                        <strong>Data da Solicitação: </strong><span id="detalhe_DataSolicitacao">{new Date(solicitation.created_at).toLocaleString('pt-BR')}</span><br />
                        {solicitation.received_date != null && <React.Fragment> <strong>Data do Recebimento: </strong><span id="detalhe_DataRecebimento">{new Date(solicitation.received_date).toLocaleString('pt-BR')}</span> <br /> </React.Fragment>}
                        {solicitation.conclusion_date != null || solicitation.conclusion_date == '0000-00-00 00:00:00' && <React.Fragment> <strong>Data da Conclusão: </strong><span id="detalhe_DataConclusao">{new Date(solicitation.conclusion_date).toLocaleString('pt-BR')}</span> </React.Fragment>}
                    </p>
                    <p>
                        <strong>Equipamento: </strong> <span id="detalhe_Equipamento">{solicitation.equipment.name}</span><br />
                    </p>
                    <p>
                        <strong>Composição: </strong><span id="detalhe_Composicao">{solicitation.composition}</span><br />
                        <strong>Tipo: </strong> <span id="detalhe_Tipo">{solicitation.shape}</span><br />
                    </p>
                    {
                        solicitation.method == 'DRX' && (

                            <p id="detelhe_Configuracao_DRX">
                                <strong>2θ Inicial: </strong><span id="detalhe_2ThetaInicial">{solicitation.settings.dois_theta_inicial}</span><br />
                                <strong>2θ Final: </strong><span id="detalhe_2ThetaFinal">{solicitation.settings.dois_theta_final}</span><br />
                                <strong>Δθ: </strong><span id="detalhe_DeltaTheta">{solicitation.settings.delta_dois_theta}</span><br />
                            </p>
                        )
                    }

                    {
                        solicitation.method == 'FRX' && (
                            <p id="detelhe_Configuracao_FRX">
                                <strong>Tipo de Medida: </strong><span id="detalhe_TipoMedida">{solicitation.settings.medida}</span><br />
                                <strong>Forma do Resultado: </strong><span id="detalhe_FormaResultado">{solicitation.settings.resultado}</span><br />
                            </p>
                        )

                    }

                    <p>
                        <strong>Segurança: </strong>
                            <span id="detalhe_Seguranca">
                            {solicitation.corrosive == 'Sim' && 'Corrosivo, '}
                            {solicitation.flammable == 'Sim' && 'Inflamável, '}
                            {solicitation.hygroscopic == 'Sim' && 'Hidroscópico, '}
                            {solicitation.radioactive == 'Sim' && 'Radioativo, '}
                            {solicitation.toxic == 'Sim' && 'Tóxico'}
                            </span>
                        <br />
                        <strong>Observações: </strong><span id="detalhe_Observacoes">{solicitation.note}</span><br />
                        <span id="detalhe_Corrosao"></span><br />
                    </p>

                    <p>
                        {(this.state.user.permission == true && solicitation.status == 6) ? <a href={solicitation.download} className="btn btn-danger">Download da medida</a> : (((solicitation.status == 7) ? <a href={solicitation.download} className="btn btn-danger">Download da medida</a> : '')) }
                    </p>

                </div> 
                <div className="bloco relativo" id="UploadResultado" style={{display:((solicitation.status == 5) ? 'block' : 'none')}}>
                    {/*
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                        </div>
                    */}
                    <h3>Enviar Resultado</h3>
                    <form name="result_upload" method="post" encType="multipart/form-data" onSubmit={(e) => this.handleSubmit(e)} className="disabled-with-errors has-validation-callback">
                        <input type="file" id="result_file" name="result_file" required=""  onChange={(e) => this.onChange(e)} data-validation="size required required required" data-validation-max-size="1M" data-validation-event="keyup change" />
                        <input type="submit" value="Enviar" className="btn btn-primary" />
                    </form>
                </div>             
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                Save Changes
                </Button> */}
            </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
  }
}
