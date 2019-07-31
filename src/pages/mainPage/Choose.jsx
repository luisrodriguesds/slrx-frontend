import React from 'react';
import {Link} from 'react-router-dom';

import Main from './Main';


const Choose = () => {
    return (
        <Main>
            <div className="container">
                <div className="row justify-content-md-center mb-5">
                    <div className="col-12 col-sm-12 col-lg-7">
                        <div className="card">
                            <div className="card-header">
                                <h4>Cadastro de Novo Usuário</h4>
                            </div>
                            <div className="card-body">
                                <p>Escolha o seu tipo de Usuário:</p>
                                <p className="text-danger mb-0">*Alunos deverão passar pela aprovação do seu professor/orientador</p>
                                <p className="text-danger mb-0">*Professores deverão passar pela aprovação do responsável pelo Laboratório, Professor Sasaki.</p>
                                <p className="text-danger">*Representantes de empresas podem cadastrar suas amostras, mas só serão liberadas mediante a aprovação de uma proposta.</p>
                               <Link to="/cadastro/aluno" className="btn btn-primary btn-block">Aluno</Link>
                               <Link to="/cadastro/professor" className="btn btn-primary btn-block">Professor</Link>
                               <Link to="/cadastro/empresa" className="btn btn-primary btn-block">Empresa</Link>
                               <Link to="/cadastro/operador" className="btn btn-primary btn-block">Operador</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Choose;
