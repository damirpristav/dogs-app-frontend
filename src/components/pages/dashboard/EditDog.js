import React, { useEffect, useState, Fragment, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../common/Loader';
import GalleryPopup from './GalleryPopup';
import Input from '../../form/Input';
import Textarea from '../../form/Textarea';
import Radio from '../../form/Radio';
import ImagePicker from '../../form/ImagePicker';
import Select from '../../form/Select';
import Checkbox from '../../form/Checkbox';
import Button from '../../common/Button';

import { getDog, setDogLoading, updateDog, setDogsLoading } from '../../../store/actions/dogActions';
import { resetMessage } from '../../../store/actions';
import { getBreeds } from '../../../store/actions/breedActions';
import validateFields from '../../../utils/validateFields';
import useForm from '../../../hooks/useForm';

const initialData = {
  name: {
    required: true,
    value: '',
    touched: true
  },
  description: {
    required: true,
    value: '',
    minLength: 10,
    touched: true
  },
  breed: {
    required: true,
    value: '',
    touched: true
  },
  location: {
    required: true,
    value: '',
    touched: true
  },
  size: {
    required: true,
    value: '',
    touched: true
  },
  age: {
    required: true,
    value: '',
    touched: true
  },
  gender: {
    required: true,
    value: '',
    touched: true
  },
  image: {
    required: true,
    value: '',
    touched: true
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

const EditDog = () => {
  const [showPopup, setShowPopup] = useState(false);
  const {values, changeHandler, errors, setErrors, isValid, imageChangeHandler, setValues, setIsValid, checkboxChangeHandler} = useForm(initialData, validateFields);
  const dog = useSelector(state => state.dog.dog);
  const breeds = useSelector(state => state.breed.breeds);
  const dispatch = useDispatch();
  const history = useHistory();
  const slug = useParams().slug;
  const imagePreview = createRef('imagePreview');

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(resetMessage());

    return () => {
      dispatch(setDogLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDog(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if(dog) {
      setIsValid(true);
      setValues({
        name: { ...values.name, value: dog.name },
        description: { ...values.description, value: dog.description },
        breed: { ...values.breed, value: dog.breed._id },
        location: { ...values.location, value: dog.location },
        size: { ...values.size, value: dog.size },
        age: { ...values.age, value: dog.age },
        gender: { ...values.gender, value: dog.gender },
        image: { ...values.image, value: dog.image._id },
        trained: { ...values.trained, value: dog.trained },
        goodWithCats: { ...values.goodWithCats, value: dog.goodWithCats },
        goodWithDogs: { ...values.goodWithDogs, value: dog.goodWithDogs }
      });

      if(dog.image.image) {
        imagePreview.current.style.backgroundImage = `url(${process.env.REACT_APP_BACKEND_URL}/uploads/${dog.image.image})`;
        imagePreview.current.parentElement.classList.add('active');
      }
    }
    // eslint-disable-next-line
  }, [dog]);

  let breedsOptions;
  if(breeds.length > 0 && dog) {
    breedsOptions = breeds.map(breed => (
      <option key={breed._id} value={breed._id}>{breed.name}</option>
    ));
  }

  const onSubmitHandler = e => {
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
      
      dispatch(updateDog(dog._id, formData));
      dispatch(setDogsLoading());
      dispatch(setDogLoading());
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

  return (
    <Fragment>
      <div className="u-relative">
        { (!dog || breeds.length === 0) && <Loader /> }
        <Button to="/dashboard/dogs" text="Go back" link normal />
        <h3>Edit dog</h3>
        <form className="form" onSubmit={onSubmitHandler}>
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
            selectedValue={values.size.value}
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
            selectedValue={values.gender.value}
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
            text="Update dog"
            disabled={!isValid}
            secondary
            full
          />
        </form>
      </div>

      {showPopup && <GalleryPopup 
        onClose={() => setShowPopup(false)}
        onImageChoose={onImageChooseHandler}
      />}
    </Fragment>
  )
}

export default EditDog;
