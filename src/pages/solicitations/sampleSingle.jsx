import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GridLoader } from 'react-spinners';
import { useParams, Link } from 'react-router-dom';

import { sampleStatus } from '../../datas/sampleStatus';
import { securyData } from '../../datas/securySamples';

import Main from '../../components/template/Main';
import Alert from '../../components/events/Alert';
import GlobalErros from '../../components/errors/globalErros';

import { showSolicitation, nextStepSolicitationFiveToSex } from '../../services/api';
import { useAuth } from '../../context/auth';

function SingleSolicitation() {
  const { sample } = useParams() 

  const { user } = useAuth()
  const permissions = useMemo(() => {
    return ['administrador', 'operador']
  }, [])

  const [loadingPage, setLoadingPage] = useState(true)
  const [currentPhase, setCurrentPhase] = useState('')
  const [currentColor, setCurrentColor] = useState('')
  const [securies, setSecuries] = useState('')
  const [file, setFile] = useState(null)
  const [solicitation, setSolicitation] = useState({
    user: {},
    equipment: {},
    settings: {}
  })

  const load = useCallback(async () => {
    try {
      const res = await showSolicitation(sample)
      const [resSolicitation] = res.data

      const filterSecury = securyData.filter(item => resSolicitation[item.id] === "Sim").map(item => item.label)
      setSecuries(filterSecury.length > 0 ? filterSecury.join(', ') : '')
      setSolicitation(resSolicitation)
      setCurrentPhase(sampleStatus.find(item => item.number === resSolicitation.status).descripiton)
      setCurrentColor(resSolicitation.status < 1 ? 'red' : (resSolicitation.status === 7 ? 'green' : 'blue'))
    } catch (error) {
      
    }finally {
      setLoadingPage(false)
    }
  }, [sample])
  
  useEffect(() => {
    load()
  }, [load])

  const fileUpload = useCallback(async (id, sendFile) => {
    const formData = new FormData();
	    formData.append('id', id)
	    formData.append('sample', sendFile)
	    const config = {
	        headers: {
	            'content-type': 'multipart/form-data'
	        }
	    }
	    return await nextStepSolicitationFiveToSex(formData, config)
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (file === null) {
      Alert({
        title: 'Opss...',
        type: 'error',
        text: 'Um arquivo precisa ser enviado!'
      })
    }

    try {
      await fileUpload(solicitation.id, file)
      await load()
      Alert({
        title: 'Sucesso',
        text: 'Arquivo enviado com sucesso!'
      })
    } catch (error) {
      await load()
      GlobalErros({
        error
      })
    }finally {
			window.scroll(0,0);
    }
    
  }, [file, fileUpload, load, solicitation.id])


  return (
    <Main title="Amostra">
      <center>
        <GridLoader
          sizeUnit={"px"}
          size={30}
          color={'#41b6ad'}
          loading={loadingPage}
          />
      </center>
      <div className="row" style={{display:(loadingPage ? 'none': 'flex')}}>
        <div className="col-12 col-sm-12 col-lg-6">
          <div className="card card-primary">
            <div className="card-header">
              <h4>{solicitation.name}</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Solicitante:</p>
                    <span>
                      {permissions.includes(user.access_level_slug) ? (
                        <Link to={`/usuarios/ver-perfil/${solicitation.user.id}`}>
                          {solicitation.user.name}
                        </Link>
                      ): (
                        <span>
                          {solicitation.user.name}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Status:</p>
                    <span className="font-weight-bold font-italic" style={{color:`${currentColor}`}}>{currentPhase}</span>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Data da Solicitação:</p>
                    <span>
                      {new Date(solicitation.created_at).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Data do Recebimento:</p>
                    <span>
                      {new Date(solicitation.received_date).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Equipamento:</p>
                    <span>
                      {solicitation.equipment.name}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Composição:</p>
                    <span>
                      {solicitation.composition}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Forma:</p>
                    <span>
                      {solicitation.shape}
                    </span>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-group">
                    <p className="font-weight-bold">Método:</p>
                    <span>
                      {solicitation.method}
                    </span>
                  </div>
                </div>
                {solicitation.method === 'DRX' && (
                  <>
                    <div className="col-12 col-lg-4">
                      <div className="form-group">
                        <p className="font-weight-bold">2θ Inicial:</p>
                        <span>
                          {solicitation.settings.dois_theta_inicial}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="form-group">
                        <p className="font-weight-bold">2θ Final:</p>
                        <span>
                          {solicitation.settings.dois_theta_final}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="form-group">
                        <p className="font-weight-bold">Δθ:</p>
                        <span>
                          {solicitation.settings.delta_dois_theta}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {solicitation.method === 'FRX' && (
                  <>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <p className="font-weight-bold">Tipo de Medida:</p>
                        <span>
                          {solicitation.settings.medida}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <p className="font-weight-bold">Forma do Resultado:</p>
                        <span>
                          {solicitation.settings.resultado}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {securies && (
                  <div className="col-12">
                    <div className="form-group">
                      <p className="font-weight-bold">Segurança:</p>
                      <span>
                        {securies}
                      </span>
                    </div>
                  </div>
                )}
                {solicitation.note && (
                  <div className="col-12">
                    <div className="form-group">
                      <p className="font-weight-bold">Observações:</p>
                      <span>
                        {solicitation.note}
                      </span>
                    </div>
                  </div>
                )}
                <div className="col-12">
                  <div className="form-group">
                    <span>
                      {solicitation.status === 7 || (permissions.includes(user.access_level_slug) && solicitation.status === 6) ? (
                        <a href={solicitation.download} className="btn btn-danger">
                          Download da medida
                        </a>
                      ) : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {solicitation.status === 5 && (
            <div className="card card-primary">
              <div className="card-header">
                <h4>Enviar resultado</h4>
              </div>
              <div className="card-body">
                <form method="post" onSubmit={handleSubmit} encType="multipart/form-data" className="disabled-with-errors has-validation-callback">
                  <div className="form-group">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} required="" />
                  </div>
                  <input type="submit" value="Enviar" className="btn btn-primary" />
                </form>
              </div>
            </div>
          )}

        </div>
        <div className="col-12 col-sm-12 col-lg-6">
          <div className="activities">
            {sampleStatus.map((value,i) => {
              if (value.number >= 1 && value.number <= solicitation.status) {
                return (
                  <div key={i} className="activity">
                    <div className={`activity-icon ${(value.number === solicitation.status) ? 'bg-danger' : 'bg-primary'} text-white shadow-primary`}>
                      <strong>{value.number}</strong>
                    </div>
                    <div className="activity-detail">
                      <div className="mb-2">
                        <span className="text-job">{new Date(solicitation.updated_at).toLocaleString('pt-BR')}</span>
                        <span className="bullet" />
                        <Link className="text-job" to="/">Ver</Link>
                      </div>
                      <p>{value.descripiton}</p>
                    </div>
                  </div>
                );
              }
              return ''
            })}

          </div>
        </div>
      </div>
    </Main>
  );
}

export default SingleSolicitation;