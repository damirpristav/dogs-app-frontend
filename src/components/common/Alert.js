import React, { useEffect, Fragment, useState, useRef } from 'react';

const Alert = ({ type, msg }) => {
  const [visible, setVisible] = useState(true);
  let timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer.current);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {visible && <div className={`c-alert c-alert--${type}`}>{msg}</div>}
    </Fragment>
  )
}

export default Alert;
