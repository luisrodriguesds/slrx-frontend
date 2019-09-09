import React from 'react';
import {Link} from 'react-router-dom';

import {getGap, getEquipment, postSolicitation} from '../../services/api';

import Eppendorf from '../../assets/img/eppendorf.jpg';

import Main from '../../components/template/Main';
import Button from '../../components/events/LoadingButtom';

export default class addSolicitation extends React.Component {
	// "settings":{"tecnica":"DRX", "dois_theta_inicial":10, "dois_theta_final":100, "delta_dois_theta":0.013},
	// "settings":{"tecnica":"FRX", "resultado":"oxidos", "medida":"semi-quantitativa"},
	state = {
		data:{
			"equipment_id":3,
			"gap_id":"",
			"method":"",
			"settings":{},
			"composition":"",
			"shape":"",
			"flammable":"Não",
			"radioactive":"Não",
			"toxic":"Não",
			"corrosive":"Não",
			"hygroscopic":"Não",
			"note":"",
			"quantity":"1"
		},
		equipments:[],
		gaps:[],
		loading:false,
	  	loadpage:true
	}

	async componentDidMount(){
		//load equipments
		const equipments= await getEquipment();
		const gaps 		= await getGap();
		this.setState({...this.state, gaps:gaps.data, equipments:equipments.data})
	}

	_onChange = async (e) => {
      let value = e.target.value;

      if (e.target.name == 'method') {
      	if (value == 'DRX') {
      		console.log("DRX");
    		this.setState({data:{equipment_id:2}});
    	}else if(value == 'FRX'){
      		console.log("FRX");
    		this.setState({ data:{equipment_id:3}});
    	}
      }

      const data = {...this.state.data};
      data[e.target.name] = value;
	  this.setState({data});
	  console.log(this.state);
    }

    handleEquipment = () =>{
    	
    	
    }


	render() {
		return (
			<Main title="Cadastrar Solicitações">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
						<div className="card">
					        <form className="needs-validation" method="post" id="" noValidate>
					          <div className="card-header">
					            <h4>Cadastrar Solicitação</h4>
					          </div>
					          <div className="card-body">
					          <div className="form-divider">Tipo de Análise e Equipamento</div>
					            <div className="form-group">
			                      <div className="control-label">Selecione o tipo de análise</div>
			                      <div className="custom-switches-stacked mt-2">
			                        <label className="custom-switch">
			                          <input type="radio" name="method" value="DRX" onChange={(e) => (this._onChange(e) )} className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">DRX</span>
			                        </label>
			                        <label className="custom-switch">
			                          <input type="radio" name="method" value="FRX" onChange={(e) => (this._onChange(e))} className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">FRX</span>
			                        </label>
			                      </div>
			                    </div>
			                    <div className="form-group">
				            		<label>Equipamento</label>
				            		<select className="form-control" value={this.state.data.equipment_id} onChange={(e) => this._onChange(e)} name="equipment_id" required>
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
				            		<select className="form-control" required>
				                        <option value="">Selecione o tipo da amostra ...</option>
				                        <option value="1">Pó</option>
				                        <option value="1">Filme</option>
				                        <option value="1">Pastilha</option>
				                        <option value="1">Eletródo</option>
				                    </select>
				            		<div className="invalid-feedback">
				                		Como? Não entendi.
				              		</div>
				            	</div>
								<div className="form-divider"><strong>Observações sobre o volume da amostra</strong></div>
								<div className="text-danger">*Sua amostra deve ter um volume mínimo de 0.5 ml.</div>
								<div className="text-danger">*Amostras com um volume menor que 0.5 ml não serão aceitas.</div>
					            <div className="form-group text-center img-solicitation" style={{padding:"5px",border:"1px solid #ccc", margin:"10px 0"}}>
				            		<img src={Eppendorf} alt="Eppendorf de 1,5 ml"/>
				            	</div>
								<div className="form-group">
					              <label>Composição</label>
					              <input type="text" className="form-control" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
								<div className="form-group">
			                      <div className="control-label">Segurança</div>
			                      <div className="custom-switches-stacked mt-2">
			                        <label className="custom-switch">
			                          <input type="checkbox" name="option" value="Inflamável" className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">Inflamável</span>
			                        </label>
			                        <label className="custom-switch">
			                          <input type="checkbox" name="option" value="Tóxico" className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">Tóxico</span>
			                        </label>
									<label className="custom-switch">
			                          <input type="checkbox" name="option" value="Higroscópico" className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">Higroscópico</span>
			                        </label>
									<label className="custom-switch">
			                          <input type="checkbox" name="option" value="Corrosivo" className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">Corrosivo</span>
			                        </label>
									<label className="custom-switch">
			                          <input type="checkbox" name="option" value="Radioativo" className="custom-switch-input" />
			                          <span className="custom-switch-indicator"></span>
			                          <span className="custom-switch-description">Radioativo</span>
			                        </label>
			                      </div>
			                    </div>
								<div className="form-divider">Configurações da análise</div>
								<div className="form-group">
									<label>2θ inicial</label>
									<select className="form-control" required>									
										<option value="10°">10°</option>
										<option value="10°">11°</option>
										<option value="10°">12°</option>
										<option value="10°">13°</option>
										<option value="10°">14°</option>
										<option value="10°">15°</option>
									</select>
									<div className="invalid-feedback">
									Como? Não entendi.
									</div>
								</div>
								<div className="form-group">
									<label>2θ final</label>
									<select className="form-control" required>									<option value="10°">10°</option>
										<option value="10°">11°</option>
										<option value="10°">12°</option>
										<option value="10°">13°</option>
										<option value="10°">14°</option>
										<option value="100°" defaultValue>100°</option>
									</select>
									<div className="invalid-feedback">
									Como? Não entendi.
									</div>
								</div>
								<div className="form-group">
					              <label>Δθ</label>
					              <input type="text" className="form-control" value="0,013" disabled placeholder="Digite os elementos" required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
								<div className="form-divider"><strong>Observações Gerais</strong></div>
								<div className="form-group">
					              <label>Observações</label>
					              <textarea className="form-control" required defaultValue={""} />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
								<div className="form-divider"><strong>Range de Amostras</strong></div>
								<div className="form-group">
					              <label>Quantas amostras deseja cadastrar?</label>
					              <input type="number" className="form-control" placeholder="Digite quantas amostras serão cadastradas nesta Solicitação" min={0} max={20} required />
					              <div className="invalid-feedback">
					                Como? Não entendi.
					              </div>
					            </div>
					          </div>
					          <div className="card-footer text-right">
	                             <Button type="submit" className="btn btn-primary btn-lg btn-block" loading={this.state.loading} name="Solicitar" loadName="Solicitando..."></Button>
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
