import React from "react";

import Form from "../components/Form";

import './main.scss';

const logo = require('../assets/img/logo.png')

export const Main = () => {
  return (
    <div className="main">
      <div className="container">
        <figure className="main__logo">
          <img src={logo} alt="Carrefour soluções financeiras" />
        </figure>

        <h1 className="main__title">Informe seus dados</h1>

        <Form />
      </div>
      <footer className="main__footer">
        <p className="main__footer--content">© 2021 Banco CSF S.A. CNPJ 08.357.240/0001-50 Av. Doutor Chucri Zaidan, 296 - 19º andar - Vila Cordeiro, São Paulo - SP, 04.583-110</p>
      </footer>
    </div>
  );
}

export default Main;
