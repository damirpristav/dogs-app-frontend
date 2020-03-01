import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '../common/Button';
import Loader from '../common/Loader';
import { activateAccount } from '../../store/actions/authActions';

const ActivateAccount = () => {
  const activateAccountMessage = useSelector(state => state.auth.activateAccountMessage);
  const token = useParams().token;
  const dispatch = useDispatch();

  useEffect(() => {
    if(token) {
      dispatch(activateAccount(token));
    }
  }, [token, dispatch]);

  return(
    <div className="s-404">
      {!activateAccountMessage && <Loader />}
      {activateAccountMessage && 
        <Fragment>
          <h3>{activateAccountMessage}</h3>
          <Button text="Login" to="/login" link />
        </Fragment>
      }
    </div>
  );
}

export default ActivateAccount;