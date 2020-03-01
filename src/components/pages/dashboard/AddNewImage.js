import React from 'react';
import { useDispatch } from 'react-redux';

import File from '../../form/File';
import Button from '../../common/Button';

import { addImage } from '../../../store/actions/galleryActions';

import validateFields from '../../../utils/validateFields';
import useForm from '../../../hooks/useForm';

const initialData = {
  image: {
    required: true,
    value: {},
    fileTypes: ['image/png', 'image/jpg', 'image/jpeg'],
    fileSize: 500
  }
};

const AddNewImage = ({ showBtn, onClose }) => {
  const {values, fileChangeHandler, errors, isValid} = useForm(initialData, validateFields);
  const dispatch = useDispatch();

  const onSubmitHandler = e => {
    e.preventDefault();

    if(Object.keys(errors).length === 0) {
      let formData = new FormData();
      formData.append('image', values.image.value);
      dispatch(addImage(formData));
      if(onClose) {
        onClose();
      }
    }
  }
  
  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <File 
        name="image" 
        btnText="Pick an image" 
        error={errors.image}
        onChange={fileChangeHandler}
      />
      {showBtn && <Button type="submit" disabled={!isValid} text="Upload image" />}
    </form>
  )
}

export default AddNewImage;
