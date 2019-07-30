import React from 'react';

const Header = (props) => {
  return (
    <section className="section">
      <div className="section-header">
        <h1>{props.title}</h1>
        {/* Salvar caminhon da web <div class="section-header-breadcrumb">
          <div class="breadcrumb-item active"><a href="#">Dashboard</a></div>
          <div class="breadcrumb-item"><a href="#">Bootstrap Components</a></div>
          <div class="breadcrumb-item">Pagination</div>
        </div> */}
      </div>
    </section>
  )
}

export default Header;