import React from 'react';

import Button from '../common/Button';

const BreedsTable = (props) => {
  return(
    <div className="c-table">
      <div className="c-table__row c-table__row--head">
        <div className="c-table__cell">Name</div>
        <div className="c-table__cell">Origin</div>
        <div className="c-table__cell c-table__cell--borderless">&nbsp;</div>
        <div className="c-table__cell">&nbsp;</div>
      </div>
      {props.breeds.map(breed => (
        <div key={breed._id} className="c-table__row">
          <div className="c-table__cell" data-title="Name:">{breed.name}</div>
          <div className="c-table__cell" data-title="Origin:">{breed.origin}</div>
          <div className="c-table__cell c-table__cell--action">
            <Button text="Edit" to={`/dashboard/breeds/edit/${breed._id}`} small info link />
          </div>
          <div className="c-table__cell c-table__cell--action">
            <Button text="Delete" small danger onClick={(e) => props.onDelete(e, breed)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default BreedsTable;