import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import Main from '../common/Main';
import Loader from '../common/Loader';
import DogInfo from '../parts/DogInfo';

import * as dogActions from '../../store/actions/dogActions';
import * as adoptionActions from '../../store/actions/adoptionActions';
import * as authActions from '../../store/actions/authActions';

const Dog = () => {
  const dog = useSelector(state => state.dog.dog);
  const loading = useSelector(state => state.dog.loadingDog);
  const user = useSelector(state => state.auth.user);
  const isAuthorized = useSelector(state => state.auth.isAuthorized);
  const redirect = useSelector(state => state.auth.redirect);
  const dispatch = useDispatch();
  const slug = useParams().slug;
  const location = useLocation();
  const history = useHistory();
  
  useEffect(() => {
    dispatch(dogActions.getDog(slug));

    if(isAuthorized && redirect) {
      dispatch(authActions.setRedirect(null));
    }

    return () => {
      dispatch(dogActions.setDogLoading());
    }
  }, [isAuthorized, redirect, dispatch, slug]);

  const adopt = () => {
    if(!isAuthorized) {
      dispatch(authActions.setRedirect(location.pathname));
      history.push('/login');
      return;
    }
    dispatch(adoptionActions.adoptRequest(dog._id));
    history.push('/dashboard');
  }

  let dogMarkup;
  if(dog) {
    dogMarkup = (
      <DogInfo 
        dog={dog} 
        user={user} 
        isAuthorized={isAuthorized} 
        onAdopt={adopt} 
      />
    );
  }else {
    dogMarkup = <p>Dog cannot be found!</p>;
  }

  return (
    <Main>
      <div className="u-relative">
        {loading && <Loader />}
        {dogMarkup}
      </div>
    </Main>
  )
}

export default Dog;
