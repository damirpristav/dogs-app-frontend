import React from 'react';

import Button from '../common/Button';

const NotFound = () => {
  return(
    <div className="s-404">
      <h3>Page not found</h3>
      <Button text="Go to homepage" to="/" link />
    </div>
  );
}

export default NotFound;