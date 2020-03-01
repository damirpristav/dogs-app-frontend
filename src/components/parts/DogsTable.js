import React from 'react';

import Button from '../common/Button';

const DogsTable = (props) => {
  return(
    <div className="c-table">
      <div className="c-table__row c-table__row--head">
        <div className="c-table__cell">Name</div>
        <div className="c-table__cell">Breed</div>
        <div className="c-table__cell">Adoption</div>
        <div className="c-table__cell">&nbsp;</div>
        <div className="c-table__cell">&nbsp;</div>
      </div>
      {props.dogs.map(dog => (
        <div key={dog._id} className="c-table__row">
          <div className="c-table__cell" data-title="Name:">{dog.name}</div>
          <div className="c-table__cell" data-title="Breed:">{dog.breed.name}</div>
          <div className="c-table__cell" data-title="Adoption:">{dog.adoption === 'none' ? '-' : dog.adoption}</div>
          <div className="c-table__cell c-table__cell--action">
            <Button text="Edit" to={`/dashboard/dogs/edit/${dog.slug}`} small info link />
          </div>
          <div className="c-table__cell c-table__cell--action">
            {dog.adoption === 'none' && <Button text="Delete" small danger onClick={(e) => props.onDelete(e, dog)} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DogsTable;