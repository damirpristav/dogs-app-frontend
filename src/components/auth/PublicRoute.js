import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const publicRoute = ({ component: Component, isAuthorized, ...rest }) => {
  return (
    <Route {...rest} render={props =>
        !isAuthorized ?
          (<Component {...props} />) :
          (<Redirect to="/dashboard" />)
      }
    />
  );
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized
  }
}

export default connect(mapStateToProps)(publicRoute);