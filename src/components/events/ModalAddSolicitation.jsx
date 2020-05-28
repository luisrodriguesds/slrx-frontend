import {Modal, Button} from 'react-bootstrap';
import React, { useState, useEffect }  from 'react';

import Eppendorf from '../../assets/img/eppendorf_1.5ml.jpg';
import ButtonLoad from '../../components/events/LoadingButtom';
import {getGap, getEquipment, postSolicitation} from '../../services/api';

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
            <Modal.Title>Cadastro de Amostra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
          <form className="needs-validation" onSubmit={onSubmit} method="post" id="" noValidate>
					        
					  <div className="card-body">
                <div className="form-divider">Tipo de Análise e Equipamento</div>
                <div className="form-group">
                  <div className="control-label">Selecione o tipo de análise <Red /></div>
                  <div className="custom-switches-stacked mt-2">
                    <label className="custom-switch">
                      <input type="radio" name="method" value="DRX" onChange={(e) => (_onChange(e) )} className="custom-switch-input" />
                      <span className="custom-switch-indicator"></span>
                      <span className="custom-switch-description">DRX</span>
                    </label>
                    <label className="custom-switch">
                      <input type="radio" name="method" value="FRX" onChange={(e) => (_onChange(e))} className="custom-switch-input" />
                      <span className="custom-switch-indicator"></span>
                      <span className="custom-switch-description">FRX</span>
                    </label>
                  </div>
                </div>
								<div className="full-form" style={{display:(state.data.method !== '') ? 'block': 'none'}}>
									<div className="form-group">
										<label>Equipamento <Red /></label>
										<select className="form-control" value={state.equiSelect} onChange={(e) => _onChange(e)} name="equipment_id" required>
											<option value=""> Selecione o Equipamento ...</option>
											{state.equipments.map(equipment => {
												if (state.data.method == 'FRX') {
													if (equipment.type == 'FRX') {
														return (
															<option key={equipment.id} value={equipment.id}>{equipment.name}</option>
															)
													}
												}else{
													if (equipment.type == 'DRX') {
														return (
															<option key={equipment.id} value={equipment.id}>{equipment.name}</option>
															)
													}
												}
											}
											)}
										</select>
										<div className="invalid-feedback">
											Como? Não entendi.
										</div>
									</div>
									<div className="form-divider">Informações da Amostra</div>
									<div className="form-group">
										<label>Escolha o tipo da amostra <Red /></label>
										<select name="shape"  className="form-control" onChange={(e) => _onChange(e)} required>
											<option value="">Selecione o tipo da amostra ...</option>
											<option selected value="Pó">Pó {state.method == 'DRX' ? '- Mínimo de 1 grama, leve o pó peneirado e/ou macerado, preferência 230 mesh' : '- Leve o pó peneirado e/ou macerado'} </option>
											<option value="Filme">Filme {state.method == 'DRX' ? '- Devem ter máx. 15x15mm2, espessura máx. de 3mm e devem ser planos' : '- Devem ter máx. de 2x2 cm2 e devem ser planos'}</option>
											<option value="Pastilha">Pastilha {state.method == 'DRX' ? '- Disco devem ter máx. 15mm de diâmetro ou quadrado 15x15mm2, devem ter espessura máx. de 3mm e devem ser planos' : ' - Diâmetro menor: 17-19,5 mm, diâmetro máx. 30-44mm'}</option>
											<option value="Eletródo">Eletródo {state.method == 'DRX' ? '- Disco devem ter máx. 15mm de diâmetro ou quadrado 15x15mm2, espessura máx. de 3mm e devem ser planos' : '- Devem ter máx. 2x2cm2 e devem ser planos'} </option>
											<option value="Outro">Outro</option>
										</select>
										<div className="invalid-feedback">
											Como? Não entendi.
										</div>
									</div>
									<div className="form-divider"><strong>Observações sobre o volume da amostra</strong></div>
									<div className="text-danger">*Sua amostra deve ter um volume mínimo de 0.5 ml.</div>
									<div className="text-danger">*Amostras com um volume menor que 0.5 ml não serão aceitas.</div>
									<div className="form-group text-center img-solicitation">
										<img src={Eppendorf} alt="Eppendorf de 1,5 ml"/>
									</div>
									<div className="form-group">
									<label>Composição <Red /></label>
									<input type="text" name="composition" onChange={(e) => _onChange(e)} className="form-control" required />
									<div className="invalid-feedback">
										Campo Obirgatório!!
									</div>
									</div>
									<div className="form-group">
									<div className="control-label">Segurança</div>
									<div className="custom-switches-stacked mt-2">
										<label className="custom-switch">
										<input type="checkbox" name="flammable" onChange={(e) => handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Inflamável</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="toxic" onChange={(e) => handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Tóxico</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="hygroscopic" onChange={(e) => handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Higroscópico</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="corrosive" onChange={(e) => handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Corrosivo</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="radioactive" onChange={(e) => handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Radioativo</span>
										</label>
									</div>
									</div>
									<div className="form-divider"><strong>Configurações da análise</strong></div>
								  {state.data.method == 'DRX' ? DRXrender() : ''} 
									{state.data.method == 'FRX' ? FRXrender() : ''}
									<div className="form-divider"><strong>Observações Gerais</strong></div>
									<div className="form-group">
										<label>Observações</label>
										<textarea className="form-control" name="note" onChange={(e) => _onChange(e)} defaultValue={""} />
									</div>
									<div className="form-divider"><strong>Range de Amostras</strong></div>
									<div className="form-group">
										<label>Quantas amostras deseja cadastrar?</label><br />
										<label style={{color:'red'}}>No máximo 20 amostrar por solicitação</label>
										<input type="text" className="form-control" name="quantity" onChange={(e) => _onChange(e)} placeholder="Digite quantas amostras serão cadastradas nesta Solicitação" min={1} max={20} />
									</div>
								</div>
					          </div>
					          <div className="card-footer text-right">
	                    <ButtonLoad type="submit" className="btn btn-primary btn-lg btn-block" loading={state.loading} name="Solicitar" loadName="Solicitando..."></ButtonLoad>
					          </div>
					      </form>
          
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }

  export default ModalProposta