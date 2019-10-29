import {Modal, Button} from 'react-bootstrap';
import React, { useState, useEffect}  from 'react';
import {Link} from 'react-router-dom';

import {showSolicitation, propostaSolicitation} from '../../services/api';

function ModalSolicitation(props) {
    const [show, setShow] = useState(false);

    const [state, setState] = useState({
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
	  	loadpage:true
    });

    useEffect(() => {
        async function init(){
            const res = await showSolicitation(props.children);
            setState({...state, solicitation:res.data[0], user:props.user});
            console.log(res);
            

        }
        
        init();
        
    }, []);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <React.Fragment>
        <a variant="primary" className="under" onClick={handleShow} style={{cursor:'pointer'}}>
	        {props.children}
        </a>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.children}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ScrollStyle">
                          
            </div>              
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
  export default ModalSolicitation;
