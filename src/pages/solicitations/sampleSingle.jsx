import React from 'react';
import {Link} from 'react-router-dom';

import Main from '../../components/template/Main';

export default class sampleSingle extends React.Component {
	

	render() {
		return (
			<Main title="Amostra">
				<div className="row">
					<div className="col-12 col-sm-12 col-lg-6">
						<div className="card card-primary">
		                  <div className="card-header">
		                    <h4>MND298D005</h4>
		                  </div>
		                  <div className="card-body">
		                    <div className="ScrollStyle">
			                    <p>
			                        <strong>Solicitante: </strong><span id="detalhe_Solicitante"><Link to="/usuarios/ver-perfil/1">Mateus Nunes de Oliveira</Link></span><br />
			                    </p>
			                    <p>
			                        <strong>Data da Solicitação: </strong><span id="detalhe_DataSolicitacao">19/10/2018</span><br />
			                        <strong>Data do Recebimento: </strong><span id="detalhe_DataRecebimento">23/10/2018</span>
			                    </p>
			                    <p>
			                        <strong>Equipamento: </strong> <span id="detalhe_Equipamento">PANalytical X'Pert PRO</span><br />
			                    </p>
			                    <p>
			                        <strong>Composição: </strong><span id="detalhe_Composicao">K2O, SiO2, Fe2O3,CaO</span><br />
			                        <strong>Tipo: </strong> <span id="detalhe_Tipo">Pó</span><br />
			                    </p>
			                    <p id="detelhe_Configuracao_DRX">
			                        <strong>2θ Inicial: </strong><span id="detalhe_2ThetaInicial">10</span>°<br />
			                        <strong>2θ Final: </strong><span id="detalhe_2ThetaFinal">100</span>°<br />
			                        <strong>Δθ: </strong><span id="detalhe_DeltaTheta">0.013</span>°<br />
			                    </p>
			                    <p id="detelhe_Configuracao_FRX">
			                        <strong>Tipo de Medida: </strong><span id="detalhe_TipoMedida"></span><br />
			                        <strong>Forma do Resultado: </strong><span id="detalhe_FormaResultado"></span><br />
			                    </p>
			                    <p>
			                        <strong>Segurança: </strong><span id="detalhe_Seguranca">Higroscópico</span><br />
			                        <strong>Observações: </strong><span id="detalhe_Observacoes">Cinza de castanha de caju</span><br />
			                        <span id="detalhe_Corrosao"></span><br />
			                    </p>

			                </div>
		                  </div>
		                </div>
					</div>
					<div className="col-12 col-sm-12 col-lg-6">
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
					</div>
				</div>
			</Main>
		);
	}
}
