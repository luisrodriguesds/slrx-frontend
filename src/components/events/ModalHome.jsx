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
        <a variant="primary" title="Clique aqui para ver o histório de medidas" className="under" onClick={handleShow} style={{cursor:'pointer', color:'#27736d'}}>
	        {props.children}
        </a>
  
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title> Sistema de Solicitação de Análises de Raios-X </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body">
                <p>
                    A fluorescência de raios-X é uma das técnicas mais eficientes, não destrutiva e precisas na detecção e quantificação de elementos químicos nas mais variadas formas (materiais sólidos, líquidos, tecidos, plásticos, etc.), também podendo detectar baixas concentrações de elementos pesados, da ordem de ppm (parte por pmilhões). Desse modo, um equipamento de fluorescência pode ser empregado em várias situações ligadas à indústria eletro-metal-mecânico, tais como:
                </p>
                <ul>
                    <li>determinação de impurezas presentes nas ligas metálicas e eletrocerâmicas;</li>
                    <li>determinação de composição de ligas metálicas e sua estequiometria;</li>
                    <li>certificação da matéria prima usadas em toda cadeia produtiva ;</li>
                    <li>certificação dos produtos industrializados (dando concentrações de elementos químicos cobrindo do Fluor ao Urânio);</li>
                    <li>acompanhamento dos rejeitos dentro de toda cadeia produtiva e as possíveis contaminações.</li>
                </ul>
                <p>
                    A difratometria de pó por raios-X é uma técnica não destrutiva e largamente utilizada na identificação de materiais cristalinos e pode ser empregada para determinar a composição química de substâncias. De uma medida de difração de amostras policristalinas pode-se determinar experimentalmente os espaçamentos interplanares dos planos cristalinos e as intensidades relativas das reflexões. Essa medida que também é chamada de padrão de difração é característico de uma determinada substância cristalina, ou seja, cada substância tem o seu registro próprio que é diferente de outras substâncias. As intensidades das reflexões têm sua importância na determinação de estruturas e na identificação de substâncias que pode ser feita pela comparação do padrão de difração medido com o padrão de difração que se encontra catalogado no banco de dados chamado de ICDD.
                </p>
                <p>
                Na indústria, a técnica de difração em amostras policristalinas é uma poderosa ferramenta para controle de qualidade de produtos, na investigação e manufatura de uma variedade de materiais tais como: cerâmicos, metálicos, farmacêuticos, minerais, corrosivos, pigmentos, gemas, soldas, etc.
                </p>
                <p><strong>Possibilidades de medida</strong></p>
                <ul>
                    <li>Difração em pó com alta resolução somente para refinamento de estrutura e identificação de fases</li>
                    <li>Transformação de fases em amostras policristalinas</li>
                    <li>Difração a baixo ângulo</li>
                    <li>Espalhamento a baixo ângulo (distribuição de tamanho de partículas)</li>
                    <li>Difração em filmes finos (identificação de fases e determinação de espessura)</li>
                    <li>Difração em amostras condicionadas em capilar (resolução de estrutura)</li>
                    <li>Difração em amostras (higroscópicas) por transmissão</li>
                </ul>
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
