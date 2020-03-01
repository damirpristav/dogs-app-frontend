import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AddBreed from './AddBreed';
import EditBreed from './EditBreed';
import BreedsList from './BreedsList';

const Breeds = () => {
  return (
    <Switch>
      <Route path="/dashboard/breeds" exact component={BreedsList} />
      <Route path="/dashboard/breeds/add" component={AddBreed} />
      <Route path="/dashboard/breeds/edit/:id" component={EditBreed} />
    </Switch>
  )
}

export default Breeds;
