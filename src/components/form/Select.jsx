import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

const Red = () => (<span style={{color:'red'}}>*</span>);

function Input({ name, label, obs, required, children, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  
  return (
    <>
    <label htmlFor={name}>{label} {required && <Red />}</label>
    <select ref={selectRef} defaultValue={defaultValue} className={`form-control ${error && `is-invalid`}`} {...rest} >
      {children}
    </select>
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