import { useState, useCallback } from 'react';

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // function which checks if fields are touched
  const isValuesTouched = useCallback((name) => {
    for(let key in values) {
      if(!values[key].touched && key !== name) {
        return false;
      }
    }
    return true;
  }, [values]);

  const checkValuesAndErrors = useCallback((values, name) => {
    setValues(values);

    let errors = validate(values);
    if(Object.keys(errors).length === 0 && isValuesTouched(name)) {
      setIsValid(true);
    }else {
      setIsValid(false);
    }

    setErrors(errors);
  }, [isValuesTouched, validate]);

  // input change handler
  const changeHandler = useCallback((e) => {
    e.persist();

    let updatedValues = {
      ...values,
      [e.target.name]: {
        ...values[e.target.name],
        value: e.target.value,
        touched: true
      }
    };

    checkValuesAndErrors(updatedValues, e.target.name);
  }, [values, checkValuesAndErrors]);

  // image picker change handler
  const imageChangeHandler = useCallback((name, id) => {
    let updatedValues = {
      ...values,
      [name]: {
        ...values[name],
        value: id,
        touched: true
      }
    };

    checkValuesAndErrors(updatedValues, name);
  }, [values, checkValuesAndErrors]);

  // file change handler
  const fileChangeHandler = useCallback((name, file) => {
    let updatedValues = {
      ...values,
      [name]: {
        ...values[name],
        value: file,
        touched: true
      }
    };

    checkValuesAndErrors(updatedValues, name);
  }, [values, checkValuesAndErrors]);

  // checkbox change handler
  const checkboxChangeHandler = useCallback((e) => {
    let updatedValues = {
      ...values,
      [e.target.name]: {
        ...values[e.target.name],
        value: e.target.checked
      }
    };

    checkValuesAndErrors(updatedValues, e.target.name);
  }, [values, checkValuesAndErrors]);

  return {
    values, changeHandler, errors, setErrors, isValid, imageChangeHandler, 
    setValues, setIsValid, fileChangeHandler, checkboxChangeHandler
  };
}

export default useForm;