import React, { Fragment, useEffect, useState, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import GalleryPopup from './GalleryPopup';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';
import Select from '../../form/Select';
import Radio from '../../form/Radio';
import ImagePicker from '../../form/ImagePicker';
import Checkbox from '../../form/Checkbox';
import Button from '../../common/Button';

import * as dogActions from '../../../store/actions/dogActions';
import * as breedActions from '../../../store/actions/breedActions';
import { resetMessage } from '../../../store/actions';
import validateFields from '../../../utils/validateFields';
import useForm from '../../../hooks/useForm';

const initialData = {
  name: {
    required: true,
    value: ''
  },
  description: {
    required: true,
    value: '',
    minLength: 10
  },
  breed: {
    required: true,
    value: ''
  },
  location: {
    required: true,
    value: ''
  },
  size: {
    required: true,
    value: ''
  },
  age: {
    required: true,
    value: ''
  },
  gender: {
    required: true,
    value: ''
  },
  image: {
    required: true,
    value: ''
  },
  trained: {
    value: false,
    touched: true
  },
  goodWithCats: {
    value: false,
    touched: true
  },
  goodWithDogs: {
    value: false,
    touched: true
  }
};

const AddDog = () => {
  const [showPopup, setShowPopup] = useState(false);
  const {values, changeHandler, errors, setErrors, isValid, imageChangeHandler, checkboxChangeHandler} = useForm(initialData, validateFields); 
  const imagePreview = createRef('imagePreview');
  const breeds = useSelector(state => state.breed.breeds);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(breedActions.getBreeds());
    dispatch(resetMessage());
  }, [dispatch]);

  let breedsOptions;
  if(breeds.length > 0) {
    breedsOptions = breeds.map(breed => (
      <option key={breed._id} value={breed._id}>{breed.name}</option>
    ));
  }

  const submitHandler = e => {
    e.preventDefault();
    let newErrors = validateFields(values, true);
    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0) {
      let formData = {
        name: values.name.value,
        breed: values.breed.value,
        gender: values.gender.value,
        age: values.age.value,
        size: values.size.value,
        description: values.description.value,
        trained: values.trained.value,
        goodWithCats: values.goodWithCats.value,
        goodWithDogs: values.goodWithDogs.value,
        location: values.location.value,
        image: values.image.value
      };
      
      dispatch(dogActions.addDog(formData));
      history.push('/dashboard/dogs');
    }
  }

  const openGalleryPopup = () => {
    setShowPopup(true);
  }

  const onImageChooseHandler = (id, src) => {
    imageChangeHandler('image', id);
    setShowPopup(false);
    
    imagePreview.current.style.backgroundImage = `url(${src})`;
    imagePreview.current.parentElement.classList.add('active');
  }

  return(
    <Fragment>
      <Button to="/dashboard/dogs" text="Go back" link normal />
      <h3>Add new dog</h3>
      <form className="form" onSubmit={submitHandler}>
        <Input 
          label="Dog name"
          type="text"
          placeholder="Dog name"
          name="name"
          onChange={changeHandler}
          value={values.name.value}
          error={errors.name}
        />
        <Textarea 
          label="Description"
          placeholder="Description"
          name="description"
          onChange={changeHandler}
          value={values.description.value}
          error={errors.description}
        />
        <Select 
          label="Breed"
          name="breed"
          onChange={changeHandler}
          value={values.breed.value}
          defaultOptionText="Choose breed"
          options={breedsOptions}
          error={errors.breed}
        />
        <Input 
          label="Location"
          type="text"
          placeholder="Location"
          name="location"
          onChange={changeHandler}
          value={values.location.value}
          error={errors.location}
        />
        <Radio 
          name="size"
          onChange={changeHandler}
          choices={[
            { id: "size-small", value: "small", label: "Small" },
            { id: "size-medium", value: "medium", label: "Medium" },
            { id: "size-large", value: "large", label: "Large" }
          ]}
          error={errors.size}
        />
        <Input 
          label="Age"
          type="text"
          placeholder="Age"
          name="age"
          onChange={changeHandler}
          value={values.age.value}
          error={errors.age}
        />
        <Radio 
          name="gender"
          onChange={changeHandler}
          choices={[
            { id: "gender-male", value: "male", label: "Male" },
            { id: "gender-female", value: "female", label: "Female" }
          ]}
          error={errors.gender}
        />
        <Checkbox 
          label="Trained"
          name="trained"
          value={values.trained.value}
          onChange={checkboxChangeHandler}
          wrap
        />
        <Checkbox 
          label="Good with cats"
          name="goodWithCats"
          value={values.goodWithCats.value}
          onChange={checkboxChangeHandler}
          wrap
        />
        <Checkbox 
          label="Good with dogs"
          name="goodWithDogs"
          value={values.goodWithDogs.value}
          onChange={checkboxChangeHandler}
          wrap
        />
        <ImagePicker 
          onButtonClick={openGalleryPopup}
          buttonText="Choose image"
          buttonTextChanged="Change image"
          name="image"
          onChange={onImageChooseHandler}
          value={values.image.value}
          ref={imagePreview}
          error={errors.image}
        />
        <Button 
          type="submit"
          text="Add new dog"
          disabled={!isValid}
          secondary
          full
        />
      </form>

      {showPopup && <GalleryPopup 
        onClose={() => setShowPopup(false)}
        onImageChoose={onImageChooseHandler}
      />}
    </Fragment>
  );
}

export default AddDog;
