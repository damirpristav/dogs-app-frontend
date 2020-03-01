import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MainLanding from '../common/MainLanding';
import Input from '../form/Input';
import Button from '../common/Button';

import { resetPassword, resetAuthMessage } from '../../store/actions/authActions';
import useForm from '../../hooks/useForm';
import validateFields from '../../utils/validateFields';

const initialData = {
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

const ResetPassword = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {values, setValues, errors, setErrors, changeHandler, isValid, setIsValid} = useForm(initialData, validateFields);
  const authMessage = useSelector(state => state.auth.message);
  const token = useParams().token;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAuthMessage(null));
    }
  }, [dispatch]);

  useEffect(() => {
    if(authMessage) {
      setIsProcessing(false);
    }
  }, [authMessage]);

  const submitHandler = e => {
    e.preventDefault();
    let newErrors = validateFields(values, true);
    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0) {
      let formData = {
        password: values.password.value,
        confirmPassword: values.confirmPassword.value
      }
  
      setIsProcessing(true);
      dispatch(resetPassword(token, formData));
      setValues(prevValues => {
        return {
          ...prevValues,
          password: {
            ...prevValues.password,
            value: ''
          },
          confirmPassword: {
            ...prevValues.confirmPassword,
            value: ''
          }
        }
      });
      setIsValid(false);
    }
  }

  return(
    <MainLanding>
      <div className="c-form-box">
        <h4 className="text-center">Change your password</h4>
        {authMessage && <p style={{marginBottom: '10px', color: '#ff5964'}}>{authMessage}</p>}
        <form className="form" onSubmit={submitHandler}>
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
            text={isProcessing ? 'Processing...' : 'Change password'} 
            full 
            disabled={!isValid} 
          />
        </form>
      </div>
    </MainLanding>
  );
}

export default ResetPassword;