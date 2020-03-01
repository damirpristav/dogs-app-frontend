import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../form/Input';
import Button from '../../common/Button';

import { addBreed } from '../../../store/actions/breedActions';
import { resetMessage } from '../../../store/actions';
import validateFields from '../../../utils/validateFields';
import useForm from '../../../hooks/useForm';

const initialData = {
  name: {
    required: true,
    value: ''
  },
  origin: {
    required: true,
    value: ''
  }
};

const AddBreed = () => {
  const {values, changeHandler, errors, setErrors, isValid} = useForm(initialData, validateFields);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(resetMessage());
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    let newErrors = validateFields(values, true);
    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0) {
      let formData = {
        name: values.name.value,
        origin: values.origin.value
      };
  
      dispatch(addBreed(formData));
      history.push('/dashboard/breeds');
    }
  }

  return (
    <div>
      <Button to="/dashboard/breeds" text="Go back" link normal />
      <h3>Add new breed</h3>
      <form className="form" onSubmit={submitHandler}>
        <Input 
          label="Breed name"
          placeholder="Breed name"
          type="text"
          name="name"
          onChange={changeHandler}
          value={values.name.value}
          error={errors.name}
        />
        <Input 
          label="Origin"
          placeholder="Origin"
          type="text"
          name="origin"
          onChange={changeHandler}
          value={values.origin.value}
          error={errors.origin}
        />
        <Button type="submit" text="Add new breed" secondary full disabled={!isValid} />
      </form>
    </div>
  )
}

export default AddBreed;
