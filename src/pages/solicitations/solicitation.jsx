import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { GridLoader } from 'react-spinners';

import Main from '../../components/template/Main';

import Alert from '../../components/events/Alert';
import Confirm from '../../components/events/Confirm';
import Paginate from '../../components/events/Paginate';


import { 
  getSolicitation, 
  filterSolicitation, 
  searchSolicitation, 
  nextStepSolicitation,
  destroyAllSolicitation,
  destroySolicitation,
} from '../../services/api';
import { sampleStatus } from '../../datas/sampleStatus';
import { useAuth } from '../../context/auth';

function Solicitations() {
  
  const [loadingPage, setLoadingPage] = useState(true)
  const [selectedSolicitation, setSelctedSolicitation] = useState([])
  const [seletedFilter, setSelectedFilter] = useState('Filtro')
  const [search, setSearch] = useState('')
  const [solicitations, setSolicitations] = useState({
    data: [],
    page: 0,
    total: 0,
    perPage: 0
  })

  const loaded = useRef(false)

  const { user } = useAuth()
  const permissions = useMemo(() => {
    return ['administrador', 'operador', 'professor']
  }, [])

  async function mainLoad(){
    try {
      const res = await getSolicitation({page:1})
      setSolicitations(res.data)
    } catch (error) {
      Alert({
        title: 'Opss...',
        type: 'error',
        text: 'Não foi possível carregar os componentes nessário, por favor entre em contato com o suporte técnico'
      })
    } finally {
      setLoadingPage(false)
    }
  }
  useEffect(() => {
    mainLoad()
  }, [])

  // Just search when the user stopping type ( Called debouncing)
  useEffect(() => {
    // Excute just after the first render
    if (!loaded.current) {
      loaded.current = true
      return      
    }

    try {
      const timer = setTimeout(() => {
        searchSolicitation(search).then(res => {
          setSolicitations(res.data)
        })
      }, 1000)
      setSelctedSolicitation([])
      return () => clearTimeout(timer)
    } catch (error) {
      Alert({
        title: 'Opss...',
        type: 'error',
        text: 'Não foi possível carregar os componentes nessário, por favor entre em contato com o suporte técnico'
      })
    }
  }, [search])

  // Quando saber se a percistencia veio de filter ou de index
  const handleFilter = useCallback(async (option) => {
    try {
      const res = await filterSolicitation(option)
      setSelectedFilter(option)
      setSolicitations(res.data)
    } catch (error) {
      Alert({
        title:'Opss...',
        text:'Algo de inesperado aconteceu, contate o suporte técnico',
        type: 'error'
      })
    }
  }, [])

  const handleNextStepAll = useCallback(async () => {
    if (selectedSolicitation.length === 0) {
      Alert({
        title: 'Ops...',
        type: 'error',
        text: 'Nenhuma amostra foi selecionada.'
      })
      return
    }
    
    const confirmation = await Confirm({ 
      title: 'Você tem certeza?',
      type: 'warning',
      text: 'Você tem certeza que deseja passar as amostras selecionadas para a próxima fase?'
    })

    if (!confirmation) {
      return
    }
    
    try {
      // This is wrong, fix this in some time. In backend is next_step_all
      await Promise.all(selectedSolicitation.map(async id => {
        await nextStepSolicitation(id)
        return
      }))

      setSelctedSolicitation([])
      await mainLoad()
      Alert({
        title:'Sucesso!.',
        text:'Amostras atualizadas com sucesso!',
      })
    } catch (error) {
      Alert({
        title:'Opss...',
        text:'Algo de inesperado aconteceu, contate o suporte técnico',
        type: 'error'
      })
    }
    
  }, [selectedSolicitation])

  const handleDeleteAll = useCallback(async () => {
    if (selectedSolicitation.length === 0) {
      Alert({
        title: 'Ops...',
        type: 'error',
        text: 'Nenhuma amostra foi selecionada.'
      })
      return
    }
    
    const confirmation = await Confirm({ 
      title: 'Você tem certeza?',
      type: 'warning',
      text: 'Você tem certeza que deseja excluir as amostras selecionadas?'
    })

    if (!confirmation) {
      return
    }

    try {
      await destroyAllSolicitation(selectedSolicitation)
      setSelctedSolicitation([])

      await mainLoad()
      Alert({
        title:'Sucesso!.',
        text:'Amostras deletadas com sucesso!',
      })
    } catch (error) {
      Alert({
        title:'Opss...',
        text:'Algo de inesperado aconteceu, contate o suporte técnico',
        type: 'error'
      })
    }
    
  }, [selectedSolicitation])

  const handleNextStep = useCallback(async (id) => {
    const confirmation = await Confirm({ 
      title: 'Você tem certeza?',
      type: 'warning',
      text: 'Você tem certeza que deseja passar a amostra selecionada para a próxima fase?'
    })

    if (!confirmation) {
      return
    }

    try {
      await nextStepSolicitation(id)
      await mainLoad()
      setSelctedSolicitation([])
      Alert({
        title:'Sucesso!.',
        text:'Amostra atualizada com sucesso!',
      })
    } catch (error) {
      Alert({
        title:'Opss...',
        text:'Algo de inesperado aconteceu, contate o suporte técnico',
        type: 'error'
      })
    }

  }, [])

  const handleDelete = useCallback(async (name) => {
    const confirmation = await Confirm({ 
      title: 'Você tem certeza?',
      type: 'warning',
      text: 'Você tem certeza que deseja excluir a amostra selecionada?'
    })

    if (!confirmation) {
      return
    }

    try {
      await destroySolicitation(name)
      await mainLoad()
      setSelctedSolicitation([])
      Alert({
        title:'Sucesso!.',
        text:'Amostra deletada com sucesso!',
      })
    } catch (error) {
      console.log(error);
      Alert({
        title:'Opss...',
        text:'Algo de inesperado aconteceu, contate o suporte técnico',
        type: 'error'
      })
    }

  }, [])

  const handleCheckboxAll = useCallback((e) => {
    if (e.target.checked) {
      const newSolicitations = solicitations.data.map(s => s.id)
			setSelctedSolicitation(newSolicitations)
		}else{
			setSelctedSolicitation([])
		}
  }, [solicitations.data])

  const handleCheckbox = useCallback((id) => {
    const auxSolicitations = selectedSolicitation
    const check = selectedSolicitation.filter(item => item === id);
    if(check.length > 0){
      const filterSolicitation = auxSolicitations.filter(item => item !== id)
      setSelctedSolicitation(filterSolicitation);
      return
    }
    setSelctedSolicitation([...auxSolicitations, id])
  }, [selectedSolicitation])

  const handleLoadNewPage = useCallback(async (page) => {
		try {
			let res = await getSolicitation({page});
			setSolicitations(res.data);
			window.scroll(0,0);
		} catch (error) {
			Alert({
        title:'Opss...',
        text:'Algo de inesperado aconteceu, contate o suporte técnico',
        type: 'error'
      })
		}
	}, [])
  
  return (
    <Main title="Solicitações">
      <div className="row">
        <div className="col-12">
          <center>
            <GridLoader
              sizeUnit={"px"}
              size={30}
              color={'#41b6ad'}
              loading={loadingPage}
              />
          </center>
          <div className="card" style={{display:((loadingPage) ? 'none' : 'block'), width:'100%'}}>
            <div className="card-header">
              <h4>Amostras</h4>
              <div className="card-header-form" style={{width:'100%'}}>
                <div className="row" style={{width:'100%'}}>
							  	<div className="col-lg-6 col-md-6 col-sm-6 col-12 text-left p-0">
                    {/* Opções da header deste card */}
									  <div className="option-group">
                      <div className="dropdown">
                        <button className="dropdown-toggle btn btn-primary" data-toggle="dropdown">{seletedFilter}</button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <button onClick={() => handleFilter('Filtro')} className="dropdown-item has-icon">Filtro</button>
                          <button onClick={() => handleFilter('Abertas')} className="dropdown-item has-icon">Abertas</button>
                          <button onClick={() => handleFilter('DRX')} className="dropdown-item has-icon">DRX</button>
                          <button onClick={() => handleFilter('FRX')} className="dropdown-item has-icon">FRX</button>
                          <button onClick={() => handleFilter('1')} className="dropdown-item has-icon">Status 1</button>
                          <button onClick={() => handleFilter('2')} className="dropdown-item has-icon">Status 2</button>
                          <button onClick={() => handleFilter('3')} className="dropdown-item has-icon">Status 3</button>
                          <button onClick={() => handleFilter('4')} className="dropdown-item has-icon">Status 4</button>
                          <button onClick={() => handleFilter('5')} className="dropdown-item has-icon">Status 5</button>
                          <button onClick={() => handleFilter('6')} className="dropdown-item has-icon">Status 6</button>
                          <button onClick={() => handleFilter('7')} className="dropdown-item has-icon">Status 7</button>
                        </div>
                      </div>

                      <Link to="/solicitacoes/cadastro" title="Cadastrar" className="btn btn-primary ml-1 mr-1"><i className="fas fa-plus"></i></Link>
                      {/* Para adm, operador e provfessor */}
                      {permissions.includes(user.access_level_slug) && (
                        <button 
                          data-toggle="tooltip" 
                          onClick={() => handleNextStepAll()} 
                          title="Passar todas para a próxima fase" 
                          className="btn btn-info mr-1"
                        >
                          <i className="fas fa-arrow-alt-circle-right"></i>
                        </button>
                      )}
                      <button 
                        data-toggle="tooltip" 
                        title="Cancelar" 
                        onClick={() => handleDeleteAll()} 
                        className="btn btn-danger mr-1"
                      >
                          <i className="fas fa-trash"></i>
                        </button>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right">
                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                      <div className="input-group">
                        <input 
                          type="text" 
                          className="form-control" 
                          name="search" 
                          placeholder="Pesquise pelo nome da amostra" 
                          onChange={(e) => setSearch(e.target.value)} 
                        />
                        <div className="input-group-btn">
                          <button className="btn btn-primary">
                            <i className="fas fa-search" />
                          </button>
                        </div>
                      </div>
                    </form>
								  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      <div className="custom-checkbox custom-control">
                        <input 
                          type="checkbox" 
                          onClick={handleCheckboxAll}
                          data-checkboxes="mygroup" 
                          data-checkbox-role="dad" 
                          className="custom-control-input" 
                          id="checkbox-all" 
                        />
                        <label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
                      </div>
                    </th>
                    <th>Código</th>
                    <th>Equipamento</th>
                    <th className="width-fixed">Status</th>
                    <th>Data da Solicitação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitations.data.map((solicitation, i) => (
                    <tr key={solicitation.id}>
                      <td className="p-0 text-center">
                        <div className="custom-control custom-checkbox">
                          <input 
                            type="checkbox"
                            onChange={() => {}}
                            checked={selectedSolicitation.includes(solicitation.id)}
                            data-checkboxes="mygroup" 
                            onClick={() => handleCheckbox(solicitation.id)} 
                            className="custom-control-input" 
                            value={solicitation.id} 
                            name={`check-${i}`} 
                            id={`checkbox-${i}`} 
                          />
                          <label className="custom-control-label" htmlFor={`checkbox-${i}`}>&nbsp;</label>
                        </div>
                      </td>
                      <td className="weight">
                        <Link to={`/solicitacoes/ver-amostra/${solicitation.name}`}>
                          {solicitation.name}
                        </Link>
                        <div className="sample-info">
                          {solicitation.method === 'DRX' ? (
                            <small>
                              {solicitation.settings.dois_theta_inicial} a {solicitation.settings.dois_theta_final}
                            </small>
                          ) : (
                            <small>{solicitation.settings.resultado}</small> 
                          )}
                        </div>
                      </td>
                      <td className="align-middle">
                        {solicitation.equipment && solicitation.equipment.name}
                      </td>
                      <td title={sampleStatus.find((item) => item.number === solicitation.status).descripiton}>
                        {sampleStatus.map((item, i) => {
                          if (item.number >= 1) {		                      		
                            return (
                              <div 
                                className={`badge badge-${(item.number <= solicitation.status ? `success` : `danger`)}`}
                                key={`status-${i}`} 
                                data-toggle="tooltip" 
                                title={item.descripiton}
                              >
                                {
                                  (solicitation.status < 1) ? (
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                  ) : 
                                  item.number
                                }
                              </div>
                            )
                          }
                          return ''
                        })}
                      </td>
                      <td>
                        {new Date(solicitation.created_at).toLocaleString('pt-BR')}
                      </td>
                      <td>
                        <div className="btn-group">
                      {permissions.includes(user.access_level_slug) && (
                        <button 
                          data-toggle="tooltip" 
                          title="Passar para a próxima fase" 
                          onClick={() => handleNextStep(solicitation.id)} 
                          className="btn btn-info"
                        >
                          <i className="fas fa-arrow-alt-circle-right"></i>
                        </button>
                      )}

                          <Link 
                            to={`/solicitacoes/editar/${solicitation.name}`} 
                            className="btn btn-warning" 
                            title="Editar"
                          > 
                            <i className="fas fa-edit"></i> 
                          </Link>

                          <button 
                            className="btn btn-danger" 
                            title="Excluir" 
                            onClick={() => handleDelete(solicitation.name)}
                          > 
                            <i className="fas fa-trash"></i> 
                          </button>
									      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
            <div className="card-footer">
							<div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-left">
                  ({solicitations.data.length*(solicitations.page)}/{solicitations.total})
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-right">
                    {/* {this.renderPaginate()} */}
                    <Paginate 
                      currentPage={solicitations.page}
                      totalPage={Math.ceil(solicitations.total/solicitations.perPage)}
                      perPage={solicitations.perPage}
                      totalRow={solicitations.total}
                      handleLoadNewPage={handleLoadNewPage}
                    />
                </div>
							</div>
					  </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Solicitations;