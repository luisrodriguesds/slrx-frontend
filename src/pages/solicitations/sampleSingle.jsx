import React from 'react';
import {Link} from 'react-router-dom';

import {getUser, showSolicitation} from '../../services/api';

import Main from '../../components/template/Main';

export default class sampleSingle extends React.Component {
	state = {
		solicitation:{user:{name:''}, equipment:{name:''}, status:'', settings:{}},
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
		phase:'',
		loading:false,
	  	loadpage:true
	}
	
	async componentDidMount(){
		const name = this.props.computedMatch.params.id;
		try{
			const res = await showSolicitation({name});
			const phase = this.state.status.filter((value) => value.number == res.data[0].status)[0].descripiton
			
			this.setState({solicitation:res.data[0], phase})
			console.log(this.state);
		}catch(error){
			alert(`Algo de errado acomteceu ou você não tem permissão para acessar esta página.`);
			this.props.history.push('/solicitacoes')
		}

	}
	
	render() {
		const {solicitation} = this.state; 
		return (
			<Main title="Amostra">
				<div className="row">
					<div className="col-12 col-sm-12 col-lg-6">
						<div className="card card-primary">
		                  <div className="card-header">
		                    <h4>{solicitation.name}</h4>
		                  </div>
		                  <div className="card-body">
		                    <div className="ScrollStyle">
		                    	<p>
			                        <strong>Status: </strong> <span id="status" style={{color:(solicitation.status < 1) ? 'red' : 'blue'}}>{this.state.phase}</span><br />
			                    </p>
			                    <p>
			                        <strong>Solicitante: </strong><span id="detalhe_Solicitante"><Link to="/usuarios/ver-perfil/1">{solicitation.user.name}</Link></span><br />
			                    </p>
			                    <p>
			                        <strong>Data da Solicitação: </strong><span id="detalhe_DataSolicitacao">{solicitation.created_at}</span><br />
			                        {solicitation.received_date != null && <React.Fragment> <strong>Data do Recebimento: </strong><span id="detalhe_DataRecebimento">{new Date(solicitation.received_date).toLocaleString('pt-BR')}</span> </React.Fragment>}
			                        {solicitation.conclusion_date != null && <React.Fragment> <strong>Data da Conclusão: </strong><span id="detalhe_DataConclusao">{new Date(solicitation.conclusion_date).toLocaleString('pt-BR')}</span> </React.Fragment>}
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

			                </div>
		                  </div>
		                </div>
					</div>
					<div className="col-12 col-sm-12 col-lg-6">
						<div className="activities">
							{this.state.status.map((value,i) =>{

								if (value.number >= 1 && value.number <= solicitation.status) {
									
									return (
										<div key={i} className="activity">
								          <div className={`activity-icon ${(value.number == solicitation.status) ? 'bg-danger' : 'bg-primary'} text-white shadow-primary`}>
								            <strong>{value.number}</strong>
								          </div>
								          <div className="activity-detail">
								            <div className="mb-2">
								              <span className="text-job">{new Date(solicitation.updated_at).toLocaleString('pt-BR')}</span>
								              <span className="bullet" />
								              <Link className="text-job" to="/">Ver</Link>
								              
								            </div>
								            <p>{value.descripiton}</p>
								          </div>
								        </div>
									);
								}else if (value.number < 1 && value.number === solicitation.status) {
									return (
										<div key={i} className="activity">
								          <div className={`activity-icon bg-danger text-white shadow-primary`}>
								            <strong>0</strong>
								          </div>
								          <div className="activity-detail">
								            <div className="mb-2">
								              <span className="text-job">{new Date(solicitation.updated_at).toLocaleString('pt-BR')}</span>
								              <span className="bullet" />
								              <Link className="text-job" to="/">Ver</Link>
								              
								            </div>
								            <p>{value.descripiton}</p>
								          </div>
								        </div>
									);
								}
							})}

						</div>
					</div>

					{/*<div className="col-12 col-sm-12 col-lg-6">
						<div className="activities">

					        <div className="activity">
					          <div className="activity-icon bg-primary text-white shadow-primary">
					            <strong>1</strong>
					          </div>
					          <div className="activity-detail">
					            <div className="mb-2">
					              <span className="text-job">19/10/2018</span>
					              <span className="bullet" />
					              <Link className="text-job" to="/">Ver</Link>
					              
					            </div>
					            <p>Mateus Nunes de Oliveira efetuou o a solicitação dessa amostra.</p>
					          </div>
					        </div>

					        <div className="activity">
					          <div className="activity-icon bg-primary text-white shadow-primary">
					            <strong>2</strong>
					          </div>
					          <div className="activity-detail">
					            <div className="mb-2">
					              <span className="text-job">21/10/2018</span>
					              <span className="bullet" />
					              <Link className="text-job" to="/">Ver</Link>
					              
					            </div>
					            <p>Orientador liberou a análise da amostra.</p>
					          </div>
					        </div>

					        <div className="activity">
					          <div className="activity-icon bg-primary text-white shadow-primary">
					            <strong>3</strong>
					          </div>
					          <div className="activity-detail">
					            <div className="mb-2">
					              <span className="text-job">01/11/2018</span>
					              <span className="bullet" />
					              <Link className="text-job" to="/">Ver</Link>
					              
					            </div>
					            <p>Isabela Oliveira recebeu a amostra deixada por Mateus Nunes de Oliveira.</p>
					          </div>
					        </div>

					        <div className="activity">
					          <div className="activity-icon bg-danger text-white shadow-primary">
					            <strong>4</strong>
					          </div>
					          <div className="activity-detail">
					            <div className="mb-2">
					              <span className="text-job">--/--/----</span>
					              <span className="bullet" />
					              <Link className="text-job" to="/">Ver</Link>
					              
					            </div>
					            <p>Amostra está na fila para o equipamento. Veja como está a <Link to="/fila-do-equipamento">fila</Link></p>
					          </div>
					        </div>

					      </div>
					</div>*/}

				</div>
			</Main>
		);
	}
}
