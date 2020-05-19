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
    <textarea ref={inputRef} defaultValue={defaultValue} className={`form-control ${error && `is-invalid`}`} {...rest}></textarea>
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

export default Input;