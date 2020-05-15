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
            {/* <div className="search-element">
              <input className="form-control" type="search" placeholder="Pesquisar" aria-label="Search" data-width={250} />
              <button className="btn" type="submit"><i className="fas fa-search" /></button>
              <div className="search-backdrop" />
              <div className="search-result">
                <div className="search-header">
                  Histórico
                </div>
                <div className="search-item">
                  <a href="#">How to hack NASA using CSS</a>
                  <a href="#" className="search-close"><i className="fas fa-times" /></a>
                </div>
                <div className="search-item">
                  <a href="#">Kodinger.com</a>
                  <a href="#" className="search-close"><i className="fas fa-times" /></a>
                </div>
                <div className="search-item">
                  <a href="#">#Stisla</a>
                  <a href="#" className="search-close"><i className="fas fa-times" /></a>
                </div>
                <div className="search-header">
                  Resultados
                </div>
                <div className="search-item">
                  <a href="#">
                    <img className="mr-3 rounded" width={30} src="assets/img/products/product-3-50.png" alt="product" />
                    oPhone S9 Limited Edition
                  </a>
                </div>
                <div className="search-item">
                  <a href="#">
                    <img className="mr-3 rounded" width={30} src="assets/img/products/product-2-50.png" alt="product" />
                    Drone X2 New Gen-7
                  </a>
                </div>
                <div className="search-item">
                  <a href="#">
                    <img className="mr-3 rounded" width={30} src="assets/img/products/product-1-50.png" alt="product" />
                    Headphone Blitz
                  </a>
                </div>
                <div className="search-header">
                  Projetos
                </div>
                <div className="search-item">
                  <a href="#">
                    <div className="search-icon bg-danger text-white mr-3">
                      <i className="fas fa-code" />
                    </div>
                    Stisla Admin Template
                  </a>
                </div>
                <div className="search-item">
                  <a href="#">
                    <div className="search-icon bg-primary text-white mr-3">
                      <i className="fas fa-laptop" />
                    </div>
                    Create a new Homepage Design
                  </a>
                </div>
              </div>
            </div> */}
          </form>
          
          <ul className="navbar-nav navbar-right">
            {/* Mensagens */}
            {/* <li className="dropdown dropdown-list-toggle">
              <a href="#" data-toggle="dropdown" className="nav-link nav-link-lg message-toggle beep">
                <i className="far fa-envelope" />
              </a>
              <div className="dropdown-menu dropdown-list dropdown-menu-right">
                <div className="dropdown-header">Mensagens
                  <div className="float-right">
                    <a href="#">Marcar como lida</a>
                  </div>
                </div>
                <div className="dropdown-list-content dropdown-list-message">
                  <a href="#" className="dropdown-item dropdown-item-unread">
                    <div className="dropdown-item-avatar">
                      <img alt="image" src="assets/img/avatar/avatar-1.png" className="rounded-circle" />
                      <div className="is-online" />
                    </div>
                    <div className="dropdown-item-desc">
                      <b>Kusnaedi</b>
                      <p>Hello, Bro!</p>
                      <div className="time">10 Hours Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item dropdown-item-unread">
                    <div className="dropdown-item-avatar">
                      <img alt="image" src="assets/img/avatar/avatar-2.png" className="rounded-circle" />
                    </div>
                    <div className="dropdown-item-desc">
                      <b>Dedik Sugiharto</b>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                      <div className="time">12 Hours Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item dropdown-item-unread">
                    <div className="dropdown-item-avatar">
                      <img alt="image" src="assets/img/avatar/avatar-3.png" className="rounded-circle" />
                      <div className="is-online" />
                    </div>
                    <div className="dropdown-item-desc">
                      <b>Agung Ardiansyah</b>
                      <p>Sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <div className="time">12 Hours Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="dropdown-item-avatar">
                      <img alt="image" src="assets/img/avatar/avatar-4.png" className="rounded-circle" />
                    </div>
                    <div className="dropdown-item-desc">
                      <b>Ardian Rahardiansyah</b>
                      <p>Duis aute irure dolor in reprehenderit in voluptate velit ess</p>
                      <div className="time">16 Hours Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="dropdown-item-avatar">
                      <img alt="image" src="assets/img/avatar/avatar-5.png" className="rounded-circle" />
                    </div>
                    <div className="dropdown-item-desc">
                      <b>Alfa Zulkarnain</b>
                      <p>Exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                      <div className="time">Yesterday</div>
                    </div>
                  </a>
                </div>
                <div className="dropdown-footer text-center">
                  <a href="#">View All <i className="fas fa-chevron-right" /></a>
                </div>
              </div>
            </li> */}

            {/* Notificações */}
            {/* <li className="dropdown dropdown-list-toggle">
              <a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep"><i className="far fa-bell" /></a>
              <div className="dropdown-menu dropdown-list dropdown-menu-right">
                <div className="dropdown-header">Notificações
                  <div className="float-right">
                    <a href="#">Marcar como lida</a>
                  </div>
                </div>
                <div className="dropdown-list-content dropdown-list-icons">
                  <a href="#" className="dropdown-item dropdown-item-unread">
                    <div className="dropdown-item-icon bg-primary text-white">
                      <i className="fas fa-code" />
                    </div>
                    <div className="dropdown-item-desc">
                      Template update is available now!
                      <div className="time text-primary">2 Min Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="dropdown-item-icon bg-info text-white">
                      <i className="far fa-user" />
                    </div>
                    <div className="dropdown-item-desc">
                      <b>You</b> and <b>Dedik Sugiharto</b> are now friends
                      <div className="time">10 Hours Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="dropdown-item-icon bg-success text-white">
                      <i className="fas fa-check" />
                    </div>
                    <div className="dropdown-item-desc">
                      <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to <b>Done</b>
                      <div className="time">12 Hours Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="dropdown-item-icon bg-danger text-white">
                      <i className="fas fa-exclamation-triangle" />
                    </div>
                    <div className="dropdown-item-desc">
                      Low disk space. Let's clean it!
                      <div className="time">17 Hours Ago</div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="dropdown-item-icon bg-info text-white">
                      <i className="fas fa-bell" />
                    </div>
                    <div className="dropdown-item-desc">
                      Welcome to Stisla template!
                      <div className="time">Yesterday</div>
                    </div>
                  </a>
                </div>
                <div className="dropdown-footer text-center">
                  <a href="#">Ver todas <i className="fas fa-chevron-right" /></a>
                </div>
              </div>
            </li> */}

            {/* Avatar */}
            <li className="dropdown dropdown-list-toggle">
            {/* dropdown-toggle -> essa class está com problema, modificado arquivo script.js e ela parou de funcionar ???? */}
              <Link to="/" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg nav-link-user">
                <img alt="..." src={user.photo} className="rounded-circle mr-1" />
                <div className="d-sm-none d-lg-inline-block">Olá, {user.name}!</div>
              </Link>
              {/* Menus */}
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-title">Logado há 10 min</div>
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