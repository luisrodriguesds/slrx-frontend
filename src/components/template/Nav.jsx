import React from 'react';
import {Link} from 'react-router-dom';

import { useAuth } from '../../context/auth'

function Nav(props){
  const { user, signOut } = useAuth()
  
  return (
    <React.Fragment>
        <div className="navbar-bg" />
        <nav className="navbar navbar-expand-lg main-navbar">
          <form className="form-inline mr-auto">
            <ul className="navbar-nav mr-3">
              <li>
                <Link to="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fas fa-bars" /></Link>
              </li>
              <li>
                <Link to="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none"><i className="fas fa-search" /></Link>
              </li>
            </ul>
          </form>
          
          <ul className="navbar-nav navbar-right">
            <li className="dropdown dropdown-list-toggle">
            {/* dropdown-toggle -> essa class está com problema, modificado arquivo script.js e ela parou de funcionar ???? */}
              <Link to="/" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg nav-link-user">
                <img alt="..." src={user.photo} className="rounded-circle mr-1" />
                <div className="d-sm-none d-lg-inline-block">Olá, {user.name}!</div>
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-title">Logado há 10 min</div>
                <Link to="/estatisticas" className="dropdown-item has-icon">
                  <i className="fas fa-calculator" /> Estatísticas
                </Link>
                <Link to="/perfil" className="dropdown-item has-icon">
                  <i className="far fa-user" /> Perfil
                </Link>
                <Link to="/alterar-senha" className="dropdown-item has-icon">
                  <i className="fas fa-lock" /> Alterar Senha
                </Link>
                <Link to="/editar-conta" className="dropdown-item has-icon">
                  <i className="fas fa-cog" /> Editar Conta
                </Link>
                <div className="dropdown-divider" />
                <Link to="/" onClick={() => { signOut() } } className="dropdown-item has-icon text-danger">
                    <i className="fas fa-sign-out-alt" /> Sair
                </Link>
              </div>
            </li>
          </ul>
        </nav>
    </React.Fragment>
  )
}

export default Nav;