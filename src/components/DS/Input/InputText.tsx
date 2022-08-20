/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import numeral from 'numeral'
import IMask from 'imask'

import './InputText.scss';

interface Props extends React.AriaAttributes {
  field: string;
  color?: string;
  label?: string;
  placeholder?: string;
  value?: string
  messageError?: string
  helpText?: string
  tabIndex?: number;
  disabled?: boolean;
  type?: string;
  size?: string;
  pattern?: string
  format?: string
  mask?: string | RegExp | { mask: string | RegExp }
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export const InputText: React.FC<Props> = ({ 
    field,
    color,
    label,
    placeholder,
    value: valueProp,
    helpText,
    messageError,
    tabIndex,
    disabled = false,
    type,
    size,
    pattern,
    format,
    mask,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onInput,
    onPaste,
    onClick,
    ...props
  }) => {

  const formatMask = useCallback(
    (value: string | number): string => {
      if (mask) {
        let opts: any = {}
        if (typeof mask === 'string' || mask instanceof RegExp) {
          opts = { mask }
        } else {
          opts = mask
        }
        return IMask.createMask(opts).resolve(value.toString())
      }
      if (typeof value === 'number') {
        return value.toString()
      }
      return value
    },
    [mask]
  )

  const formatIn = useCallback(
    (value?: string | number): string | number => {
      if (value === undefined) {
        return ''
      }

      if (format) {
        if (value > 0) {
          return numeral(Number(value)).format(format)
        }
        if (!value || value === '0') {
          return ''
        }
      }

      return formatMask(value)
    },
    [format, formatMask]
  )

  const formatOut = useCallback(
    (value: string): string => {
      if (format && value) {
        const cleaned =
          numeral.locale() === 'en'
            ? value
                .toString()
                .replace(/[^0-9]+/g, '')
                .replace(/,/g, '')
            : value
                .toString()
                .replace(/[^0-9]+/g, '')
                .replace(/\./g, '')
                .replace(',', '')
        return Number(cleaned).toString()
      }
      return formatMask(value)
    },
    [format, formatMask]
  )

  const [value, setValue] = useState(formatIn(valueProp))

  

  const inputRef = useRef<any>(null);

	const _handleChange = (event: any) => {
    if (event.target.parentElement) { 
      if (event.target.value.length === 0) {
        event.target.parentElement.classList.remove("input__filled");
      } else if (event.target.parentElement) {
        event.target.parentElement.classList.add("input__filled");
      }
      
      if (event.currentTarget === document.activeElement) {
        event.target.parentElement.classList.add("input__focus");
      } else {
        event.target.parentElement.classList.remove("input__focus");
      }
    }
	}

  const onChangeLocal = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      ev.persist()
      let newValue = formatOut(ev.target.value)
      if (format && newValue === '0') {
        newValue = ''
      }
      setValue(newValue)
      if (onChange) {
        ev.target.value = newValue
        return onChange(ev)
      }
    },
    [formatOut, format, onChange]
  )

  useEffect(() => {
    if (valueProp !== undefined) {
      const newValue = formatIn(valueProp)

      if (newValue !== formatIn(value)) {
        setValue(newValue)
      }
    }
  }, [valueProp, value, formatIn])

  useEffect(() => {
        if (inputRef.current) {
          
          // Bind the event listener
          inputRef.current.addEventListener("change", _handleChange);
          inputRef.current.addEventListener("blur", _handleChange);
          inputRef.current.addEventListener("focus", _handleChange)
        };
        
        return () => {
          if (inputRef.current) {
            // Unbind the event listener on clean up
            inputRef.current.removeEventListener("change", _handleChange);
            inputRef.current.removeEventListener("blur", _handleChange);
            inputRef.current.removeEventListener("focus", _handleChange);
          }
        };
  }, [inputRef]);

  return (
    <div 
      tabIndex={-1}
      className={`
        input${color ? '--' + color : ''} 
        ${disabled ? "input__disabled" : ""} 
        ${size ? "input__" + size : ""}`}
    >
      <label
        className="input__label"
        htmlFor={field}
      >
        {label}
      </label>
      <input
        tabIndex={disabled || !tabIndex ? -1 : tabIndex}
        placeholder={placeholder}
        type={type}
        id={field}
        value={value}
        name={field}
        disabled={disabled}
        readOnly={disabled}
        onClick={onClick}
        onChange={onChangeLocal}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onInput={onInput}
        onPaste={onPaste}
        ref={inputRef}
        {...props}
      />
      {!messageError && helpText && (
        <span className={'input__help'}>{helpText}</span>
      )}
      {messageError && (
        <div className="input__error">{messageError}</div>
      )}
      
    </div>
  );
}

export default InputText;