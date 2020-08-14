import {Modal, Button} from 'react-bootstrap';
import React, { useState }  from 'react';

import AddSolicitation from '../../pages/solicitations/addSolicitation';

function ModalProposta(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    return (
      <React.Fragment>
        <Button variant="primary" title={props.title} className="btn btn-primary ml-1 mr-1" onClick={handleShow}>
          Cadastrar Amostras
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<AddSolicitation 
							user_id={props.user_id} 
							handleLoadSol={props.handleLoadSol} 
							handleClose={handleClose}
						/>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }

  export default ModalProposta