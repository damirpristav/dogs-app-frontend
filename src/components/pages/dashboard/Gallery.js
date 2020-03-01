import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../common/Loader';
import Popup from '../../common/Popup';
import AddNewImage from './AddNewImage';
import Alert from '../../common/Alert';

import { getAllImages, deleteImage, resetImages } from '../../../store/actions/galleryActions';
import { resetMessage } from '../../../store/actions';

const Gallery = () => {
  const [popup, setPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const images = useSelector(state => state.gallery.images);
  const loading = useSelector(state => state.gallery.loading);
  const message = useSelector(state => state.gallery.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllImages());

    return () => {
      dispatch(resetMessage());
      dispatch(resetImages());
    }
  }, [dispatch]);

  useEffect(() => {
    if( message ) {
      setMessages(messages => [...messages, message]);
    }
  }, [message]);

  const openPopup = () => {
    setPopup(true);
  }

  const onCancelHandler = () => {
    setPopup(false);
  }

  const onImgDeletePopupOpen = img => {
    setImage(img);
    setDeletePopup(true);
  }

  const onImgDeleteHandler = async () => {
    dispatch(deleteImage(image._id));
    setDeletePopup(false);
  }

  const popupContent = <AddNewImage showBtn onClose={onCancelHandler} />;

  return (
    <div>
      <h3>Gallery</h3>
      <div className="u-relative">
        {loading && <Loader />}
        <div className="c-gallery">
          {images.map(image => (
            <div className="c-gallery__box" key={image._id} >
              <span className="c-gallery__box_delete" onClick={() => onImgDeletePopupOpen(image)}>x</span>
              <div style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/${image.image})`}}></div>
            </div>
          ))}
        </div>
        <button className="btn btn--lg" onClick={openPopup}>Add new image</button>
        <section className="s-message">
          { messages.map((msg, index) => (
            <Alert key={index} type="success" msg={msg} />)
          )}
        </section>
      </div>

      {popup && <Popup 
        title="Add new image"
        message={popupContent}
        onCancel={onCancelHandler}
        hideOk
      />}

      {deletePopup && <Popup 
        title={`Are you sure you want to delete "${image.image}" image ?`}
        onCancel={() => setDeletePopup(false)}
        onOk={onImgDeleteHandler}
      />}
    </div>
  )
}

export default Gallery;
