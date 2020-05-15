import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function InputIcon({ name, label, icon, ...rest }) {
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
    <label>{label}</label>
    <div className="input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
                <i className={icon} />
            </div>
        </div>
        <input  ref={inputRef} defaultValue={defaultValue} className={`form-control ${error && `is-invalid`}`} {...rest}  />
        {error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )}
    </div>
    </>
  )
}

export default InputIcon;