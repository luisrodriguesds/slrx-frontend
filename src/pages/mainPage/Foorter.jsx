import React from 'react';

import Logo from '../../assets/img/logo_lrx.png';
import UFC from '../../assets/img/logo_ufc_pequena.png';
import CNPq from '../../assets/img/logo_cnpq_pequena.png';
// import { Container } from './styles';

const Foorter = () => {
    return (
        <footer className="footer">
        <div className="footer-widget">
          <div className="container p-4">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="footer-logo">
                  <a href="#"><img src={Logo} alt="" /></a>
                  <p style={{marginTop: '15px'}}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi doloribus beatae sunt natus assumenda? Cum totam modi voluptatum eaque eos eveniet quae!                              
                  </p>
                  <ol className="flat-list">
                    <li><a href="#" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-instagram" /></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-linkedin-in" /></a></li>
                    <li><a href="#" target="_blank"><i className="fab fa-whatsapp" /></a></li>
                  </ol>
                </div>
              </div>
              {/* Single widget*/}
              <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0">
                <div className="footer-widget-item">
                  <h3>Contate-nos</h3>
                  <ul className="footer-widget-contact">
                    <li>Contaro Geral
                      <p><i className="fa fa-envelope" /> <a href="mailto::lrxufc@gmail.com">lrxufc@gmail.com</a></p>
                    </li>
                    <li>Suporte Técnico
                      <p><i className="fa fa-envelope" /> <a href="mailto::luisitaloar@gmail.com">luisitaloar@gmail.com</a></p>
                    </li>
                    <li>
                      <p><i className="fa fa-phone" /> <a href="callto::8533669013">(85)3366-9013</a></p>
                      <p><i className="fa fa-phone" /> <a href="callto::85933669917">(85)3366-9917</a></p>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Single widget*/}
              <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0">
                <div className="footer-widget-item">
                  <h3>Funcionamento</h3>
                  <ul className="footer-widget-office-time">
                    <li>
                      <p>
                          Atendemos: <br />
                          Segunda - Sexta: <br/>
                          8h às 12h <br />
                          14h às 18h
                      </p>
                    </li>
                    <li>
                      <p>
                          Fechado: <br />
                          Sábado e Domundo            
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 mt-4 mt-lg-0">
                <div className="footer-widget-item">
                  <h3>Apoio</h3>
                    <img src={UFC} alt="Universidade Federal do Ceará"/>
                    <img src={CNPq} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright p-3">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 text-center">
                <p>Copyright © 2019 | Todos os direitos reservados - Laboratório de Raio X da Universidade Federal do Ceará | Developed By  <a href="http://luisrodriguesdev.com.br" target="_blank">Luis Rodrigues</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
};

export default Foorter;
