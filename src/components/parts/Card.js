import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ dog }) => {
  return (
    <Link to={`/dog/${dog.slug}`} className="c-card">
      <div className="c-card__img" style={{backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/${dog.image.image})`}}></div>
      <h4>{dog.name}</h4>
    </Link>
  )
}

export default Card;
