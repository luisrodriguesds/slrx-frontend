import React, { useEffect, useState } from 'react';
import { Line, HorizontalBar } from 'react-chartjs-2';
import { getStatisticsSamples, getStatisticsSamplesAllYears, getStatisticsSamplesByGroup } from '../../../services/api';
// import { Container } from './styles';

function Statistics() {
    const [dataAxioX, setDataAxioX] = useState([])
    const [dataAxioDRX, setDataAxioDRX] = useState([])
    const [dataAxioFRX, setDataAxioFRX] = useState([])

    const [dataAxioY, setDataAxioY] = useState([])
    const [dataAxioBar, setDataAxioBar] = useState([])
    
    const [dataSampleYears, setDataSampleYears] = useState([])
    
    const [selectButton, setSelectButton] = useState('7-day')
    const [selectButtonByLab, setSelectButtonByLab] = useState('until-now')
    const [optionsButtonByLab, setOptionsButtonByLab] = useState(() => {
        const years = new Array((new Date().getFullYear()+1) - 2017).fill(null).map((v,i) => 2017+ i)
        years.push('until-now')
        years.reverse()
        return years
    })

    async function load({period='day', value=7}){
        try {
            const res = await getStatisticsSamples({ period, value })
            setDataAxioX(res.data.arr_date)
            setDataAxioDRX(res.data.arr_count_drx)
            setDataAxioFRX(res.data.arr_count_frx)
        } catch (error) {
            
        }
    }

    async function loadStatisticsYears(){
        try {
            const res = await getStatisticsSamplesAllYears()
            setDataSampleYears(res.data.statistics)
        } catch (error) {
            
        }
    }

    async function loadStatisticsSamplesByGroup(year){
        try {
            const res = await getStatisticsSamplesByGroup(year)
            setDataAxioY(res.data.statistics.filter(value => value.laboratory !== 'LRX' ).map(value => value.laboratory))
            setDataAxioBar(res.data.statistics.filter(value => value.laboratory !== 'LRX' ).map(value => value['COUNT(*)']))
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        load({ period:'day', value:7 })
        loadStatisticsYears()
        loadStatisticsSamplesByGroup('until-now')
    }, [])

    useEffect(() => {
        async function loadData(){
            try {
                switch (selectButton) {
                    case '7-day':
                        load({ period:'day', value:7 })
                        break;
                    case '1-month':
                        load({ period:'day', value:30 })
                        break;
                    default:
                        load({ period:'year', value:1 })
    
                        break;
                }
            } catch (error) {
                
            }
        }   
        loadData()
    }, [selectButton])

    useEffect(() => {
        async function loadData(){
            try {
                loadStatisticsSamplesByGroup(selectButtonByLab)
            } catch (error) {
                
            }
        }
        loadData()
    }, [selectButtonByLab])

  return (
    <div className="container">
        <h2 className="mt-4 mb-4">Estatísticas do Laboratório</h2>
        <div className="row">
          <div className="col-lg-8">
              <div className="card">
                  <div className="card-header">
                      <h4>Reallização de Amostras</h4>
                      <div className="card-header-action dropdown">
                          <button data-toggle="dropdown" className="btn btn-danger dropdown-toggle">
                              {selectButton === '7-day' ? `Há 7 dias` : (selectButton === '1-month' ? `Há 1 mês` : `Há 1 ano` )}
                          </button>
                          <ul className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                              <li className="dropdown-title">Selecione o Periodo</li>
                              <li><button onClick={() => setSelectButton('7-day')} className={`dropdown-item ${selectButton === '7-day' && `active`}`}>Há 7 dias</button></li>
                              <li><button onClick={() => setSelectButton('1-month')} className={`dropdown-item ${selectButton === '1-month' && `active`}`}>Há 1 mês</button></li>
                              <li><button onClick={() => setSelectButton('1-year')} className={`dropdown-item ${selectButton === '1-year' && `active`}`}>Há 1 ano</button></li>
                          </ul>
                      </div>
                  </div>
                  <div className="card-body">
                      <Line 
                        data={{
                            labels: dataAxioX,
                            datasets: [
                                {
                                    label: 'DRX',
                                    data: dataAxioDRX,
                                    backgroundColor: '#fde7d3',
                                    borderColor: '#f9b361',
                                    borderWidth: 1
                                },
                                {
                                    label: 'FRX',
                                    data: dataAxioFRX,
                                    backgroundColor: '#cfeffa',
                                    borderColor: '#007bff',
                                    borderWidth: 1
                                }
                            ]
                        }}
                        height={130}
                      />
                  </div>
              </div>
          </div>
          <div className="col-lg-4">
              <div className="card gradient-bottom">
                  <div className="card-header">
                      <h4>Total de amosras por ano</h4>
                  </div>
                  <div className="card-body" id="top-5-scroll" tabIndex="2" style={{height: '315px', overflowY: 'scroll', outline: 'none'}}>
                      <ul className="list-unstyled list-unstyled-border">
                          {dataSampleYears.map((sample, i) => (

                            <li className="media" key={`samples-${i}`}>
                                <img className="mr-3 rounded" width="55" src={`assets/img/products/product-${dataSampleYears.length-i}-50.png`} alt="product" />
                                <div className="media-body">
                                    <div className="float-right">
                                        <div className="font-weight-600 text-muted text-small">{sample.drx+ sample.frx} Amostras</div>
                                    </div>
                                    <div className="media-title">{sample.year}</div>
                                    <div className="mt-1">
                                        <div className="budget-price">
                                            <div className="budget-price-square bg-primary" style={{width: '64%'}}></div>
                                            <div className="budget-price-label">{sample.drx}</div>
                                        </div>
                                        <div className="budget-price">
                                            <div className="budget-price-square bg-danger" style={{width: '43%'}}></div>
                                            <div className="budget-price-label">{sample.frx}</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                          ))}
                      </ul>
                  </div>
                  <div className="card-footer pt-3 d-flex justify-content-center">
                      <div className="budget-price justify-content-center">
                          <div className="budget-price-square bg-primary" data-width="20" style={{width: '20px'}}></div>
                          <div className="budget-price-label">DRX</div>
                      </div>
                      <div className="budget-price justify-content-center">
                          <div className="budget-price-square bg-danger" data-width="20" style={{width: '20px'}}></div>
                          <div className="budget-price-label">FRX</div>
                      </div>
                  </div>
              </div>
          </div>
      
        </div>
        <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                    <h4>Por Laboratório</h4>
                    <div className="card-header-action dropdown">
                        <button data-toggle="dropdown" className="btn btn-danger dropdown-toggle">
                            {selectButtonByLab === 'until-now' ? `Até agora` : selectButtonByLab}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                            <li className="dropdown-title">Selecione o Periodo</li>
                            {optionsButtonByLab.map((year, i) => (
                                <li key={`year-${i}`}>
                                    <button onClick={() => setSelectButtonByLab(year)} className={`dropdown-item ${selectButtonByLab === year && `active`}`}>
                                    {year === 'until-now' ? `Até Agora`: year}
                                    </button>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card-body">
                    <HorizontalBar 
                        data={{
                            labels: dataAxioY,
                            datasets: [
                                {
                                    label: 'Total de amostras pedidas',
                                    data: dataAxioBar,
                                    backgroundColor: '#d4fddc',
                                    borderColor: '#76f387',
                                    borderWidth: 1
                                },
                            ]
                        }}
                        height={500}

                    />
                </div>
              </div>
            </div>
        </div>
      
    </div>
    );
}

export default Statistics;