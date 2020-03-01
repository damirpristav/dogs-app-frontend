import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../common/Loader';
import AddNewImage from './AddNewImage';

import { getAllImages } from '../../../store/actions/galleryActions';
import { resetMessage } from '../../../store/actions';

const GalleryPopup = ({ onImageChoose, onClose }) => {
  const [tab, setTab] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedImgSrc, setSelectedImgSrc] = useState('');
  const images = useSelector(state => state.gallery.images);
  const loading = useSelector(state => state.gallery.loading);
  const message = useSelector(state => state.gallery.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  useEffect(() => {
    if(tab === 1 && message) {
      dispatch(resetMessage());
    }
  }, [tab, message, dispatch]);

  const onImageClick = (e, id, src) => {
    setSelectedImg(id);
    setSelectedImgSrc(src);
  }

  return (
    <div className="s-popup s-popup--big">
      <div className="s-popup__inner">
        <div className="s-popup__close" onClick={onClose}>X</div>
        <nav>
          <ul>
            <li onClick={() => setTab(1)} className={`${tab === 1 ? 'active' : ''}`}>Choose image from gallery</li>
            <li onClick={() => setTab(2)} className={`${tab === 2 ? 'active' : ''}`}>Upload new image</li>
          </ul>
        </nav>
        <div className="s-popup__content">
          { tab === 1 && 
            <div className="s-popup__content_box">
              <div className="u-relative">
                {loading && !images && <Loader />}
                <div className="c-gallery c-gallery--small">
                  {images.map(image => (
                    <div 
                      className={`c-gallery__box ${image._id === selectedImg && 'active'}`}
                      key={image._id} 
                      onClick={(e) => onImageClick(e, image._id, `${process.env.REACT_APP_BACKEND_URL}/uploads/${image.image}`)}
                    >
                      <div style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/${image.image})`}}></div>
                    </div>
                  ))}
                </div>
                { selectedImg &&  
                  <button className="btn" onClick={() => onImageChoose(selectedImg, selectedImgSrc)}>Choose this image</button>
                }
              </div>
            </div>
          }
          { tab === 2 &&
            <div className="s-popup__content_box">
              <AddNewImage 
                showBtn
              />
              { message && <div className="c-alert c-alert--success" style={{marginTop: '15px'}}>{message}</div>}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default GalleryPopup;
