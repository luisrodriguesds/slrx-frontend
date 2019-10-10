import {Modal, Button} from 'react-bootstrap';
import React, { useState, useEffect}  from 'react';

import {propostaSolicitation} from '../../services/api';

function ModalProposta(props) {
    const [show, setShow] = useState(false);
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
      observacoesProposta:null
    });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onChange = (e) => {
      let value = e.target.value;
      const data = {...state};
      data[e.target.name] = value;
      setState(data)
      console.log(state);
    }

    const handleSubmit = async () => {
      if (state.dataPrazo == null) {
        alert(`Campo data está vazio`);
        return false;
      }else if (props.solicitations.length == 0) {
        alert(`Selecione pelo menos uma amostra para realizar a proposta`);
        return false;
      }

      const data = { ...state, solicitations:props.solicitations};
       try {
         const res = await propostaSolicitation(data);
         console.log(res);

       } catch (error) {
         
       }

    }
  
    useEffect(() => {
      console.log(props);
    }, []);
    
    return (
      <React.Fragment>
        <Button variant="primary" title={props.title} className="btn btn-primary ml-1 mr-1" onClick={handleShow}>
          Proposta LRX
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Geração de Proposta LRX</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="needs-validation" method="post" id="" noValidate>
              
              <div className="form-divider">Amostras</div>
              <div className="form-group">
                <div className="control-label"><strong>Preparacao de Amostras</strong></div>
								<div className="row">
                  <div className="col-8 pr-0">
                    <input type="text" name="preparacaoDeAmostras" onChange={(e) => onChange(e)} defaultValue={state.preparacaoDeAmostras} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                  </div>
                  <div className="col-3 pl-1">
    								<input type="number" name="qtdPreparacaoDeAmostras" onChange={(e) => onChange(e)} defaultValue={state.qtdPreparacaoDeAmostras} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                  </div>
                </div>
              </div>
                <div className="form-divider">Fluorescência de Raios-X (FRX)</div>
                <div className="form-group">
                  <div className="control-label"><strong>Semi-Quantitativa</strong></div>
                  <div className="row">
                    <div className="col-8 pr-0">
                      <input type="text" name="frxSemiQuantitativa" onChange={(e) => onChange(e)} defaultValue={state.frxSemiQuantitativa} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdFrxSemiQuantitativa" onChange={(e) => onChange(e)} defaultValue={state.frxSemiQuantitativa} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>
                </div>

                <div className="form-divider">Difração de Raios-X (DRX)</div>
                <div className="form-group">
                  <div className="control-label"><strong>Medida</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxMedida" onChange={(e) => onChange(e)} defaultValue={state.drxMedida} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxMedida" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxCalculo} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>

                  <div className="control-label"><strong>Identificação de Fases</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxIdentificacao" onChange={(e) => onChange(e)} defaultValue={state.drxIdentificacao} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxIdentificacao" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxIdentificacao} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>

                  <div className="control-label"><strong>Quantificação de Fases</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxQuantificacao" onChange={(e) => onChange(e)} defaultValue={state.drxQuantificacao} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxQuantificacao" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxQuantificacao} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>

                  <div className="control-label"><strong>Cálculo do Tamanho Médio de Partículas</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxCalculo" onChange={(e) => onChange(e)} defaultValue={state.drxCalculo} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxCalculo" onChange={(e) => onChange(e)} defaultValue={state.qtdDrxCalculo} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Gerar
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }

  export default ModalProposta