import {Modal, Button} from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';

import Eppendorf from '../../assets/img/eppendorf_1.5ml.jpg';
import ButtonLoad from '../../components/events/LoadingButtom';
import {getGap, getEquipment, postSolicitation} from '../../services/api';

import AddSolicitation from '../../pages/solicitations/addSolicitation';

const Red = () => (<span style={{color:'red'}}>*</span>);
const inital = {
  data:{
    "equipment_id":3,
    "gap_id":2,
    "method":"",
    "settings":{},
    "composition":"",
    "shape":"Pó",
    "flammable":"Não",
    "radioactive":"Não",
    "toxic":"Não",
    "corrosive":"Não",
    "hygroscopic":"Não",
    "note":"",
    "quantity":1
  },
  equipments:[],
  equiSelect:2,
  method:'',
  gaps:[],
  setting_drx:{tecnica:"DRX", dois_theta_inicial:"10°", dois_theta_final:"100°", delta_dois_theta:0.013},
  dois_theta_inicial:[],
  dois_theta_final:[],
  setting_frx:{tecnica:"FRX", resultado:"elementos", medida:"semi-quantitativa"},
  loading:false,
    loadpage:true
}
function ModalProposta(props) {
    const [show, setShow] = useState(false);
    const [state, setState] = useState(inital);

    useEffect(() => {
      async function init(){
        const equipments= await getEquipment();
        const gaps 		= await getGap();
        const dois_theta_inicial = [];
        const dois_theta_final = [];
        for (let i = 3; i <= 119; i++) {
          dois_theta_final.push(i);
        }
        for (let i = 4; i <= 120; i++) {
          dois_theta_inicial.push(i);
        }
		    setState({...inital, dois_theta_inicial, dois_theta_final, gaps:gaps.data, equipments:equipments.data });	
      }
      init()
    }, [])

    function _onChange(e) {
      let value = e.target.value;
      if (e.target.name == 'method') {
      	if (value == 'DRX') {
    		setState({...state, equiSelect:2, method:'DRX'});
    	}else if(value == 'FRX'){
			  setState({...state, equiSelect:3, method:'FRX'});    		
    	}
    }

    const data = {...state.data};
    data[e.target.name] = value;
	  setState({...state, data});
	//   console.log(state);
  }
  
  async function onSubmit(e){
		e.preventDefault();
		//Set loading
		setState({...state, loading:true});
		setTimeout(() => {
			setState({...state, loading:false});
		  }, 2000);
		  
		//Layer of Validation
  
		//send register to backend
		//Check em outros erros
		try {
			let data = {...state.data}
				data.settings = (data.method == 'DRX') ? state.setting_drx : state.setting_frx;
        data.equipment_id = state.equiSelect;      
        data.user_id = props.user_id
        const res = await postSolicitation(data);
        if (res.data.error == true) {
          window.scroll(0,0);
          alert(`${res.data.message}`);  
        }else{
          setState(inital)
          await props.handleLoadSol(props.user_id)
          handleClose()  			
          alert(`${res.data.message}`);
          // props.history.push("/solicitacoes");
        }
		} catch (error) {
		  alert(`Algo inesperado aconteceu, informe ao suporte técnico e atualize sua página.`);        
		//   props.history.push("/");        
		}
		
  }
  
  function handleCheckbox(e){
    let value = e.target.value;
      value = (state.data[e.target.name] == 'Sim') ? 'Não' : 'Sim';
  
    const data = {...state.data};
    data[e.target.name] = value;
    setState({...state, data});
  }

  function handleDRX(e){
    let value = e.target.value;
    const setting_drx = {...state.setting_drx};
    setting_drx[e.target.name] = value;
    setState({...state, setting_drx});
  }

  function handleFRX(e){
    let value = e.target.value;
    const setting_frx = {...state.setting_frx};
    setting_frx[e.target.name] = value;
    // console.log(setting_frx);
    setState({...state, setting_frx});
    // console.log(state);
  }

  function DRXrender(){
		return (
			<React.Fragment>
			<div className="form-group">
				<label>2θ inicial</label>
				<select name="dois_theta_inicial" onChange={(e) => handleDRX(e)} className="form-control" required>									
				{state.dois_theta_inicial.map((value, i) => (
						<option key={i} value={value} selected={(value == '10') ? true : false}>{value}°</option>
					))}
				</select>
				<div className="invalid-feedback">
				Como? Não entendi.
				</div>
			</div>
			<div className="form-group">
				<label>2θ final</label>
				<select name="dois_theta_final" onChange={(e) => handleDRX(e)} className="form-control" required>								
					{state.dois_theta_final.map((value, i) => (
						<option key={i} value={value} selected={(value == '100') ? true : false}>{value}°</option>
					))}
				</select>
				<div className="invalid-feedback">
				Como? Não entendi.
				</div>
			</div>
			<div className="form-group">
				<label>Δθ</label>
				<input type="text" name="delta_dois_theta" className="form-control" defaultValue="0,013" disabled placeholder="Digite os elementos" required />
				<div className="invalid-feedback">
					Como? Não entendi.
				</div>
			</div>
			</React.Fragment>
		)
	}

	function FRXrender(){
		return (
			<React.Fragment>
				<div className="form-group">
					<label htmlFor="">Selecione o tipo de medida <Red /></label>
					<div className="custom-control custom-radio">
						<input type="radio" name="medida" defaultValue="semi-quantitativa" defaultChecked  onChange={(e) => handleFRX(e) } className="custom-control-input" id="medida" />
						<label className="custom-control-label" htmlFor="medida">Semi-Quantitativa</label>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="">Selecione a forma dos resultados <Red /></label>
					<div className="custom-control custom-radio">
						<input type="radio" name="resultado" defaultValue="oxidos" defaultChecked  onChange={(e) => handleFRX(e) } className="custom-control-input" id="resultado_1" />
						<label className="custom-control-label" htmlFor="resultado_1">Óxidos</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" name="resultado" defaultValue="elementos"  onChange={(e) => handleFRX(e) } className="custom-control-input" id="resultado_2" />
						<label className="custom-control-label" htmlFor="resultado_2">Elementos</label>
					</div>
				</div>
			</React.Fragment>
		)
	}

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