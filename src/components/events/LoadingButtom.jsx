import React, { Component } from 'react';
import {ButtonToolbar, Button } from 'react-bootstrap';

// import { Container } from './styles';

export default class Buttom extends Component {
    state = {
        loading:true
    };
  render() {
    return (
        <ButtonToolbar>
            <Button variant="primary" className={this.props.className} disabled={this.props.loading} type={this.props.type}>
                {!this.props.loading && <span>{this.props.name}</span>}
                {this.props.loading && <i className="fas fa-sync-alt rotating"></i>}
                {this.props.loading && <span style={{marginLeft:"10px"}}>{this.props.loadName}</span>}
            </Button>
        </ButtonToolbar>
        
    );
  }
}
