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

        try{
            const res = await showSolicitation(name);
            const phase = this.state.status.filter((value) => value.number == res.data[0].status)[0].descripiton
            
            this.setState({solicitation:res.data[0], phase})
        }catch(error){
            alert(`Algo de errado acomteceu ou você não tem permissão para acessar esta página.`);
            this.props.history.push('/solicitacoes')
        }

        store.subscribe(() =>{
            this.setState({
                user:store.getState().user.user
            })
        });
        store.dispatch({
            type:'REQUEST_USER'
        });
        console.log(this.state);     
   }

  handleShow = () => this.setState({show:true});
  handleClose = () => this.setState({show:false});

  render() {
		const {solicitation} = this.state; 

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
                    <strong>Status: </strong> <span id="status" style={{color:(solicitation.status < 1) ? 'red' : ((solicitation.status == 7) ? 'green' : 'blue')}}><strong>{this.state.phase}</strong></span><br />
                </p>
                <p>
                    <strong>Solicitante: </strong><span id="detalhe_Solicitante"><Link to={`/usuarios/ver-perfil/${solicitation.user.id}`}>{solicitation.user.name}</Link></span><br />
                </p>
                </div>              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
  }
}
