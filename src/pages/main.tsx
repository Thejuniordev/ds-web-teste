import React from "react";
import Button from "../components/DS/Button";
import InputText from "../components/DS/Input";

import Logo from '../assets/img/logo.png';

import './main.scss';

export const Main = () => {

  return (
    <div className="main">
      <div className="container">
        <figure className="main__logo">
          <img src={Logo} alt="Carrefour soluções financeiras" />
        </figure>

        <h1 className="main__title">Informe seus dados</h1>
      </div>
    </div>
  );
}

export default Main;
