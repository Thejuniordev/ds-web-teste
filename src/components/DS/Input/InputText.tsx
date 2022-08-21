/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, useCallback, useEffect, useState } from "react";
import numeral from 'numeral'
import IMask from 'imask'

import './InputText.scss';

export interface Props extends React.AriaAttributes {
  field: string;
  color?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  status?: 'success' | 'warning' | 'error';
  messageError?: string;
  inputRef?: RefObject<any>;
  helpText?: string;
  tabIndex?: number;
  disabled?: boolean;
  invalid?: boolean;
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
    className: classNameProp,
    value: valueProp,
    status,
    helpText,
    messageError,
    inputRef,
    tabIndex,
    disabled = false,
    invalid,
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

  const classesFromObject = (classes: any, additionalClassName?: string) => {
    const availableClasses = [
      ...Object.keys(classes).filter((cls?: string) => cls && !!classes[cls]),
      ...[additionalClassName]
    ]
  
    return availableClasses.join(' ')
  }

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
  const [focused, setFocused] = useState(false)

  const classes: any = {
    disabled: disabled,
    error: invalid || messageError || status === 'error',
    success: status === 'success',
    warning: status === 'warning',
    focus: focused,
  }
  const classesInput: any = {
    '--has-value': !!value
  }
  const className = classesFromObject(classes, classNameProp)
  const classNameInput = classesFromObject(classesInput)
  
  const onFocused = () => {
    setFocused(true)
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

  return (
    <div 
      tabIndex={-1}
      className={`input input__${size} ${className}`}
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
        className={classNameInput}
        type={type}
        id={field}
        value={value}
        name={field}
        disabled={disabled}
        readOnly={disabled}
        onClick={onClick}
        onChange={onChangeLocal}
        onFocus={(ev) => {
          if (onFocus) {
            onFocus(ev)
          }
          onFocused()
        }}
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
