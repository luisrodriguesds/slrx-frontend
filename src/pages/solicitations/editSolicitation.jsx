import React from 'react';
import {Link} from 'react-router-dom';

import {getGap, getEquipment, postSolicitation, showSolicitation, editSolicitation} from '../../services/api';

import Eppendorf from '../../assets/img/eppendorf_1.5ml.jpg';

import Main from '../../components/template/Main';
import Button from '../../components/events/LoadingButtom';

export default class addSolicitation extends React.Component {
	// "settings":{"tecnica":"DRX", "dois_theta_inicial":10, "dois_theta_final":100, "delta_dois_theta":0.013},
	// "settings":{"tecnica":"FRX", "resultado":"oxidos", "medida":"semi-quantitativa"},
	state = {
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

	async componentDidMount(){
		//load equipments
		const equipments= await getEquipment();
		const gaps 		= await getGap();
		const dois_theta_inicial = [];
		const dois_theta_final = [];
		for (let i = 3; i <= 119; i++) {
			dois_theta_final.push(i+'°');
		}
		for (let i = 4; i <= 120; i++) {
			dois_theta_inicial.push(i+'°');
		}
		this.setState({...this.state, gaps:gaps.data, equipments:equipments.data, dois_theta_inicial, dois_theta_final});
		if (this.props.computedMatch.params.name) {
			const name = this.props.computedMatch.params.name;
			await this.handleEdit(name);
		}
	}

	handleEdit = async (name) => {
        //Pegar a solicitação
        try {
            const res = await showSolicitation({name});
            
            if (res.data[0].method == 'DRX') {
                this.setState({
                    data:res.data[0], 
                    equiSelect:res.data[0].equipment_id,
                    setting_drx:res.data[0].setting,
                });
            }else{
                this.setState({
                    data:res.data[0], 
                    equiSelect:res.data[0].equipment_id,
                    setting_frx:res.data[0].settings,
                });
            }
            console.log(this.state);
        } catch (error) {
            alert(`Amostra não encontrada.`);
        }
	} 

	_onChange = (e) => {
      let value = e.target.value;
      if (e.target.name == 'method') {
      	if (value == 'DRX') {
    		this.setState({data:{method:'DRX', equipment_id:2, ...this.state.data}, equiSelect:2});
    	}else if(value == 'FRX'){
    		this.setState({data:{method:'FRX', equipment_id:3, ...this.state.data}, equiSelect:3});
    	}
      }

      const data = {...this.state.data};
      data[e.target.name] = value;
	  this.setState({data});
	  console.log(this.state);
	}
	
	handleCheckbox = (e) => {
	  	let value = e.target.value;
	  		value = (this.state.data[e.target.name] == 'Sim') ? 'Não' : 'Sim';
	  
		const data = {...this.state.data};
		data[e.target.name] = value;
		this.setState({data});
	}

	handleDRX = (e) => {
		let value = e.target.value;
		const setting_drx = {...this.state.setting_drx};
		setting_drx[e.target.name] = value;
		this.setState({setting_drx});
	}

	handleFRX = (e) => {
		let value = e.target.value;
		const setting_frx = {...this.state.setting_frx};
		setting_frx[e.target.name] = value;
		console.log(setting_frx);
		this.setState({setting_frx});
		console.log(this.state);
	}

	onSubmit = async e => {
		e.preventDefault();
		//Set loading
		this.setState({loading:true});
		setTimeout(() => {
			this.setState({loading:false});
		  }, 2000);
		  
		//Layer of Validation
  
		//send register to backend
		//Check em outros erros
		try {
			let data = {...this.state.data}
				data.settings = (data.method == 'DRX') ? this.state.setting_drx : this.state.setting_frx;
				data.equipment_id = this.state.equiSelect;
            const res = await editSolicitation(data);
            console.log(res.data);
			// if (res.data.error == true) {
			// 	window.scroll(0,0);
			// 	alert(`${res.data.message}`);       			
			// }else{
			// 	alert(`${res.data.message}`);
			// 	this.props.history.push("/solicitacoes");
			// }
			// console.log(data);
		} catch (error) {
		  alert(`Algo inesperado aconteceu, sua pagina será recarregada`);        
		//   this.props.history.push("/");        
		}
		
	  }

	DRXrender(){
		return (
			<>
			<div className="form-group">
				<label>2θ inicial</label>
				<select name="dois_theta_inicial" onChange={(e) => this.handleDRX(e)} className="form-control" required>									
				{this.state.dois_theta_inicial.map((value, i) => (
						<option key={i} value={value} selected={(value == '10°') ? true : false}>{value}</option>
					))}
				</select>
				<div className="invalid-feedback">
				Como? Não entendi.
				</div>
			</div>
			<div className="form-group">
				<label>2θ final</label>
				<select name="dois_theta_final" onChange={(e) => this.handleDRX(e)} className="form-control" required>								
					{this.state.dois_theta_final.map((value, i) => (
						<option key={i} value={value} selected={(value == '100°') ? true : false}>{value}</option>
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
			</>
		)
	}

	FRXrender(){
		return (
			<>
				<div className="form-group">
					<label htmlFor="">Selecione o tipo de medida</label>
					<div className="custom-control custom-radio">
						<input type="radio" name="medida" defaultValue="semi-quantitativa" defaultChecked  onChange={(e) => this.handleFRX(e) } className="custom-control-input" id="medida" />
						<label className="custom-control-label" htmlFor="medida">Semi-Quantitativa</label>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="">Selecione a forma dos resultados</label>
					<div className="custom-control custom-radio">
						<input type="radio" name="resultado" defaultValue="oxidos" defaultChecked  onChange={(e) => this.handleFRX(e) } className="custom-control-input" id="resultado_1" />
						<label className="custom-control-label" htmlFor="resultado_1">Óxidos</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" name="resultado" defaultValue="elementos"  onChange={(e) => this.handleFRX(e) } className="custom-control-input" id="resultado_2" />
						<label className="custom-control-label" htmlFor="resultado_2">Elementos</label>
					</div>
				</div>
			</>
		)
	}

	render() {
		return (
			<Main title="Cadastrar Solicitações">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
						<div className="card">
					        <form className="needs-validation" onSubmit={this.onSubmit} method="post" id="" noValidate>
					          <div className="card-header">
								<h4>Cadastrar Solicitação</h4>
					          </div>
					          <div className="card-body">
					          <div className="form-divider">Tipo de Análise e Equipamento</div>
					            <div className="form-group">
			                      <div className="control-label">Selecione o tipo de análise</div>
			                      <div className="custom-switches-stacked mt-2">
			                        <label className="custom-switch">
			                          <input type="radio" name="method" value="DRX" disabled checked={(this.state.data.method == 'DRX') ? true : false} onChange={(e) => (this._onChange(e) )} className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">DRX</span>
			                        </label>
			                        <label className="custom-switch">
			                          <input type="radio" name="method" value="FRX" disabled checked={(this.state.data.method == 'FRX') ? true : false} onChange={(e) => (this._onChange(e))} className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">FRX</span>
			                        </label>
			                      </div>
			                    </div>
								<div className="full-form" style={{display:(this.state.data.method != '') ? 'block': 'none'}}>

								
									<div className="form-group">
										<label>Equipamento</label>
										<select className="form-control" value={this.state.equiSelect} onChange={(e) => this._onChange(e)} name="equipment_id" required>
											<option value=""> Selecione o Equipamento ...</option>
											{this.state.equipments.map(equipment => {
												if (this.state.data.method == 'FRX') {
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
										<label>Escolha o tipo da amostra</label>
										<select name="shape"  className="form-control" value={this.state.data.shape} onChange={(e) => this._onChange(e)} required>
											<option value="">Selecione o tipo da amostra ...</option>
											<option value="Pó">Pó</option>
											<option value="Filme">Filme</option>
											<option value="Pastilha">Pastilha</option>
											<option value="Eletródo">Eletródo</option>
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
									<label>Composição</label>
									<input type="text" name="composition" defaultValue={this.state.data.composition} onChange={(e) => this._onChange(e)} className="form-control" required />
									<div className="invalid-feedback">
										Campo Obirgatório!!
									</div>
									</div>
									<div className="form-group">
									<div className="control-label">Segurança</div>
									<div className="custom-switches-stacked mt-2">
										<label className="custom-switch">
										<input type="checkbox" name="flammable" checked={(this.state.data.flammable == 'Sim') ? true : false} onChange={(e) => this.handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Inflamável</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="toxic" checked={(this.state.data.toxic == 'Sim') ? true : false} onChange={(e) => this.handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Tóxico</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="hygroscopic" checked={(this.state.data.hygroscopic == 'Sim') ? true : false} onChange={(e) => this.handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Higroscópico</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="corrosive" checked={(this.state.data.corrosive == 'Sim') ? true : false} onChange={(e) => this.handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Corrosivo</span>
										</label>
										<label className="custom-switch">
										<input type="checkbox" name="radioactive" checked={(this.state.data.radioactive == 'Sim') ? true : false} onChange={(e) => this.handleCheckbox(e)} defaultValue="Sim" className="custom-switch-input" />
										<span className="custom-switch-indicator"></span>
										<span className="custom-switch-description">Radioativo</span>
										</label>
									</div>
									</div>

									<div className="form-divider"><strong>Configurações da análise</strong></div>
									{this.state.data.method == 'DRX' ? this.DRXrender() : ''}
									{this.state.data.method == 'FRX' ? this.FRXrender() : ''}
					
									<div className="form-divider"><strong>Observações Gerais</strong></div>
									<div className="form-group">
										<label>Observações</label>
										<textarea className="form-control" name="note" onChange={(e) => this._onChange(e)} defaultValue={this.state.data.note} />
									</div>

									{/* <div className="form-divider"><strong>Range de Amostras</strong></div>
									<div className="form-group">
										<label>Quantas amostras deseja cadastrar?</label>
										<input type="number" className="form-control" name="quantity" onChange={(e) => this._onChange(e)} placeholder="Digite quantas amostras serão cadastradas nesta Solicitação" min={1} max={20} />
									</div> */}
								
								</div>
								
					          </div>
					          <div className="card-footer text-right">
	                             <Button type="submit" className="btn btn-primary btn-lg btn-block" loading={this.state.loading} name="Editar" loadName="Editando..."></Button>
					          </div>
					        </form>
					      </div>
						</div>
					</div>
				</div>
			</Main>
		);
	}
}
