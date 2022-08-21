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
    </div>
  );
}

export default Main;
