import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Main from '../common/Main';
import Loader from '../common/Loader';
import Card from '../parts/Card';
import Dropdown from '../common/Dropdown';
import Checkbox from '../form/Checkbox';

import { getAllDogs, setDogsLoading } from '../../store/actions/dogActions';
import { getBreeds, setBreedsLoading } from '../../store/actions/breedActions';

const sizes = [
  { _id: 'small', name: 'Small' },
  { _id: 'medium', name: 'Medium' },
  { _id: 'large', name: 'Large' }
];

const genders = [
  { _id: 'male', name: 'Male' },
  { _id: 'female', name: 'Female' }
];

const FindYourDog = () => {
  const [breed, setBreed] = useState('all');
  const [size, setSize] = useState('all');
  const [gender, setGender] = useState('any');
  const [trained, setTrained] = useState(false);
  const dogs = useSelector(state => state.dog.dogs);
  const loading = useSelector(state => state.dog.loading);
  const breeds = useSelector(state => state.breed.breeds);
  const breedsLoading = useSelector(state => state.breed.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs('active=true'));
    dispatch(getBreeds());
    
    return () => {
      dispatch(setDogsLoading());
      dispatch(setBreedsLoading());
    }
  }, [dispatch]);

  const checkboxChangeHandler = async (e) => {
    const {name, checked} = e.target;
    setTrained(checked);
    dispatch(setDogsLoading());
    dispatch(getAllDogs(getFilters(name, checked)));
  }

  const getFilters = (filter, value) => {
    let filterString = `active=true`;

    if( filter === 'breed' ) {
      if( value !== 'all' ) {
        filterString += `&breed=${value}`;
      }
    }else {
      if( breed !== 'all' ) {
        filterString += `&breed=${breed}`;
      }
    }

    if( filter === 'size' ) {
      if( value !== 'all' ) {
        filterString += `&size=${value}`;
      }
    }else {
      if( size !== 'all' ) {
        filterString += `&size=${size}`;
      }
    }

    if( filter === 'gender' ) {
      if( value !== 'any' ) {
        filterString += `&gender=${value}`;
      }
    }else {
      if( gender !== 'any' ) {
        filterString += `&gender=${gender}`;
      }
    }

    if( filter === 'trained' ) {
      if( value ) {
        filterString += `&trained=true`;
      }
    }else {
      if( trained ) {
        filterString += `&trained=true`;
      }
    }

    return filterString;
  }

  return (
    <Main>
      <section className="s-title">
        <div className="container">
          <h2>Dogs available for adoption</h2>
        </div>
      </section>
      <section className="s-filters">
        <div className="container">
          <Dropdown 
            name="breed"
            defaultOptionText="All breeds"
            defaultOptionValue="all"
            options={breeds}
            onSetOption={setBreed}
            onGetFilters={getFilters}
            onGetData={getAllDogs}
            onSetLoading={setDogsLoading}
          />
          <Dropdown 
            name="size"
            defaultOptionText="All sizes"
            defaultOptionValue="all"
            options={sizes}
            onSetOption={setSize}
            onGetFilters={getFilters}
            onGetData={getAllDogs}
            onSetLoading={setDogsLoading}
          />
          <Dropdown 
            name="gender"
            defaultOptionText="Any gender"
            defaultOptionValue="any"
            options={genders}
            onSetOption={setGender}
            onGetFilters={getFilters}
            onGetData={getAllDogs}
            onSetLoading={setDogsLoading}
          />
          <Checkbox 
            name="trained"
            label="Trained"
            onChange={checkboxChangeHandler}
          />
        </div>
      </section>

      <section className="s-dogs">
        <div className="container u-relative">
          {(loading || breedsLoading) && <Loader />}
          <div className="s-dogs__inner">
            {dogs.length > 0 ?
              dogs.map(dog => (
                <Card key={dog._id} dog={dog} />
              ))
              : <p>No dogs found</p>
            }
          </div>
        </div>
      </section>
    </Main>
  )
}

export default FindYourDog;
