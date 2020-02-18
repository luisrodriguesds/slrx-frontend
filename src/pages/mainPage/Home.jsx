import React from 'react';

import Main from './Main';
import Login from './Login';
import ModalHome from '../../components/events/ModalHome'
// import { Container } from './styles';

const home = () => {
    return (
        <Main>
            <div className="row">
		          <div className="col-lg-8 col-md-12 col-12 col-sm-12 order-2 order-sm-2 order-md-1 order-lg-1">
		            <div className="card">
		              <div className="card-header">
		                <h4>Medida DRX em tempo Real</h4>
		              </div>
		              <div className="card-body">
		                {/* <canvas id="myChart" height={382} /> */}
		                <iframe src="http://csd.fisica.ufc.br:8080/iframe" height="452" frameBorder="0" style={{border:0, width:"100%"}} allowFullScreen=""></iframe>
		              </div>
		            </div>
                    <div className="card">
                        {/* <div className="card-header">
                            <h4>Recomendações na entrega das amostras e no preenchimento do formulário de solicitação</h4>
                        </div> */}
                        <div className="card-body">
                            {/* <p><strong>Rigaku (DMAXB) DRX-Difração de Raios-X</strong></p>
                            <ul>
                                <li>Pó (mínimo de 1 grama, leve o pó peneirado e/ou macerado, preferência 230 mesh)</li>
                                <li>Filmes (devem ter máx. 15x15mm2, espessura máx. de 3mm e devem ser planos)</li>
                                <li>Pastilhas (devem ter máx. 15x15mm2, espessura máx. de 3mm e devem ser planos)</li>
                                <li>Eletrodo (devem ter máx. 15x15mm2, espessura máx. de 3mm e devem ser planos)</li>
                                <li>acompanhamento dos rejeitos dentro de toda cadeia produtiva e as possíveis contaminações.</li>
                            </ul>

                            <p><strong>PANalytical (X'pert Pro MPD) DRX (medidas mais rápidas)</strong></p>
                            <ul>
                                <li>Pó (mínimo de 1 grama, leve o pó peneirado e/ou macerado, preferência 230 mesh)</li>
                                <li>Filmes (devem ter máx. 15x15mm2, espessura máx. de 3mm e devem ser planos)</li>
                                <li>Pastilhas (disco devem ter máx. 15mm de diâmetro ou quadrado 15x15mm2, devem ter espessura máx. de 3mm e devem ser planos)</li>
                                <li>Eletrodo (disco devem ter máx. 15mm de diâmetro ou quadrado 15x15mm2, espessura máx. de 3mm e devem ser planos)</li>
                            </ul>

                            <p><strong>Rigaku (ZSX-Mini) FRX-Fluorescência de Raios-X</strong></p>
                            <ul>
                                <li>Pó (leve o pó peneirado e/ou macerado)</li>
                                <li>Filmes (devem ter máx. de 2x2 cm2 e devem ser planos)</li>
                                <li>Pastilhas (diâmetro menor: 17-19,5 mm, diâmetro máx. 30-44mm)</li>
                                <li>Eletrodo (devem ter máx. 2x2cm2 e devem ser planos)</li>
                            </ul> */}
                            
                            <p><strong>Observações importantes</strong></p>
                            <ul>
                                <li>Nos trabalhos de divulgação científica (congressos, teses, dissertações e artigos) coloque um agradecimento especial ao CNPq (Processo: 402561/2007-4) Edital MCT/CNPq nº 10/2007.</li>
                                <li>Enviar as referências dos trabalhos para o endereço lrxufc@gmail.com.</li>
                                <li>No caso de dúvidas, entre em contato com o bolsista ou operador dos equipamentos.</li>
                                <li>As medidas serão enviadas somente após a retirada das amostras.</li>
                                <li>A amostra deve ser entregue em menos de 48 horas, caso contrário, a solicitação será cancelada automaticamente!</li>
                            </ul>
                            
                        </div>
                    </div>
		          </div>
		          <div className="col-lg-4 col-md-12 col-12 col-sm-12 order-1 order-sm-1 order-md-2 order-lg-2">
                        <Login />

                        <div className="card">
                            <div className="card-header">
                                <h4>Links Importantes</h4>
                            </div>
                            <div className="card-body">
                                {/* <p className="text-muted">Dê um zoom para fora</p> */}
                                <ul>
                                    <li>
                                        <ModalHome>Potenialidades das técnicas de DRX e FRX</ModalHome>
                                    </li>
                                    <li>
                                        <a href="http://csd.fisica.ufc.br/documentos/tutorial_slrx.pdf" target="_blank">Tutorial de uso do sistema</a>
                                    </li>
                                    <li>
                                        <a href="http://www.raiosx.ufc.br/site/" target="_blank">Site do Laboratório de Raio x</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h4>Nossa Localização</h4>
                            </div>
                            <div className="card-body">
                                <div id="maps">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3981.2912231146315!2d-38.57732538005999!3d-3.7466149033128886!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6c102749273a7709!2sLRX+-+Laborat%C3%B3rio+de+Raios-X!5e0!3m2!1spt-BR!2sbr!4v1560357188323!5m2!1spt-BR!2sbr" height={350} frameBorder={0} style={{border: 0, width: '100%'}} allowFullScreen />
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
        </Main>
    )
};

export default home;
