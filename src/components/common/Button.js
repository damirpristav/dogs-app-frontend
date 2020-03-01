import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
  let btnClasses = '';

  if(props.secondary) {
    btnClasses += ' btn--secondary';
  }
  if(props.full) {
    btnClasses += ' btn--full';
  }
  if(props.auto) {
    btnClasses += ' btn--auto';
  }
  if(props.small) {
    btnClasses += ' btn--sm';
  }
  if(props.large) {
    btnClasses += ' btn--lg';
  }
  if(props.round) {
    btnClasses += ' btn--round';
  }
  if(props.light) {
    btnClasses += ' btn--light';
  }
  if(props.info) {
    btnClasses += ' btn--info';
  }
  if(props.danger) {
    btnClasses += ' btn--danger';
  }
  if(props.normal) {
    btnClasses += ' btn--text';
  }

  return(
    <React.Fragment>
      {props.link 
        ? <Link to={props.to} className={`btn ${btnClasses}`}>{props.text}</Link>
        : <button 
        type={props.type} 
        className={`btn ${btnClasses}`}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.text}
      </button>}
    </React.Fragment>
  );
}

export default Button;