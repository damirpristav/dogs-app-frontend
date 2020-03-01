import React from 'react';

const Select = (props) => {
  return(
    <div className="form__row">
      <label>{props.label}</label>
      <select 
        className={`form__input ${props.error && 'error'}`}
        name={props.name} 
        onChange={props.onChange}
        value={props.value}
      >
        <option value="">{props.defaultOptionText}</option>
        {props.options}
      </select>
      {props.error && <span className="form__error">{props.error}</span>}
    </div>
  );
}

export default Select;