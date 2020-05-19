import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import InputMaske from 'react-input-mask';

const Red = () => (<span style={{color:'red'}}>*</span>);

function InputMask({ name, label, obs, required, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  
  return (
    <>
    <label htmlFor={name}>{label} {required && <Red />}</label>
    <InputMaske ref={inputRef} defaultValue={defaultValue} className={`form-control ${error && `is-invalid`}`} {...rest} />
    {obs && (
      <small className="form-text text-muted">
        {obs}
      </small>
    )}
    {error && (
      <div className="invalid-feedback">
        {error}
      </div>
    )}
   
    </>
  )
}

export default InputMask;