import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import { searchSolicitation, postProposta } from '../../services/api';
import Main from '../../components/template/Main';

function AddProposals() {
  const [solicitations, setSolicitations] = useState([])
  const [samples, setSamples] = useState([])
  const [sendProp, setSendProp] = useState(true);
  const [proposta, setProposta] = useState({url:null, user_id:null});
  const [state, setState] = useState({
    preparacaoDeAmostras:null,
    qtdPreparacaoDeAmostras:null,
    frxSemiQuantitativa:null,
    qtdFrxSemiQuantitativa:null,
    drxMedida:null,
    qtdDrxMedida:null,
    drxIdentificacao:null,
    qtdDrxIdentificacao:null,
    drxQuantificacao:null,
    qtdDrxQuantificacao:null,
    drxCalculo:null,
    qtdDrxCalculo:null,
    dataPrazo:null,
    observacoesProposta:null,
    name:null
  });

  const onChange = (e) => {
    let value = e.target.value;
    const data = {...state};
    data[e.target.name] = value;
    setState(data)
  }

  const searchSamples = async (e) => {
    if(e.target.value === ''){
      setSolicitations([])
      return
    }
    
    try {
      const res = await searchSolicitation(e.target.value)
      setSolicitations(res.data.data.filter((_, i) => i < 5))
    } catch (error) {
    }
  }

  const handleAddSamples = (sample) => {
    if (samples.map(v => v.id).includes(sample.id)) {
      return
    }
    const data = {
      id: sample.id,
      name: sample.name,
    }
    setSamples((state) => [...state, data])
  }

  const handleDeleteSamples = (id) => {
    setSamples(samples.filter(v => v.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (state.dataPrazo == null) {
      alert(`Campo data está vazio`);
      return false;
    }else if (samples.length === 0) {
      alert(`Selecione pelo menos uma amostra para realizar a proposta`);
      return false;
    }else if(state.name === ''){
      alert(`Digite o nome do solicitante`);
      return false;
    }

    let data = { ...state, solicitations:samples.map(v => v.id)};
    try {
        data = encodeURIComponent(JSON.stringify(data)); 
        window.open(`${process.env.REACT_APP_API_URL}/solictation/proposta?data=${data}`, '_blank');
        setProposta({url:data, user_id:0});
        setSendProp(false);
    } catch (error) {
       
    }
  }

  const handleSendProposta = async () => {
    try{
      const res = await postProposta(proposta);
      if (res.data) {
        alert('Proposta enviada com sucesso!')
        setSendProp(true)      
      }
    }catch(error){

    }
  }

  return (
    <Main title="Cadastrar Proposta e Ordem">
      <div className="container">
        <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12 col-lg-8">
                <div className="card">
                    <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data" id="">
                        <div className="card-header">
                            <h4>Cadastrar Arquivo</h4>
                        </div>
                        <div className="card-body">
                          <div className="form-divider">Usuário</div>
                          <div className="form-group">
                            <div className="control-label"><strong>Para qual usuário deseja enviar está proposta?</strong></div>
                            <div className="row mb-3">
                              <div className="col-12 pr-0">
                                <input type="text" name="name" onChange={(e) => onChange(e)} defaultValue={state.name} title="Digite o nome do solicitante" placeholder="Digite o nome do solicitante" className="form-control" />
                              </div>
                            </div> 
                          </div>
                          <div className="form-divider">Amostras</div>
                          <div className="form-group mb-4">
                            <div className="control-label"><strong>Digite o nome das amostras</strong></div>
                            <div className="row mb-3">
                              <div className="col-12 pr-0">
                                <input type="text" name="sampleSearch" onChange={(e) => searchSamples(e)} title="Digite o nome da amostra que deseja add" placeholder="Digite o nome da amostra" className="form-control" />
                                <div className="show-sample mt-3">
                                  {samples.map((sample,i) => (
                                    <span key={`show-${sample.id}`}>
                                      {i === 0 ? `` : `,`}
                                      <strong className="ml-1" title="Clique duas vezes para apagar essa amostra da lista" style={{cursor: 'pointer'}} onDoubleClick={() => handleDeleteSamples(sample.id)}>{sample.name}</strong> 
                                    </span> 
                                  ))}
                                </div>
                                <Container>
                                  {console.log(samples)}
                                  <div className="table-responsive">
                                    <table className="table table-striped">
                                      <tbody>
                                        <tr>
                                          <th>Nome</th>
                                          <th>Status</th>
                                          <th>Ação</th>
                                        </tr>
                                        {solicitations.map(sample => (

                                          <tr key={sample.id}>
                                            <td><strong>{sample.name}</strong></td>
                                            <td>{sample.status}</td>
                                            <td><Link to="#" onClick={() => handleAddSamples(sample)} title="Excluir" className="btn btn-success"><i className="fas fa-plus"></i></Link></td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </Container>
                              </div>
                            </div> 
                          </div>
                          <div className="form-group">
                            <div className="control-label"><strong>Preparacao de Amostras</strong></div>
                            <div className="row">
                              <div className="col-8 pr-0">
                                <input type="text" name="preparacaoDeAmostras" onChange={(e) => onChange(e)} defaultValue={state.preparacaoDeAmostras} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" />
                              </div>
                              <div className="col-3 pl-1">
                                <input type="number" name="qtdPreparacaoDeAmostras" onChange={(e) => onChange(e)} defaultValue={state.qtdPreparacaoDeAmostras} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" />
                              </div>
                            </div>
                          </div>
                            <div className="form-divider">Fluorescência de Raios-X (FRX)</div>
                            <div className="form-group">
                              <div className="control-label"><strong>Semi-Quantitativa</strong></div>
                              <div className="row">
                                <div className="col-8 pr-0">
                                  <input type="text" name="frxSemiQuantitativa" onChange={(e) => onChange(e)} defaultValue={state.frxSemiQuantitativa} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" />
                                </div>
                                <div className="col-3 pl-1">
                                  <input type="number" name="qtdFrxSemiQuantitativa" onChange={(e) => onChange(e)} defaultValue={state.qtdFrxSemiQuantitativa} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" />
                                </div>
                              </div>
                            </div>

                            <div className="form-divider">Difração de Raios-X (DRX)</div>
                            <div className="form-group">
                              <div className="control-label"><strong>Medida</strong></div>
                              <div className="row mb-3">
                                <div className="col-8 pr-0">
                                  <input type="text" name="drxMedida" onChange={(e) => onChange(e)} defaultValue={state.drxMedida} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" />
                                </div>
                                <div className="col-3 pl-1">
                                  <input type="number" name="qtdDrxMedida" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxCalculo} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" />
                                </div>
                              </div>

                              <div className="control-label"><strong>Identificação de Fases</strong></div>
                              <div className="row mb-3">
                                <div className="col-8 pr-0">
                                  <input type="text" name="drxIdentificacao" onChange={(e) => onChange(e)} defaultValue={state.drxIdentificacao} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" />
                                </div>
                                <div className="col-3 pl-1">
                                  <input type="number" name="qtdDrxIdentificacao" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxIdentificacao} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" />
                                </div>
                              </div>

                              <div className="control-label"><strong>Quantificação de Fases</strong></div>
                              <div className="row mb-3">
                                <div className="col-8 pr-0">
                                  <input type="text" name="drxQuantificacao" onChange={(e) => onChange(e)} defaultValue={state.drxQuantificacao} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" />
                                </div>
                                <div className="col-3 pl-1">
                                  <input type="number" name="qtdDrxQuantificacao" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxQuantificacao} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" />
                                </div>
                              </div>

                              <div className="control-label"><strong>Cálculo do Tamanho Médio de Partículas</strong></div>
                              <div className="row mb-3">
                                <div className="col-8 pr-0">
                                  <input type="text" name="drxCalculo" onChange={(e) => onChange(e)} defaultValue={state.drxCalculo} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" />
                                </div>
                                <div className="col-3 pl-1">
                                  <input type="number" name="qtdDrxCalculo" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxCalculo} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" />
                                </div>
                              </div>  
                            </div>

                            <div className="form-divider">Gerais</div>
                            <div className="form-group">
                              <div className="control-label"><strong>Prazo para a proposta</strong></div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <input type="date" id="dataPrazo" name="dataPrazo" onChange={(e) => onChange(e)} defaultValue={state.dataPrazo} required="" className="form-control" />
                                </div>
                              </div>
                              <div className="control-label"><strong>Observações da Proposta</strong></div>
                              <div className="row mb-3">
                                <div className="col-12">
                                  <textarea name="observacoesProposta" className="form-control" defaultValue={state.observacoesProposta} onChange={(e) => onChange(e)}></textarea>
                                </div>
                              </div> 
                            </div>
                            <div className="card-footer text-right">
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Gerar</button>
                            </div>
                        </div>
                    </form>
                    <div className="col-10">
                      <button hidden={sendProp} className="btn btn-danger btn-lg btn-block" onClick={handleSendProposta}>Gerar Ordem</button>
                    </div>
                </div>
              </div>
          </div>
        </div>
    </Main>
    );
}

export default AddProposals;