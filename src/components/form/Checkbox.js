import React from 'react';

const Checkbox = (props) => {
  let content, element;
  element = (
    <div className="c-checkbox">
      <label>
        <input type="checkbox" name={props.name} value={props.value} onChange={props.onChange} checked={props.value} />
        <div className="c-checkbox__button"><span></span></div>
        <span>{props.label}</span>
      </label>
    </div>
  );

  if(props.wrap) {
    content = <div className="form__row">{element}</div>;
  }else {
    content = element;
  }

  return content;
}

export default Checkbox;