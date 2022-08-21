import React, { useState } from 'react';
import Button from '../DS/Button';
import InputText from '../DS/Input';

import './Form.scss';

export const Form = () => {
    const [ phone, setPhone ] = useState('')
    const [ document, setDocument ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ formData, setFormData] = useState({})

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setFormData({
            "Celular": phone,
            "CPF": document,
            "E-mail": email,
        })
    }

    console.log('Valor dos campos:', formData)

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="form__content">
                <InputText 
                    inputMode="numeric"
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
                    inputMode="numeric"
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
                    type='mail'
                    inputMode="email"
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
            <Button 
                color={'default'} 
                disabled={phone && document && email ? false : true} size='medium'
            >
                Próximo
            </Button>
        </form>
    );
}

export default Form;