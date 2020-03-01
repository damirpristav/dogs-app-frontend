import React from 'react';

import Loader from '../common/Loader';

const LoadingScreen  = (props) => {
  return(
    <div className="s-loading">
      <Loader />
      <h4>{props.text}</h4>
    </div>
  );
}

export default LoadingScreen;