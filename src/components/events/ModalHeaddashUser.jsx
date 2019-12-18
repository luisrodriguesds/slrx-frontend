import {Modal, Button} from 'react-bootstrap';
import React, { useState, useEffect}  from 'react';


import {showSolicitation} from '../../services/api';

function ModalSolicitation(props) {
    const [show, setShow] = useState(false);

    const [state, setState] = useState({
		user:{},
		phase:'',
		file:null,
		loading:false,
	  	loadpage:true
    });

    useEffect(() => {
        
    }, []);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <React.Fragment>
        <a variant="primary" title="Clique aqui para ver o histório de medidas" className="under" onClick={handleShow} style={{cursor:'pointer', textDecoration:'underline'}}>
	        {props.children}
        </a>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contagem de {props.method} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="table-responsive">
                <table class="table">
                    <tr>
                        <th>#</th>
                        <th>Tipo de Usuário</th>
                        <th>Contagem</th>
                    </tr>
                    {props.data && console.log(props.data)}
                    {props.data && props.data.access_levels.map((v,i) => (
                        <tr>
                            <td>{i+1} </td>
                            <td>{v.access_level} </td>
                            <td>{v.count} </td>
                        </tr>
                    ))}
                </table>
            </div>             
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
  export default ModalSolicitation;
