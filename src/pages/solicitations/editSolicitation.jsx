import React, { useRef, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import { Form } from '@unform/web';
import { GridLoader } from 'react-spinners';

import Main from '../../components/template/Main';
import Eppendorf from '../../assets/img/eppendorf_1.5ml.jpg';

import Select from '../../components/form/Select';
import Input from '../../components/form/Input';
import Choice from '../../components/form/Choice';
import TextArea from '../../components/form/TextArea';
import Button from '../../components/form/Button';

import { getEquipment, editSolicitation, showSolicitation } from '../../services/api';
import { menuOfShape } from '../../datas/menuOfShape';
import { securyData } from '../../datas/securySamples';
import globalErros from '../../components/errors/globalErros';
import Alert from '../../components/events/Alert';

import * as Yup from 'yup';

const twoInitalTheta = new Array(119-3).fill(null).map((_,i) => i+3)
const twoFinalTheta = new Array(120-4).fill(null).map((_,i) => i+4)


function EditSolicitation() {

  const formRef = useRef(null)
  
  const history = useHistory()
	const { sample } = useParams()
  const [selectedMethod, setSelectedMethod] = useState('')
	const [selectedSecury, setSelectedSecury] = useState([])
	const [selectedShapeOfResult, setSelectedShapeOfResult] = useState('')
	const [buttonLoading, setButtonLoading] = useState(false)
	const [loadPage, setLoadPage] = useState(true)
	const [solicitationRes, setSolicitationRes] = useState({})
  const [equipments, setEquipments] = useState({
    DRX: [],
    FRX: []
  })

  const [selectedShape, setSelectedShape] = useState("Pó")

  useEffect(() => {
    async function load (){
      try {
        const res = await getEquipment()
    
        setEquipments({
          DRX: res.data.filter(equipment => equipment.type === 'DRX').sort((a,b) => b.id - a.id),
          FRX: res.data.filter(equipment => equipment.type === 'FRX'),
				})
				
				const resSolicitation = await showSolicitation(sample)
				const [solicitation] = resSolicitation.data
				setSolicitationRes(solicitation)
				setSelectedMethod(solicitation.method)
				setSelectedShape(solicitation.shape)

				const filterSecury = securyData.filter(item => solicitation[item.id] === "Sim").map(item => item.id)
				setSelectedSecury(filterSecury)

				//No json existem thetas com o caracter °, então precisa retirar
				const dois_theta_final = solicitation.settings.tecnica === 'DRX' && solicitation.settings.dois_theta_final.replace('°', '')
				const dois_theta_inicial = solicitation.settings.tecnica === 'DRX' && solicitation.settings.dois_theta_inicial.replace('°', '')
				setSelectedShapeOfResult(solicitation.settings.tecnica === 'FRX' ? solicitation.settings.resultado : '')
				
				const fillSolicitation = {
					composition: solicitation.composition,
					equipment_id: solicitation.equipment_id,
					secury: filterSecury,
					settings: {
						...solicitation.settings,
						dois_theta_final,
						dois_theta_inicial
					},
					note: solicitation.note
				}
				
				formRef.current.setData(fillSolicitation)
				
      } catch (error) {
        Alert({
          title: 'Ops ...',
          type: 'error',
          text: 'Não foi possível carregar os dados para a edição desta amostra.'
				})
				history.push('/solicitacoes')
      } finally {
				setLoadPage(false)
			}
    }
    load()
  }, [history, sample])

  const handleSubmit = async (data) => {
    try {
      setButtonLoading(true)
      const schema = Yup.object().shape({
        equipment_id: Yup.string().required('Campo obrigatório'),
        shape: Yup.string().oneOf(['Pó', 'Filme', 'Pastilha', 'Eletródo', 'Outro'], 'Escolha uma das forma da amostras'),
        composition: Yup.string().required('Campo obrigatório'),
      })

      await schema.validate(data, {
        abortEarly: false
			})
			
			console.log(data);
      const { secury = [] } = data
      const postData = {
        ...data,
        settings: {
          ...data.settings,
          tecnica: selectedMethod
        },
        method: selectedMethod,
        gap_id: 2,
        flammable: secury.find(item => item === 'flammable') ? 'Sim' : 'Não',
        radioactive: secury.find(item => item === 'radioactive') ? 'Sim' : 'Não',
        toxic: secury.find(item => item === 'toxic') ? 'Sim' : 'Não',
        corrosive: secury.find(item => item === 'corrosive') ? 'Sim' : 'Não',
        hygroscopic: secury.find(item => item === 'hygroscopic') ? 'Sim' : 'Não',
				quantity: data.quantity === '' ? 1 : data.quantity,
				id: solicitationRes.id,
				user_id: solicitationRes.user.id
			}
			console.log(postData);

      const res = await editSolicitation(postData)
      Alert({
        title: 'Edição realizada com sucesso!',
        text: res.data.message
      })
			window.scrollTo(0,0)
			// history.push('/solicitacoes')
    } catch (error) {
      globalErros({
        error,
        formRef
      })
    } finally{
      setButtonLoading(false)
    }
  }

  const renderDRX = () => (
    <>
      <div className="form-group">
        <Select
          label="2θ inicial"
          name="settings.dois_theta_inicial"
          required="true"
          defaultValue="10"
        >
          <option value="">Selecione um valor ...</option>
          {twoInitalTheta.map((item, i) => (
            <option key={`two-inital-theta-${i}`} value={`${item}`}>{item}°</option>
          ))}
        </Select>
      </div>
      <div className="form-group">
        <Select
          label="2θ final"
          name="settings.dois_theta_final"
          required="true"
          defaultValue="100"
        >
          <option value="">Selecione um valor ...</option>
          {twoFinalTheta.map((item, i) => (
            <option key={`two-final-theta-${i}`} value={`${item}`}>{item}°</option>
          ))}
        </Select>
      </div>
      <div className="form-group">
        <Input 
          label="Δθ"
          name="settings.delta_dois_theta"
          required="true"
          defaultValue="0,013"
          disabled
          type="text"
        />
      </div>
    </>
  )

  const renderFRX = () => (
    <>
      <div className="form-group">
        <Select
          label="Selecione o tipo de medida "
          name="settings.medida"
          required="true"
          defaultValue="semi-quantitativa"
        >
          <option value="semi-quantitativa">Semi-quantitativa</option>
        </Select>
      </div>
      <div className="form-group">
        <Choice 
          name="settings.resultado"
					label="Selecione a forma dos resultados"
					defaultValue={selectedShapeOfResult}
          options={[
            { id: "oxidos", label: "Óxidos" },
            { id: "elementos", label: "Elementos" },
          ]}
        />
      </div>
    </>
  )

  return (
		<Main title="Editar Solicitação">
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-12 col-sm-12 col-lg-7">
						<center>
							<GridLoader
								sizeUnit={"px"}
								size={30}
								color={'#41b6ad'}
								loading={loadPage}
								/>
						</center>
							<div className="card" style={{display:((loadPage) ? 'none' : 'block')}}>
								<Form ref={formRef} onSubmit={handleSubmit}>
									<div className="card-header">
										<h4>Editar Solicitação - {sample}</h4>
									</div>
									<div className="card-body">
										<div className="form-divider">Tipo de Análise e Equipamento</div>
										<div className="form-group">
											<div className="control-label">Selecione o tipo de análise</div>
											<div className="custom-switches-stacked mt-2">
												<label className="custom-switch">
													<Switch 
														onChange={() => {}}
														disabled
														checked={selectedMethod === 'FRX' || selectedMethod === '' ? false : true}
														checkedIcon={false}
														uncheckedIcon={false}
														height={20}
														width={36}
														onColor="#41b6ad"
														offColor="#e9ecef"
													/>
													<span className="custom-switch-description">DRX</span>
												</label>
												<label className="custom-switch">
													<Switch 
														onChange={() => {}}
														disabled
														checked={selectedMethod === 'DRX' || selectedMethod === '' ? false : true}
														checkedIcon={false}
														uncheckedIcon={false}
														height={20}
														width={36}
														onColor="#41b6ad"
														offColor="#e9ecef"
													/>
													<span className="custom-switch-description">FRX</span>
												</label>
											</div>
										</div>
										<div className="full-form" style={{display:(selectedMethod !== '' ? 'block' : 'none')}}>
											<div className="form-group">
												<Select
													label="Equipamento"
													name="equipment_id"
													required="true"
												>
													{equipments[selectedMethod === '' ? "DRX" : selectedMethod].map(equipment => (
														<option key={`equipment-${equipment.id}`} value={equipment.id}>{equipment.name}</option>
													))}
												</Select>
											</div>
											<div className="form-divider">Informações da Amostra</div>
											<div className="form-group">
												<Select
													label="Escolha o tipo da amostra"
													name="shape"
													required="true"
													onChange={(e) => setSelectedShape(e.target.value)}
												>
													<option value="Pó">Pó </option>
													<option value="Filme">Filme </option>
													<option value="Pastilha">Pastilha </option>
													<option value="Eletródo">Eletródo</option>
													<option value="Outro">Outro</option>
												</Select>
													<small className="text-danger">{menuOfShape[selectedMethod === '' ? "DRX" : selectedMethod][selectedShape]}</small>
											</div>
											<div className="form-divider"><strong>Observações sobre o volume da amostra</strong></div>
											<div className="text-danger">*Sua amostra deve ter um volume mínimo de 0.5 ml.</div>
											<div className="text-danger">*Amostras com um volume menor que 0.5 ml não serão aceitas.</div>
											<div className="form-group text-center img-solicitation">
												<img src={Eppendorf} alt="Eppendorf de 1,5 ml"/>
											</div>
											<div className="form-group">
												<Input 
													label="Composição"
													name="composition"
													required="true"
													obs="Ex: H2SO4, NaCl ..."
													type="text"
													placeholder="Digite a composição da sua amostra"
												/>
											</div>
											<div className="form-group">
												<Choice 
													name="secury"
													label="Segurança"
													multiple="checkbox"
													defaultValue={selectedSecury}
													options={[
														{ id: "flammable", label: "Inflamável" },
														{ id: "toxic", label: "Tóxico" },
														{ id: "hygroscopic", label: "Higroscópico" },
														{ id: "corrosive", label: "Corrosivo" },
														{ id: "radioactive", label: "Radioativo" },
													]}
												/>
											</div>
											<div className="form-divider"><strong>Configurações da análise</strong></div>
											{selectedMethod === 'DRX' && renderDRX()}
											{selectedMethod === 'FRX' && renderFRX()}
											<div className="form-divider"><strong>Observações Gerais</strong></div>
											<div className="form-group">
												<TextArea 
													label="Observações"
													name="note"
													placeholder="Digite alguma observação da amostra caso necessário"
													style={{height:'80px'}}
												/>
											</div>
											<div className="card-footer text-right">
												<Button type="submit" className="btn btn-primary btn-lg btn-block" loading={buttonLoading} name="Solicitar" loadName="Solicitando..."></Button>
											</div>
										</div>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
    </Main>
  );
}

export default EditSolicitation;