import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getMenu} from '../../services/api';
const Sidebar = () => {
  const [menu, setMenu] = useState([]);
  const [url, setUrl] = useState('')
  useEffect(() => {
    async function callMenu() {
      try {
        const res = await getMenu();
        setMenu(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    callMenu();  
  }, [])

  useEffect(() => {
    const current = window.location.hash.slice(1).split('/')
    setUrl(current[1])
  }, [])


  function handleCurrentMenu(urlCurrent){
    setUrl(urlCurrent.slice(1))
  }


  return (
      <div className={`main-sidebar sidebar-style-2`}>
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <Link to="/dashboard">Sistema LRX</Link>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
            <Link to="/dashboard">SLRX</Link>
          </div>
          <ul className="sidebar-menu">
            <li className="menu-header">Dashboard</li>
            <li className={`dropdown dashboard ${url === 'dashboard' ? `active` : ``}`} onClick={() => handleCurrentMenu('/dashboard')}>
              <Link to="/dashboard" className="nav-link"><i className="fas fa-fire" /><span>Dashboard</span></Link>
            </li>
            <li className="menu-header">Menus</li>
            {menu && menu.map(section => {
              
              return (
              <li className={`dropdown ${url === section.url.slice(1) ? `active` : ``}`} key={section.id}>
                <Link to="#" className="nav-link has-dropdown" data-toggle="dropdown"><i className={section.icon} /> 
                  <span>{section.section}</span>
                </Link>
                <ul className="dropdown-menu">
                  
                  {section.itens.map((item, i) => {
                    return (
                        <li key={`sub-${i}`} onClick={() => handleCurrentMenu(section.url)}>
                          <Link className="nav-link" to={item.url}>{item.name}</Link>
                        </li>                      
                    )
                  })}
                </ul>
              </li>
              )
            })}

            
            {/* <li className="dropdown">
              <Link to="#" className="nav-link has-dropdown" data-toggle="dropdown"><i className="fas fa-file-alt" /> 
                <span>Arquivos Úteis</span>
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="nav-link" to="/arquivos-uteis/enviar">Enviar Arquivo</Link></li>
                <li><Link className="nav-link" to="/arquivos-uteis">Ver Arquivos</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#" className="nav-link has-dropdown" data-toggle="dropdown"><i className="fas fa-plug" /> 
                <span>Equipamentos</span>
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="nav-link" to="/equipamentos">Todos os Equipamentos</Link></li>
                <li><Link className="nav-link" to="/equipamentos/cadastro">Cadastrar Equipamento</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#" className="nav-link has-dropdown" data-toggle="dropdown"><i className="far fa-user" /> 
                <span>Usuários</span>
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="nav-link" to="/usuarios">Todos os Usuários</Link></li>
                <li><Link className="nav-link" to="/usuarios/cadastro">Cadastrar Usuário</Link></li>
                <li><Link className="nav-link" to="/usuarios/professores">Professores</Link></li>
                <li><Link className="nav-link" to="/usuarios/alunos">Alunos</Link></li>
                <li><Link className="nav-link" to="/usuarios/operadores">Operadores</Link></li>
                <li><Link className="nav-link" to="/usuarios/funcionarios">Funcionarios de Empresa</Link></li>
                <li><Link className="nav-link" to="/usuarios/empresas">Empresas</Link></li>
                <li><Link className="nav-link" to="/usuarios/pendentes">Usuários não confirmados</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <Link to="#" className="nav-link has-dropdown" data-toggle="dropdown"><i className="fas fa-location-arrow" /> 
                <span>Solicitações</span>
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="nav-link" to="/solicitacoes">Todas as Solicitações</Link></li>
                <li><Link className="nav-link" to="/solicitacoes/cadastro">Cadastrar Solicitação</Link></li>
                <li><Link className="nav-link" to="/solicitacoes/abertas">Abertas</Link></li>
                <li><Link className="nav-link" to="/solicitacoes/concluidas">Concluídas</Link></li>
                <li><Link className="nav-link" to="/solicitacoes/tutoriais">Tutoriais</Link></li>
              </ul>
            </li>  */}
            {/* <li className="dropdown">
              <Link to="/fornos" className="nav-link"><i className="fas fa-server" /> 
                <span>Fornos</span>
              </Link>
            </li>   */}
          </ul>
        </aside>
      </div>
  )
}

export default Sidebar;