import React from 'react';

import MainLanding from '../common/MainLanding'; 
import Button from '../common/Button';

const Landing = () => {
  return (
    <MainLanding>
      <h1>Adopt, don't shop</h1>
      <Button text="Find your dog" to="/dogs" link large />
    </MainLanding>
  )
}

export default Landing;
