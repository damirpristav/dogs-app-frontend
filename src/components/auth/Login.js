import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MainLanding from '../common/MainLanding';
import Input from '../form/Input';
import Button from '../common/Button';
import Popup from '../common/Popup';

import { login, resetAuthError, setRedirect } from '../../store/actions/authActions';
import useForm from '../../hooks/useForm';
import validateFields from '../../utils/validateFields';

const initialData = {
  email: {
    required: true,
    value: '',
    email: true
  },
  password: {
    required: true,
    value: ''
  }
};

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {values, errors, setErrors, changeHandler, isValid} = useForm(initialData, validateFields);
  const authError = useSelector(state => state.auth.error);
  const redirect = useSelector(state => state.auth.redirect);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(setRedirect(null));
    }
  }, [dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    let newErrors = validateFields(values, true);
    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0) {
      let formData = {
        email: values.email.value, 
        password: values.password.value
      }
  
      setIsLoggingIn(true);
      dispatch(login(formData));
      if(redirect) {
        history.push(redirect);
        dispatch(setRedirect(null));
      }
    }
  }

  const closePopupHandler = () => {
    dispatch(resetAuthError());
    setIsLoggingIn(false);
  }

  return(
    <MainLanding>
      <div className="c-form-box">
        <h4 className="text-center">Login to your account</h4>
        <form className="form" onSubmit={submitHandler}>
          <Input 
            type="text"
            label="Email"
            placeholder="Email"
            name="email"
            value={values.email.value}
            onChange={changeHandler}
            error={errors.email}
          />
          <Input 
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            value={values.password.value}
            onChange={changeHandler}
            error={errors.password}
          />
          <Button link normal to="/forgotPassword" text="Forgot Password ?" />
          <Button 
            type="submit" 
            text={isLoggingIn ? 'Logging in...' : 'Login'} 
            full 
            disabled={!isValid} 
          />
        </form>
      </div>

      {authError && <Popup 
        title="Error" 
        message={authError} 
        hideCancel 
        onOk={closePopupHandler} 
        onCancel={closePopupHandler}
        />
      }
    </MainLanding>
  );
}

export default Login;