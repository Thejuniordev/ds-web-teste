import React from "react";

import Logo from '../assets/img/logo.png';

import Form from "../components/Form";

import './main.scss';

export const Main = () => {

  return (
    <div className="main">
      <div className="container">
        <figure className="main__logo">
          <img src={Logo} alt="Carrefour soluções financeiras" />
        </figure>

        <h1 className="main__title">Informe seus dados</h1>

        <Form />
      </div>
    </div>
  );
}

export default Main;
