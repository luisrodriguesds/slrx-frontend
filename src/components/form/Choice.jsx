import React, { Fragment, useState } from "react";
import { useField } from '@unform/core'

const Red = () => (<span style={{color:'red'}}>*</span>);

export default function Choice(props) {
  const { name, options, label, required, multiple, defaultValue, defaultChecked, ...rest } = props;
  const { fieldName, registerField, error } = useField(name);
  const [value, setValue] = useState(defaultValue);
  const threatAsCheckbox = !!(multiple || options.length === 1);
  const nativeField = threatAsCheckbox ? "checkbox" : "radio";

  function getValue() {
    if (multiple)
      return Array.from(value || []).length === 0 ? undefined : value;
    return value === "" ? undefined : value;
  }

  registerField({ name: fieldName, ref: getValue, getValue });


  function handleChange(e) {
    const { checked: toAdd, value: fieldVal } = e.target;
    if (multiple) {
      const newVal = toAdd
        ? [...Array.from(value || []), fieldVal]
        : Array.from(value).filter(v => v !== e.target.value);
      setValue(newVal);
    } else {
      setValue(toAdd ? fieldVal : "");
    }
  }

  function checked(val) {
    if (multiple) {
      return Array.from(value || []).includes(val);
    }
    
    return value === val;
  }

  return (
    <>
      <label>{label} {required && <Red />} </label>
      {options.map(option => {
        const checkboxId = `${fieldName}-${option.id}`;
        return (
          <Fragment key={checkboxId}>
            <div className={`custom-control custom-${nativeField}`}>
              <input 
                {...rest}
                type={nativeField}
                id={checkboxId}
                name={fieldName}
                aria-label={checkboxId}
                onChange={handleChange}
                value={option.id}
                checked={checked(option.id)}
                className="custom-control-input" 
              />
              {option.label && <label className="custom-control-label" htmlFor={checkboxId}>{option.label}</label>}
            </div>
          </Fragment>
        );
      })}

    {error && (
      <div className="invalid-feedback" style={{display:'block'}}>
        {error}
      </div>
    )}
    </>
  );
}