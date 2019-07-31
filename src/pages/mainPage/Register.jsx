import React, { Component } from 'react';
import Main from './Main';

// import { Container } from './styles';

export default class Register extends Component {
  render() {
    return (
        <Main title="Cadastrar Solicitações">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
                            
                        
    <div className="card card-primary">
        <div className="card-header"><h4>Register</h4></div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="frist_name">First Name</label>
                <input id="frist_name" type="text" className="form-control" name="frist_name" autofocus />
              </div>
              <div className="form-group col-6">
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" type="text" className="form-control" name="last_name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="form-control" name="email" />
              <div className="invalid-feedback">
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="password" className="d-block">Password</label>
                <input id="password" type="password" className="form-control pwstrength" data-indicator="pwindicator" name="password" />
                <div id="pwindicator" className="pwindicator">
                  <div className="bar" />
                  <div className="label" />
                </div>
              </div>
              <div className="form-group col-6">
                <label htmlFor="password2" className="d-block">Password Confirmation</label>
                <input id="password2" type="password" className="form-control" name="password-confirm" />
              </div>
            </div>
            <div className="form-divider">
              Your Home
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label>Country</label>
                <div className="selectric-wrapper selectric-form-control selectric-selectric"><div className="selectric-hide-select"><select className="form-control selectric" tabIndex={-1}>
                      <option>Indonesia</option>
                      <option>Palestine</option>
                      <option>Syria</option>
                      <option>Malaysia</option>
                      <option>Thailand</option>
                    </select></div><div className="selectric"><span className="label">Indonesia</span><b className="button">▾</b></div><div className="selectric-items" tabIndex={-1}><div className="selectric-scroll"><ul><li data-index={0} className="selected">Indonesia</li><li data-index={1} className>Palestine</li><li data-index={2} className>Syria</li><li data-index={3} className>Malaysia</li><li data-index={4} className="last">Thailand</li></ul></div></div><input className="selectric-input" tabIndex={0} /></div>
              </div>
              <div className="form-group col-6">
                <label>Province</label>
                <div className="selectric-wrapper selectric-form-control selectric-selectric"><div className="selectric-hide-select"><select className="form-control selectric" tabIndex={-1}>
                      <option>West Java</option>
                      <option>East Java</option>
                    </select></div><div className="selectric"><span className="label">West Java</span><b className="button">▾</b></div><div className="selectric-items" tabIndex={-1}><div className="selectric-scroll"><ul><li data-index={0} className="selected">West Java</li><li data-index={1} className="last">East Java</li></ul></div></div><input className="selectric-input" tabIndex={0} /></div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label>City</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group col-6">
                <label>Postal Code</label>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" name="agree" className="custom-control-input" id="agree" />
                <label className="custom-control-label" htmlFor="agree">I agree with the terms and conditions</label>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
</div>
</Main>
    );
  }
}
