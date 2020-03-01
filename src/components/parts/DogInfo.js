import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DogInfo = ({ dog, user, isAuthorized, onAdopt }) => {
  return(
    <Fragment>
      <section className="s-title">
        <div className="container">
          <h2 className="u-bold">{dog.name}</h2>
          <p>{dog.description}</p>
        </div>
      </section>
      <section className="s-dog">
        <div className="container">
          <div className="l-flex">
            <div className="s-dog__left">
              <div className="s-dog__img">
                <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${dog.image.image}`} alt={`${dog.name}`} />
              </div>
            </div>
            <div className="s-dog__right">
              <div className="c-infobox">
                <h4>Facts about me</h4>
                <div className="c-infobox__list">
                  <div className="c-infobox__list_item">
                    <h5>Breed</h5>
                    <p><span className="line"></span> {dog.breed.name}</p>
                  </div>
                  <div className="c-infobox__list_item">
                    <h5>Size</h5>
                    <p><span className="line"></span> {dog.size}</p>
                  </div>
                  <div className="c-infobox__list_item">
                    <h5>Age</h5>
                    <p><span className="line"></span> {dog.age}</p>
                  </div>
                  <div className="c-infobox__list_item">
                    <h5>Gender</h5>
                    <p><span className="line"></span> {dog.gender}</p>
                  </div>
                </div>
              </div>
              <div className="c-infobox">
                <h4>More details</h4>
                <div className="c-infobox__list">
                  <div className="c-infobox__list_item">
                    <h5>Trained</h5>
                    <p><span className="line"></span> {dog.trained ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="c-infobox__list_item">
                    <h5>Good with dogs</h5>
                    <p><span className="line"></span> No</p>
                  </div>
                  <div className="c-infobox__list_item">
                    <h5>Good with cats</h5>
                    <p><span className="line"></span> No</p>
                  </div>
                </div>
              </div>
              <div className="c-infobox">
                <h4>Location</h4>
                <div className="c-infobox__list">
                  <div className="c-infobox__list_item">
                    <h5>{dog.location}</h5>
                    <p><span className="line"></span> Some street number</p>
                  </div>
                </div>
              </div>
              {/* Check if logged in user is admin, in that case dont show adopt me button but edit button */}
              {!isAuthorized ? 
                <button className="btn btn--full" onClick={onAdopt}>Adopt me</button> 
                : user.role === 'user' ? 
                  <button className="btn btn--full" onClick={onAdopt}>Adopt me</button>  
                  : <Link to={`/dashboard/dogs/edit/${dog.slug}`} className="btn">Edit</Link>
              }
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default DogInfo;