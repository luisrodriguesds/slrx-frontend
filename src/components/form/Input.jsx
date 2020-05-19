import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

const Red = () => (<span style={{color:'red'}}>*</span>);

function Input({ name, label, obs, required, ...rest }) {
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
    <input ref={inputRef} defaultValue={defaultValue} className={`form-control ${error && `is-invalid`}`} {...rest} />
    {error && (
      <div className="invalid-feedback">
        {error}
      </div>
    )}
    {obs && (
      <small className="form-text text-muted">
        {obs}
      </small>
    )}
    
    </>
  )
}

export default Input;