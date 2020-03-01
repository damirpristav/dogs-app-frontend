import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Dropdown = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState({
    val: props.defaultOptionValue,
    text: props.defaultOptionText
  });
  const dispatch = useDispatch();

  const toggleDropdownHandler = () => {
    setIsOpened(!isOpened);
  }

  const optionSelectHandler = async (val, text) => {
    setIsOpened(!isOpened);
    setValue({ val, text });
    props.onSetOption(val);
    dispatch(props.onSetLoading());
    dispatch(props.onGetData(props.onGetFilters(props.name, val)));
  };

  return(
    <div className="c-dropdown">
      <div className="c-dropdown__current" onClick={toggleDropdownHandler}>{value.text}</div>
      {isOpened && <div className="c-dropdown__list">
        <span 
          className={props.defaultOptionValue === value.val ? 'active' : ''} 
          onClick={() => optionSelectHandler(props.defaultOptionValue, props.defaultOptionText)}
        >
          {props.defaultOptionText}
        </span>
        {props.options && 
          props.options.map(option => (
            <span 
              key={option._id} 
              onClick={() => optionSelectHandler(option._id, option.name)}
              className={option._id === value.val ? 'active' : ''}
            >
              {option.name}
            </span>
          ))
        }
      </div>}
    </div>
  );
}

export default Dropdown;