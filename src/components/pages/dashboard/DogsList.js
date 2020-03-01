import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../common/Loader';
import Alert from '../../common/Alert';
import Popup from '../../common/Popup';
import DogsTable from '../../parts/DogsTable';
import Button from '../../common/Button';

import { getAllDogs, setDogsLoading, deleteDog } from '../../../store/actions/dogActions';
import { resetMessage } from '../../../store/actions';

const DogsList = () => {
  const [popup, setPopup] = useState(false);
  const [selectedDog, setSelectedDog] = useState({});
  const [messages, setMessages] = useState([]);
  const dogs = useSelector(state => state.dog.dogs);
  const loading = useSelector(state => state.dog.loading);
  const message = useSelector(state => state.dog.message);
  const error = useSelector(state => state.dog.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
    return () => {
      dispatch(setDogsLoading());
      dispatch(resetMessage());
    }
  }, [dispatch]);

  useEffect(() => {
    if( message ) {
      setMessages(prevMessages => [...prevMessages, message]);
    }
  }, [message]);

  const deleteHandler = (e, dog) => {
    e.preventDefault();
    setSelectedDog({ id: dog._id, name: dog.name });
    setPopup(true);
  }

  const popupCancelHandler = (e) => {
    e.preventDefault();
    setPopup(false);
    setSelectedDog({});
  }

  const popupOkHandler = async (e) => {
    e.preventDefault();

    dispatch(deleteDog(selectedDog.id));

    setPopup(false);
    setSelectedDog({});
  }

  return(
    <Fragment>
      <section className="s-message">
        { messages.map((msg, index) => (
          <Alert key={index} type="success" msg={msg} />)
        )}
        {error && <Alert type="error" msg={error} />}
      </section>
      <h3>Dogs</h3>
      <div className="u-relative">
        {loading && dogs.length === 0 && <Loader />}
        {dogs.length === 0 
          ? <p style={{marginBottom: '40px'}}>Nothing found, please add a dog</p>
          : <DogsTable dogs={dogs} onDelete={deleteHandler} />
        }
        <Button text="Add new dog" to="/dashboard/dogs/add" link />
      </div>

      { popup &&
        <Popup 
          title={`Are you sure you want to delete dog "${selectedDog.name}" from database ?`}
          onCancel={popupCancelHandler}
          onOk={popupOkHandler}
        />
      }
    </Fragment>
  );
}

export default DogsList;