import React from 'react';
import {ButtonToolbar, Button } from 'react-bootstrap';

// import { Container } from './styles';

function Buttom(props) {

  return (
    <ButtonToolbar>
      <Button variant="primary" className={props.className} disabled={props.loading} type={props.type}>
          {!props.loading && <span>{props.name}</span>}
          {props.loading && <i className="fas fa-sync-alt rotating"></i>}
          {props.loading && <span style={{marginLeft:"10px"}}>{props.loadName}</span>}
      </Button>
  </ButtonToolbar>
    );
}

export default Buttom;