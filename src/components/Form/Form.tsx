import React from 'react';
import Button from '../DS/Button';
import InputText from '../DS/Input';

import './Form.scss';

export const Form = () => {
  return (
      <form className='form'>
        <div className="form__content">
            <InputText 
                field={''}
                label='Número de celular'
                placeholder='(xx) 00000-0000' 
                size='medium' 
            />
            <InputText 
                field={''} 
                label='Seu CPF'
                placeholder='000.000.000-00'
                size='medium'
            />
            <InputText 
                field={''} 
                label='Seu e-mail'
                placeholder='exemplo@email.com'
                size='medium'
            />
        </div>
        <Button color={'default'} disabled={true} size='medium'>Próximo</Button>
      </form>
  );
}

export default Form;