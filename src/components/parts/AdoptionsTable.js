import React from 'react';
import dateFormat from 'dateformat';

import Button from '../common/Button';

const AdoptionsTable = ({ adoptions, user, onUpdate }) => {
  return(
    <div className="c-table">
      <div className="c-table__row c-table__row--head">
        <div className="c-table__cell">Dog</div>
        <div className="c-table__cell">Requested by</div>
        <div className="c-table__cell">Created at</div>
        <div className="c-table__cell">Status</div>
        {user.role === 'admin' && <div className="c-table__cell">Update status</div>}
      </div>
      { adoptions.map(adoption => (
        <div className="c-table__row" key={adoption._id}>
          <div className="c-table__cell" data-title="Dog:">{adoption.dog ? adoption.dog.name : adoption.adoptionFor}</div>
          <div className="c-table__cell" data-title="Requested by:">{adoption.user ? adoption.user.firstName + ' ' + adoption.user.lastName : adoption.adoptionBy}</div>
          <div className="c-table__cell" data-title="Created at:">{dateFormat(adoption.createdAt, 'dd.mm.yyyy @ HH:MM:ss')}</div>
          <div className="c-table__cell" data-title="status:">{adoption.progress}</div>
          {user.role === 'admin' && 
            <div className="c-table__cell" data-title="Update status:">
              { adoption.progress !== 'completed' && adoption.progress !== 'canceled' ? 
                <Button info small text="Update" onClick={() => onUpdate(adoption)} />
                : '-'
              }
            </div>
          }
        </div>
      ))}
    </div>
  );
}

export default AdoptionsTable;