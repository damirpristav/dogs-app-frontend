import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Main from '../common/Main';
import Adoptions from './dashboard/Adoptions';
import Dogs from './dashboard/Dogs';
import Breeds from './dashboard/Breeds';
import Users from './dashboard/Users';
import Notifications from './dashboard/Notifications';
import Gallery from './dashboard/Gallery';
import Loader from '../common/Loader';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if(user) {
      setIsLoading(false);
    }
  }, [user]);

  let links;
  if(user && user.role === 'admin') {
    links = (
      <Fragment>
        <li><NavLink to='/dashboard' activeClassName="active" exact>Adoptions</NavLink></li>
        <li><NavLink to='/dashboard/dogs' activeClassName="active">Dogs</NavLink></li>
        <li><NavLink to='/dashboard/users' activeClassName="active">Users</NavLink></li>
        <li><NavLink to='/dashboard/breeds' activeClassName="active">Breeds</NavLink></li>
        <li><NavLink to='/dashboard/gallery' activeClassName="active">Gallery</NavLink></li>
        <li><NavLink to="/dashboard/my-account" activeClassName="active">My account</NavLink></li>
        <li><NavLink to="/dashboard/notifications" activeClassName="active">Notifications</NavLink></li>
      </Fragment>
    );
  }else {
    links = (
      <Fragment>
        <li><NavLink to="/dashboard" activeClassName="active" exact>My Adoptions</NavLink></li>
        <li><NavLink to="/dashboard/my-account" activeClassName="active">My account</NavLink></li>
        <li><NavLink to="/dashboard/notifications" activeClassName="active">Notifications</NavLink></li>
      </Fragment>
    );
  }

  return (
    <Main>
      {isLoading ? <Loader /> : 
      <div className="s-dashboard">
        <div className="container">
          <div className="s-dashboard__inner l-flex">
            <div className="s-dashboard__menu">
              <nav>
                <ul>
                  {links}
                </ul>
              </nav>
            </div>
            <div className="s-dashboard__main">
              <Switch>
                <Route exact path='/dashboard' component={Adoptions} />
                <Route path='/dashboard/dogs' component={Dogs} />
                <Route path='/dashboard/users' component={Users} />
                <Route path='/dashboard/breeds' component={Breeds} />
                <Route path='/dashboard/my-account' component={() => <h3>My account</h3>} />
                <Route path='/dashboard/notifications' component={Notifications} />
                <Route path='/dashboard/gallery' component={Gallery} />
                <Route path='*' component={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      }
    </Main>
  )
}

export default Dashboard;
