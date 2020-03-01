import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../common/Loader';
import Popup from '../../common/Popup';
import Alert from '../../common/Alert';
import BreedsTable from '../../parts/BreedsTable';

import { getBreeds, deleteBreed } from '../../../store/actions/breedActions';
import { resetMessage } from '../../../store/actions';

const BreedsList = () => {
  const [breed, setBreed] = useState({});
  const [popup, setPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const breeds = useSelector(state => state.breed.breeds);
  const loading = useSelector(state => state.breed.loading);
  const message = useSelector(state => state.breed.message);
  const error = useSelector(state => state.breed.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreeds());

    return () => {
      dispatch(resetMessage());
    }
  }, [dispatch]);

  useEffect(() => {
    if( message ) {
      setMessages(prevMessages => [...prevMessages, message]);
    }
  }, [message]);

  const deleteHandler = (e, breed) => {
    e.preventDefault();
    setBreed({ id: breed._id, name: breed.name });
    setPopup(true);
  }

  const popupCancelHandler = (e) => {
    e.preventDefault();
    setPopup(false);
    setBreed({});
  }

  const popupOkHandler = async (e) => {
    e.preventDefault();

    dispatch(deleteBreed(breed.id));

    setPopup(false);
    setBreed({});
  }

  return(
    <Fragment>
      <section className="s-message">
        { messages.map((msg, index) => (
          <Alert key={index} type="success" msg={msg} />)
        )}
        {error && <Alert type="error" msg={error} />}
      </section>
      <h3>Breeds</h3>
      <div className="u-relative">
        {loading && <Loader />}
        {breeds.length === 0 
          ? <p className="mb-40">Nothing found, please add a breed</p>
          : <BreedsTable breeds={breeds} onDelete={deleteHandler} />
        }
      </div>
      <Link to="/dashboard/breeds/add" className="btn">Add new</Link>

      { popup &&
        <Popup 
          title={`Are you sure you want to delete "${breed.name}" breed ?`}
          onCancel={popupCancelHandler}
          onOk={popupOkHandler}
        />
      }
    </Fragment>
  );
}

export default BreedsList;