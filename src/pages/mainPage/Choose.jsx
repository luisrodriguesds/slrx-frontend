import React from 'react';
import {Link} from 'react-router-dom';

import Main from './Main';


const Choose = () => {
    return (
        <Main>
            <div className="container">
                <div className="row justify-content-md-center mb-5">
                    <div className="col-12 col-sm-12 col-lg-7">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4>Cadastro de Novo Usuário</h4>
                            </div>
                            <div className="card-body">
                                <p><strong>Escolha o seu tipo de Usuário:</strong></p>
                                <br />
                                <h3>Alunos</h3>
                                <p className="text-danger">*Alunos deverão passar pela aprovação do seu professor/orientador</p>
                                <p className="text-danger">*Só poderá se cadastrar como aluno se estiver cursando <strong>graduação, mestrado, doutorado ou pós-doutorado</strong></p>
                                <Link to="/cadastro/aluno" className="btn btn-primary btn-block">Aluno</Link>
                               <hr/>
                               <br/>
                                <h3>Professor</h3>
                                <p className="text-danger">*Professores deverão passar pela aprovação do responsável pelo Laboratório, Professor Sasaki.</p>
                                <p className="text-danger">*Só poderá se cadastrar como professor se e somente se <strong>não</strong> estiver realizando <strong>mestrado, doutorado ou pós</strong>.</p>
                                <p className="text-danger">*Só poderá se cadastrar como professor se for de <strong>Instituição de Ensino Superior (IES)</strong></p>
                                <Link to="/cadastro/professor" className="btn btn-primary btn-block">Professor</Link>
                                <hr/>
                                <br/>

                                <h3>Empresa</h3>
                                <p className="text-danger">*Representantes de empresas podem cadastrar suas amostras, mas somente serão liberadas mediante a aprovação de uma proposta.</p>

                                <Link to="/cadastro/empresa" className="btn btn-primary btn-block">Empresa</Link>
                               <hr/>
                                <br/>

                                <h3>Autônomo</h3>
                                <p className="text-danger">*Usuários autônomos podem cadastrar suas amostras, mas somente serão liberadas mediante a aprovação de uma proposta.</p>

                                <Link to="/cadastro/autonomo" className="btn btn-primary btn-block">Autônomo</Link>
                                
                               {/* <hr/>
                                <br/>
                                <h3>Operador</h3>
                                <p className="text-danger">*Operadores somente serão liberados após a confirmação do responsável pelo Laboratório, Professor Sasaki.</p>

                                <Link to="/cadastro/operador" className="btn btn-primary btn-block">Operador</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Choose;
