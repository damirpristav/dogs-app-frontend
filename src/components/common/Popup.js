import React from 'react';

const Popup = ({ title, message, onCancel, onOk, hideCancel, hideOk }) => {
  return (
    <div className="s-popup">
      <div className="s-popup__inner">
        <div className="s-popup__close" onClick={onCancel}>x</div>
        <div className="s-popup__head">
          <h4>{title}</h4>
        </div>
        {message ?
          <div className="s-popup__body">
            {message}
          </div>
          : null
        }
        <div className="s-popup__foot">
          {!hideCancel && <button onClick={onCancel} className="btn btn--sm btn--info">Cancel</button>}
          {!hideOk && <button onClick={onOk} className="btn btn--sm btn--danger">OK</button>}
        </div>
      </div>
    </div>
  )
}

export default Popup;
