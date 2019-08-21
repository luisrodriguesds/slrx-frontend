import React from 'react';

import Main from '../../components/template/Main';

export default class dashboard extends React.Component {

	render() {
		return (
			<Main title="Dashboard">
				 {/* Estatísticas */}
		        <div className="row">
		          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
		            <div className="card card-statistic-1">
		              <div className="card-icon bg-success">
		                <i className="fas fa-circle" />
		              </div>
		              <div className="card-wrap">
		                <div className="card-header">
		                  <h4>Usuários Online Agora</h4>
		                </div>
		                <div className="card-body">
		                  47
		                </div>
		              </div>
		            </div>
		          </div>
		          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
		            <div className="card card-statistic-1">
		              <div className="card-icon bg-primary">
		                <i className="far fa-user" />
		              </div>
		              <div className="card-wrap">
		                <div className="card-header">
		                  <h4>Total de Usuários</h4>
		                </div>
		                <div className="card-body">
		                  10
		                </div>
		              </div>
		            </div>
		          </div>
		          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
		            <div className="card card-statistic-1">
		              <div className="card-icon bg-danger">
		                <i className="far fa-newspaper" />
		              </div>
		              <div className="card-wrap">
		                <div className="card-header">
		                  <h4>Total de Amostras DRX</h4>
		                </div>
		                <div className="card-body">
		                  42
		                </div>
		              </div>
		            </div>
		          </div>
		          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
		            <div className="card card-statistic-1">
		              <div className="card-icon bg-warning">
		                <i className="far fa-file" />
		              </div>
		              <div className="card-wrap">
		                <div className="card-header">
		                  <h4>Total de Amostras FRX</h4>
		                </div>
		                <div className="card-body">
		                  1,201
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>
		        {/* Medida DRX */}
		        <div className="row">
		          <div className="col-lg-8 col-md-12 col-12 col-sm-12">
		            <div className="card">
		              <div className="card-header">
		                <h4>Medida DRX em tempo Real</h4>
		              </div>
		              <div className="card-body">
		                {/*<canvas id="myChart" height={382} />*/}
		                <iframe src="http://csd.fisica.ufc.br:8080/iframe" height="452" frameBorder="0" style={{border:0, width:"100%"}} allowFullScreen=""></iframe>
		              </div>
		            </div>
		          </div>
		          {/* Atividades Recentes */}
		          <div className="col-lg-4 col-md-12 col-12 col-sm-12">
		            <div className="card">
		              <div className="card-header">
		                <h4>Atividades Recentes</h4>
		              </div>
		              <div className="card-body">             
		                <ul className="list-unstyled list-unstyled-border">
		                  <li className="media">
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-1.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="float-right text-primary">Agora</div>
		                      <div className="media-title">César</div>
		                      <span className="text-small text-muted">Alterou o estado da amostra <a href="#">JCF023D0003</a> de esperando aprovação para na fila para o equipamento</span>
		                    </div>
		                  </li>
		                  <li className="media">
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-2.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="float-right">12m</div>
		                      <div className="media-title">Isabela Oliveira</div>
		                      <span className="text-small text-muted">Cadastrou uma amostra chamada <a href="#">IOS123D0007</a> para ser analisada. </span>
		                    </div>
		                  </li>
		                  <li className="media">
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-3.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="float-right">17m</div>
		                      <div className="media-title">Édipo</div>
		                      <span className="text-small text-muted">Efetuou seu cadastro no sistema e está aguardando aprovação.</span>
		                    </div>
		                  </li>
		                  <li className="media">
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-4.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="float-right">21m</div>
		                      <div className="media-title">Juliana Silveira</div>
		                      <span className="text-small text-muted">Efetuou seu cadastro no sistema e está aguardando aprovação.</span>
		                    </div>
		                  </li>
		                </ul>
		                <div className="text-center pt-1 pb-1">
		                  <a href="#" className="btn btn-primary btn-lg btn-round">
		                    Ver Todas
		                  </a>
		                </div>
		              </div>
		            </div>
		          </div>
		        </div>
		        {/* Enviar Email */}
		        <div className="row">
		          <div className="col-lg-6 col-md-6 col-12">
		            <form method="post" className="needs-validation" noValidate>
		              <div className="card">
		                <div className="card-header">
		                  <h4>Enviar Email</h4>
		                </div>
		                <div className="card-body pb-0">
		                  <div className="form-group">
		                    <label>Assunto</label>
		                    <input type="text" name="title" className="form-control" required />
		                    <div className="invalid-feedback">
		                      Please fill in the title
		                    </div>
		                  </div>
		                  <div className="form-group">
		                    <label>Conteúdo</label>
		                    <textarea className="summernote-simple" defaultValue={""} />
		                  </div>
		                </div>
		                <div className="card-footer pt-0">
		                  <button className="btn btn-primary">Enviar Email</button>
		                </div>
		              </div>
		            </form>
		          </div>
		          {/* Pendências de aprovações */}
		          <div className="col-lg-6 col-md-6 col-12">
		            <div className="card">
		              <div className="card-header">
		                <h4 className="d-inline">Pendências de Cadastro</h4>
		                <div className="card-header-action">
		                  <a href="#" className="btn btn-primary">Ver todas</a>
		                </div>
		              </div>
		              <div className="card-body">             
		                <ul className="list-unstyled list-unstyled-border">
		                  <li className="media">
		                    <div className="custom-control custom-checkbox">
		                      <input type="checkbox" className="custom-control-input" id="cbx-1" />
		                      <label className="custom-control-label" htmlFor="cbx-1" />
		                    </div>
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-4.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="badge badge-pill badge-danger mb-1 float-right">Incompleto</div>
		                      <h6 className="media-title"><a href="#">Redesign header</a></h6>
		                      <div className="text-small text-muted">Alfa Zulkarnain <div className="bullet" /> <span className="text-primary">Now</span></div>
		                    </div>
		                  </li>
		                  <li className="media">
		                    <div className="custom-control custom-checkbox">
		                      <input type="checkbox" className="custom-control-input" id="cbx-2" defaultChecked />
		                      <label className="custom-control-label" htmlFor="cbx-2" />
		                    </div>
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-5.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="badge badge-pill badge-primary mb-1 float-right">Completo</div>
		                      <h6 className="media-title"><a href="#">Add a new component</a></h6>
		                      <div className="text-small text-muted">Serj Tankian <div className="bullet" /> 4 Min</div>
		                    </div>
		                  </li>
		                  <li className="media">
		                    <div className="custom-control custom-checkbox">
		                      <input type="checkbox" className="custom-control-input" id="cbx-3" />
		                      <label className="custom-control-label" htmlFor="cbx-3" />
		                    </div>
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-2.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="badge badge-pill badge-warning mb-1 float-right">Em progresso</div>
		                      <h6 className="media-title"><a href="#">Fix modal window</a></h6>
		                      <div className="text-small text-muted">Ujang Maman <div className="bullet" /> 8 Min</div>
		                    </div>
		                  </li>
		                  <li className="media">
		                    <div className="custom-control custom-checkbox">
		                      <input type="checkbox" className="custom-control-input" id="cbx-4" />
		                      <label className="custom-control-label" htmlFor="cbx-4" />
		                    </div>
		                    <img className="mr-3 rounded-circle" width={50} src="assets/img/avatar/avatar-1.png" alt="avatar" />
		                    <div className="media-body">
		                      <div className="badge badge-pill badge-danger mb-1 float-right">Incompleto</div>
		                      <h6 className="media-title"><a href="#">Remove unwanted classes</a></h6>
		                      <div className="text-small text-muted">Farhan A Mujib <div className="bullet" /> 21 Min</div>
		                    </div>
		                  </li>
		                </ul>
		              </div>
		              <div className="card-footer pt-0">
		                <button className="btn btn-primary">Aprovar</button>
		              </div>
		            </div>
		          </div>
		        </div>
			</Main>
		);
	}
}
