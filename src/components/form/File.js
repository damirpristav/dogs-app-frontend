import React, { useRef, useState } from 'react';

import Button from '../common/Button';

const File = (props) => {
  const [fileText, setFileText] = useState('No image chosen');
  const fileInput = useRef();

  const openFilePicker = () => {
    fileInput.current.click();
  }

  const fileChangeHandler = (e) => {
    if(e.target.files[0]) {
      setFileText(e.target.files[0].name);
      props.onChange(props.name, e.target.files[0]);
    }
  }

  return(
    <div className="form__row">
      <label>Image</label>
      <div className="form__file">
        <input type="file" name={props.name} ref={fileInput} onChange={fileChangeHandler} />
        <div className="form__file_picker">
          <Button type="button" onClick={openFilePicker} text={props.btnText} small info />
          <p>{fileText}</p>
        </div>
        {props.error && <span className="form__error">{props.error}</span>}
      </div>
    </div>
  );
}

export default File;