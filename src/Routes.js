import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Landing from './components/pages/Landing';
import FindYourDog from './components/pages/FindYourDog';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import Dog from './components/pages/Dog';
import NotFound from './components/pages/NotFound'
import LoadingScreen from './components/pages/LoadingScreen';
import ActivateAccount from './components/pages/ActivateAccount';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

const Routes = () => {
  const screenLoading = useSelector(state => state.auth.screenLoading);

  return(
    <Fragment>
      {screenLoading && <LoadingScreen text="Loading..." />}
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/dogs" exact component={FindYourDog} />
        <PublicRoute path="/login" exact component={Login} />
        <PublicRoute path="/register" exact component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/dog/:slug" component={Dog} />
        <Route exact path="/activateAccount/:token" component={ActivateAccount} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword/:token" component={ResetPassword} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default Routes;