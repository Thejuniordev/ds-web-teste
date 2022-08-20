import React from 'react';
import Button from '../DS/Button';
import InputText from '../DS/Input';

import './Form.scss';

export const Form = () => {
  return (
      <form className='form'>
        <div className="form__content">
            <InputText 
                tabIndex={1}
                field={'phone'}
                label='Número de celular'
                placeholder='(xx) 00000-0000' 
                mask="(00) 00000-0000"
                pattern="[\(\)\s\-0-9]*"
                size='medium'
                messageError='Celular obrigatório' 
            />
            <InputText 
                tabIndex={2}
                field={'cpf'} 
                label='Seu CPF'
                placeholder='000.000.000-00'
                mask="000.000.000-00"
                pattern="[\-\.0-9]*"
                size='medium'
                messageError='CPF obrigatório' 
            />
            <InputText 
                tabIndex={3}
                field={'email'} 
                label='Seu e-mail'
                placeholder='exemplo@email.com'
                mask={/^\S*@?\S*$/}
                size='medium'
                messageError='E-mail obrigatório' 
            />
        </div>
        <Button color={'default'} disabled={true} size='medium'>Próximo</Button>
      </form>
  );
}

export default Form;