import React from 'react';

const Input = (props) => {
  return(
    <div className="form__row">
      <label>{props.label}</label>
      <input 
        type={props.type} 
        className={`form__input ${props.error && 'error'}`}
        placeholder={props.placeholder} 
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
      {props.error && <span className="form__error">{props.error}</span>}
    </div>
  );
}

export default Input;