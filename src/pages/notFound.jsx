import React from 'react';
import Main from '../components/template/Main'

const notFound = (props) => {
  return (
    <Main title="Página não encontrada">
    <div className="container mt-5">
        <div className="page-error">
          <div className="page-inner">
            <h1>404</h1>
            <div className="page-description">
              A página que você está procurando não pode ser encontrada.
            </div>
            {/*
            <div className="page-search">
              <form>
                <div className="form-group floating-addon floating-addon-not-append">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className="input-group-text">                          
                        <i className="fas fa-search" />
                      </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-primary btn-lg">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="mt-3">
                <a href="index.html">Back to Home</a>
              </div>
            </div>
        	*/}
          </div>
        </div>
      </div>
    </Main>
  )
}

export default notFound;