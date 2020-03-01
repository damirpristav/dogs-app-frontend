import React, { forwardRef } from 'react';

import Button from '../common/Button';

const ImagePicker = forwardRef((props, ref) => {
  return(
    <div className="form__row">
      <Button type="button" onClick={props.onButtonClick} info text={props.value === '' ? props.buttonText : props.buttonTextChanged} />
      <br />
      <input 
        type="hidden" 
        name={props.name} 
        onChange={props.onChange}
        value={props.value}
      />
      <div className="c-preview-image">
        <div ref={ref}></div>
      </div>
      {props.error && <span className="form__error">{props.error}</span>}
    </div>
  );
});

export default ImagePicker;