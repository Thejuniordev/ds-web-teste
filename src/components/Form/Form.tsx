import React, { useState } from 'react';
import Button from '../DS/Button';
import InputText from '../DS/Input';

import './Form.scss';

export const Form = () => {
    const [ phone, setPhone ] = useState('')
    const [ document, setDocument ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState(false)

    console.log('Valor da bagaça', phone)
    return (
        <form className='form'>
            <div className="form__content">
                <InputText 
                    tabIndex={1}
                    field={'phone'}
                    value={phone}
                    label='Número de celular'
                    placeholder='(xx) 00000-0000' 
                    mask="(00) 00000-0000"
                    pattern="[\(\)\s\-0-9]*"
                    size='medium'
                    onChange={(e: any) => setPhone(e.target.value)}
                    messageError={!phone ? 'Celular obrigatório' : ''}
                />
                <InputText 
                    tabIndex={2}
                    field={'cpf'} 
                    value={document}
                    label='Seu CPF'
                    placeholder='000.000.000-00'
                    mask="000.000.000-00"
                    pattern="[\-\.0-9]*"
                    size='medium'
                    onChange={(e: any) => setDocument(e.target.value)}
                    messageError={!document ? 'CPF obrigatório' : ''}
                />
                <InputText 
                    tabIndex={3}
                    field={'email'} 
                    value={email}
                    label='Seu e-mail'
                    placeholder='exemplo@email.com'
                    mask={/^\S*@?\S*$/}
                    size='medium'
                    onChange={(e: any) => setEmail(e.target.value)}
                    messageError={!email ? 'E-mail obrigatório' : ''} 
                />
            </div>
            <Button color={'default'} disabled={true} size='medium'>Próximo</Button>
        </form>
    );
}

export default Form;