import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DogsList from './DogsList';
import AddDog from './AddDog';
import EditDog from './EditDog';

const Dogs = () => {
  return (
    <Switch>
      <Route path="/dashboard/dogs" exact component={DogsList} />
      <Route path="/dashboard/dogs/add" component={AddDog} />
      <Route path="/dashboard/dogs/edit/:slug" component={EditDog} />
    </Switch>
  )
}

export default Dogs;
