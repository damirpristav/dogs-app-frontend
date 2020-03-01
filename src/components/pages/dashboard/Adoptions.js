import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../common/Loader';
import Popup from '../../common/Popup';
import Alert from '../../common/Alert';
import AdoptionsTable from '../../parts/AdoptionsTable';

import { resetMessage } from '../../../store/actions';
import * as adoptionActions from '../../../store/actions/adoptionActions';

const Adoptions = () => {
  const [popup, setPopup] = useState(false);
  const [adoption, setAdoption] = useState(null);
  const [progress, setProgress] = useState('in progress');
  const [messages, setMessages] = useState([]);
  const adoptions = useSelector(state => state.adoption.adoptions);
  const loading = useSelector(state => state.adoption.loading);
  const message = useSelector(state => state.adoption.message);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adoptionActions.getAllAdoptions());

    return () => {
      dispatch(resetMessage());
    }
  }, [dispatch]);

  useEffect(() => {
    if( message ) {
      setMessages(prevMessages => [...prevMessages, message]);
    }
  }, [message]);

  const updateHandler = adoption => {
    setAdoption(adoption);
    setProgress(adoption.progress);
    setPopup(true);
  }

  const changeHandler = e => {
    setProgress(e.target.value);
  }

  const submitHandler = () => {
    dispatch(adoptionActions.updateAdoption(adoption._id, { progress }));
    setPopup(false);
  }

  const cancelHandler = () => {
    setPopup(false);
    setAdoption(null);
  }

  const okHandler = () => {
    submitHandler();
  }

  const popupContent = (
    <form onSubmit={submitHandler} className="form">
      <div className="form__row">
        <select className="form__input" value={progress} onChange={changeHandler}>
          <option value="in progress">In progress</option>
          <option value="visit">Visit</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
    </form>
  );

  return (
    <Fragment>
      <h3>Adoptions</h3>
      <div className="u-relative">
        { loading && <Loader /> }
        <section className="s-message">
          { messages.map((msg, index) => (
            <Alert key={index} type="success" msg={msg} />)
          )}
        </section>
        { adoptions.length > 0 ?
          <AdoptionsTable 
            adoptions={adoptions}
            user={user}
            onUpdate={updateHandler}
          />
          : <p>No adoptions yet!</p>
        }
      </div>

      {popup && <Popup 
        title={`Update adoption for ${adoption.dog.name}`}
        message={popupContent}
        onCancel={cancelHandler}
        onOk={okHandler}
      />}
    </Fragment>
  )
}

export default Adoptions;