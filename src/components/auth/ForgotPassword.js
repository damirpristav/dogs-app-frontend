import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLanding from '../common/MainLanding';
import Input from '../form/Input';
import Button from '../common/Button';

import { forgotPassword, resetAuthMessage } from '../../store/actions/authActions';
import useForm from '../../hooks/useForm';
import validateFields from '../../utils/validateFields';

const initialData = {
  email: {
    required: true,
    value: '',
    email: true
  }
};

const ForgotPassword = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {values, setValues, errors, setErrors, changeHandler, isValid, setIsValid} = useForm(initialData, validateFields);
  const authMessage = useSelector(state => state.auth.message);
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
        email: values.email.value
      }
  
      setIsProcessing(true);
      dispatch(forgotPassword(formData));
      setValues(prevValues => {
        return {
          ...prevValues,
          email: {
            ...prevValues.email,
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
        <h4 className="text-center">Type your email address to reset your password</h4>
        {authMessage && <p style={{marginBottom: '10px', color: '#ff5964'}}>{authMessage}</p>}
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
          <Button 
            type="submit" 
            text={isProcessing ? 'Processing...' : 'Send email'} 
            full 
            disabled={!isValid} 
          />
        </form>
      </div>
    </MainLanding>
  );
}

export default ForgotPassword;