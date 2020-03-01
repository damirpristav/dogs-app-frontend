import React from 'react';

const Textarea = (props) => {
  return(
    <div className="form__row">
      <label>{props.label}</label>
      <textarea 
        className={`form__input ${props.error && 'error'}`}
        placeholder={props.placeholder} 
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        rows={props.rows || 2}
        cols={props.cols || 20}
      ></textarea>
      {props.error && <span className="form__error">{props.error}</span>}
    </div>
  );
}

export default Textarea;