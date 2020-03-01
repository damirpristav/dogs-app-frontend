import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../common/Loader';
import UsersTable from '../../parts/UsersTable';

import { getAllUsers, deleteUser } from '../../../store/actions/userActions';

const Users = () => {
  const users = useSelector(state => state.user.users);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const deleteUserHandler = id => {
    dispatch(deleteUser(id));
  }

  return (
    <Fragment>
      <h3>Users</h3>
      <div className="u-relative">
        { loading && <Loader />}  
        { users.length > 0 
          ? <UsersTable users={users} onDelete={deleteUserHandler} />
          : <p>No registered users yet!</p>
        }
      </div>
    </Fragment>
  )
}

export default Users;
