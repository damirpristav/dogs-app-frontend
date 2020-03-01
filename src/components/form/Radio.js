import React from 'react';

const Radio = (props) => {
  return(
    <div className="form__row">
      <div className="form__radios">
        {props.choices.map(choice => (
          <div key={choice.id}>
            <input 
              type="radio" 
              name={props.name} 
              onChange={props.onChange}
              value={choice.value}
              id={choice.id}
              checked={props.selectedValue && props.selectedValue === choice.value}
            />
            <label htmlFor={choice.id} className="form__radio-label">
              <div className="form__radio-label_btn"></div>
              <p>{choice.label}</p>
            </label>
          </div>
        ))}
      </div>
      {props.error && <span className="form__error">{props.error}</span>}
    </div>
  );
}

export default Radio;