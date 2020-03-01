import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MainLanding from '../common/MainLanding';
import Input from '../form/Input';
import Button from '../common/Button';
import Popup from '../common/Popup';

import { register, resetAuthError, resetAuthMessage } from '../../store/actions/authActions';
import validateFields from '../../utils/validateFields';
import useForm from '../../hooks/useForm';

const initialData = {
  firstName: {
    required: true,
    value: ''
  },
  lastName: {
    required: true,
    value: ''
  },
  email: {
    required: true,
    value: '',
    email: true
  },
  password: {
    required: true,
    value: '',
    minLength: 6
  },
  confirmPassword: {
    require: true,
    value: '',
    matchPass: 'password'
  }
};

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {values, errors, setErrors, isValid, changeHandler} = useForm(initialData, validateFields);
  const authError = useSelector(state => state.auth.error);
  const authMessage = useSelector(state => state.auth.message);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = validateFields(values, true);
    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0) {
      let formData = {
        firstName: values.firstName.value,
        lastName: values.lastName.value,
        email: values.email.value,
        password: values.password.value,
        confirmPassword: values.confirmPassword.value
      };

      setIsRegistering(true);
      dispatch(register(formData));
    }
  }

  const popupCloseHandler = () => {
    setIsRegistering(false);
    if(authError) {
      dispatch(resetAuthError());
    }
    if(authMessage) {
      dispatch(resetAuthMessage());
      history.push('/login');
    }
  }

  return(
    <MainLanding>
      <div className="c-form-box">
        <h4 className="text-center">Create your account</h4>
        <form className="form" onSubmit={submitHandler}>
          <Input 
            type="text"
            label="First name"
            placeholder="First name"
            name="firstName"
            value={values.firstName.value}
            onChange={changeHandler}
            error={errors.firstName}
          />
          <Input 
            type="text"
            label="Last name"
            placeholder="Last name"
            name="lastName"
            value={values.lastName.value}
            onChange={changeHandler}
            error={errors.lastName}
          />
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
          <Input 
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword.value}
            onChange={changeHandler}
            error={errors.confirmPassword}
          />
          <Button 
            type="submit"
            text={isRegistering ? 'Registering...' : 'Register'}
            full
            disabled={!isValid}
          />
        </form>
      </div>

      {authError && <Popup 
        title="Error"
        message={authError}
        onOk={popupCloseHandler}
        onCancel={popupCloseHandler}
        hideCancel
        />
      }
      {authMessage && <Popup 
        title="Success"
        message={authMessage}
        onOk={popupCloseHandler}
        onCancel={popupCloseHandler}
        hideCancel
        />
      }
    </MainLanding>
  );
}

export default Register;