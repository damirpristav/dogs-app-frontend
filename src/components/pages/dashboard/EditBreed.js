import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../common/Loader';
import Input from '../../form/Input';
import Button from '../../common/Button';

import { getBreed, cleanupBreed, updateBreed } from '../../../store/actions/breedActions';
import { resetMessage } from '../../../store/actions';
import validateFields from '../../../utils/validateFields';
import useForm from '../../../hooks/useForm';

const initialData = {
  name: {
    required: true,
    value: '',
    touched: true
  },
  origin: {
    required: true,
    value: '',
    touched: true
  }
};

const EditBreed = () => {
  const {values, changeHandler, errors, setErrors, isValid, setValues, setIsValid} = useForm(initialData, validateFields);
  const [populated, setPopulated] = useState(false);
  const breed = useSelector(state => state.breed.breed);
  const error = useSelector(state => state.breed.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const breedId = useParams().id;

  useEffect(() => {
    dispatch(getBreed(breedId));
    dispatch(resetMessage());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {    
    if(breed && !populated) {
      setIsValid(true);
      setValues({
        ...values,
        name: { ...values.name, value: breed.name },
        origin: { ...values.origin, value: breed.origin }
      });
      setPopulated(true);
    }

    return () => {
      if(breed) {
        dispatch(cleanupBreed());
      }
    }
    // eslint-disable-next-line
  }, [breed]);

  const submitHandler = e => {
    e.preventDefault();
    let newErrors = validateFields(values, true);
    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0) {
      let formData = {
        name: values.name.value,
        origin: values.origin.value
      };
      
      dispatch(updateBreed(breedId, formData));
      history.push('/dashboard/breeds');
    }
  }

  return (
    <div>
      <Button to="/dashboard/breeds" text="Go back" normal link />
      {error && <div className="c-info c-info--success">{error}</div>}
      <h3>Edit breed</h3>
      <div className="u-relative">
        {!breed && <Loader />}
        <form className="form" onSubmit={submitHandler}>
          <Input 
            label="Breed name"
            type="text"
            placeholder="Breed name"
            name="name"
            onChange={changeHandler}
            value={values.name.value}
            error={errors.name}
          />
          <Input 
            label="Origin"
            type="text"
            placeholder="Origin"
            name="origin"
            onChange={changeHandler}
            value={values.origin.value}
            error={errors.origin}
          />
          <Button 
            type="submit"
            text="Update breed"
            disabled={!isValid}
            secondary
            full
          />
        </form>
      </div>
    </div>
  )
}

export default EditBreed;