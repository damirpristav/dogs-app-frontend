import React, { useState, Fragment } from 'react';
import dateFormat from 'dateformat';

import Button from '../common/Button';
import Popup from '../common/Popup';

const UsersTable = (props) => {
  const [popup, setPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const popupOpenHandler = (id, email) => {
    setPopup(true);
    setSelectedUser({
      id,
      email
    });
  }

  const popupCloseHandler = () => {
    setPopup(false);
    setSelectedUser({});
  }

  const deleteHandler = () => {
    props.onDelete(selectedUser.id);
  }

  return(
    <Fragment>
      <div className="c-table">
        <div className="c-table__row c-table__row--head">
          <div className="c-table__cell">Name</div>
          <div className="c-table__cell">Email</div>
          <div className="c-table__cell">Created at</div>
          <div className="c-table__cell">Active</div>
          <div className="c-table__cell">&nbsp;</div>
        </div>
        { props.users.map(user => (
          <div className="c-table__row" key={user._id}>
            <div className="c-table__cell" data-title="Name:">{user.firstName} {user.lastName}</div>
            <div className="c-table__cell" data-title="Email:">{user.email}</div>
            <div className="c-table__cell" data-title="Created at:">{dateFormat(user.createdAt, 'dd.mm.yyyy @ hh:mm:ss')}</div>
            <div className="c-table__cell" data-title="Active:">{user.active ? 'Yes' : 'No'}</div>
            <div className="c-table__cell">
              <Button text="Delete" onClick={() => popupOpenHandler(user._id, user.email)} small danger light />
            </div>
          </div>
        ))}
      </div>

      {popup &&
        <Popup 
          title={`Are you sure you want to delete user with email ${selectedUser.email} ?`}
          onCancel={popupCloseHandler}
          onOk={deleteHandler}
        />
      }
    </Fragment>
  );
}

export default UsersTable;