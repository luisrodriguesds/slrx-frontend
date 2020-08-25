import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Main from '../../components/template/Main';
import { getAllProposta, deleteProposta } from '../../services/api';

function Proposals() {
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    async function load(){
      try {
        const res = await getAllProposta()
        console.log(res.data);
        setProposals(res.data)
      } catch (error) {
        
      }
    }
    load()
  }, [])

  const deletePropostaAsk = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta proposta?")) {
      try {
        await deleteProposta(id)
        setProposals(proposals.filter(v => v.id !== id))
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Main title="Propostas e Ordens">
      <div className="row">
			        <div className="col-12">
			          <div className="card">
			            <div className="card-header">
			              <h4>Documentos</h4>
			              <div className="card-header-form" style={{width:'100%'}}>
						  	<div className="row" style={{width:'100%'}}>
							  	<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-left p-0">
								  <div className="option-group">
									
                    <Link to="/usuarios/propostas/cadastrar" title="Cadastrar" className="btn btn-primary ml-1 mr-1"><i className="fas fa-plus"></i></Link>
										<button data-toggle="tooltip" title="Excluir" className="btn btn-danger mr-1"><i className="fas fa-trash"></i></button>
									</div>
									
								</div>
								<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right">
									<form method="post" onSubmit={(e) => e.preventDefault()}>
										<div className="input-group">
											<input type="text" className="form-control" placeholder="Pesquise pelo nome da propsota" />
											<div className="input-group-btn">
											<button className="btn btn-primary"><i className="fas fa-search" /></button>
											</div>
										</div>
									</form>
								</div>
							</div>
							  
			               
			              </div>
			            </div>
			            <div className="card-body p-0">
			              <div className="table-responsive">
			                <table className="table table-striped">
			                  <tbody><tr>
			                      <th>
			                        <div className="custom-checkbox custom-control">
			                          <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" className="custom-control-input" id="checkbox-all" />
			                          <label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
			                        </div>
			                      </th>
			                      <th>Nome</th>
			                      <th>Proposta</th>
			                      <th>Ordem</th>
			                      <th>Data</th>
			                      <th>Ações</th>
			                    </tr>
			                   {proposals.map(proposal => (
                           <tr key={`prop-${proposal.id}`}>
                             <td>#</td>
                              <td>{proposal.user && proposal.user.name}</td>
                              <td>
                                <a href={`${process.env.REACT_APP_API_URL}/solictation/proposta?data=${proposal.url}`} rel="noopener noreferrer" target="_blank">Proposta</a>
                              </td>
                              <td>
                                <a href={`${process.env.REACT_APP_API_URL}/solictation/ordem?data=${proposal.url}`} rel="noopener noreferrer" target="_blank">Ordem</a>
                              </td>
                              <td>
                                {new Date(proposal.created_at).toLocaleString('pt-BR')}
                              </td>
                              <td>
							                  <button onClick={() => deletePropostaAsk(proposal.id)} className="btn - btn-danger"><i className="fas fa-trash" /></button>
                              </td>
                           </tr>
                         ))}
			                  </tbody>
			                </table>
			              </div>
			            </div>
						    <div className="card-footer">
							  
					      </div>
			          </div>
			        </div>
			      </div>
    </Main>
    );
}

export default Proposals;