import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import React, { useState, useEffect}  from 'react';

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

    const handleSubmit = () => {
      console.log(props);
      
      console.log(state);
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
                    <input type="text" name="preparacaoDeAmostras" onChange={(e) => onChange(e)} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                  </div>
                  <div className="col-3 pl-1">
    								<input type="number" name="qtdPreparacaoDeAmostras" onChange={(e) => onChange(e)} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                  </div>
                </div>
              </div>
                <div className="form-divider">Fluorescência de Raios-X (FRX)</div>
                <div className="form-group">
                  <div className="control-label"><strong>Semi-Quantitativa</strong></div>
                  <div className="row">
                    <div className="col-8 pr-0">
                      <input type="text" name="frxSemiQuantitativa" onChange={(e) => onChange(e)} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdFrxSemiQuantitativa" onChange={(e) => onChange(e)} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>
                </div>

                <div className="form-divider">Difração de Raios-X (DRX)</div>
                <div className="form-group">
                  <div className="control-label"><strong>Medida</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxMedida" onChange={(e) => onChange(e)} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxMedida" onChange={(e) => onChange(e)} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>

                  <div className="control-label"><strong>Identificação de Fases</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxIdentificacao" onChange={(e) => onChange(e)} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxIdentificacao" onChange={(e) => onChange(e)} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>

                  <div className="control-label"><strong>Quantificação de Fases</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxQuantificacao" onChange={(e) => onChange(e)} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxQuantificacao" onChange={(e) => onChange(e)} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>

                  <div className="control-label"><strong>Cálculo do Tamanho Médio de Partículas</strong></div>
                  <div className="row mb-3">
                    <div className="col-8 pr-0">
                      <input type="text" name="drxCalculo" onChange={(e) => onChange(e)} title="Caso vazio, será adotado o preço da tabela" placeholder="Preço por amostra" className="form-control" required />
                    </div>
                    <div className="col-3 pl-1">
                      <input type="number" name="qtdDrxCalculo" onChange={(e) => onChange(e)} title="Mínimo = 1" min={1} placeholder="Quantidade de amotras" className="form-control" required />
                    </div>
                  </div>  
                </div>
                {/* <div className="custom-switches-stacked mt-2">
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
                </div> */}
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