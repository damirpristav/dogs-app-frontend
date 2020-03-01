import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../store/actions/authActions';
import LoadingScreen from '../pages/LoadingScreen';
import SideDrawer from './SideDrawer';

const Header = ({ transparent }) => {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isAuthorized = useSelector(state => state.auth.isAuthorized);
  const user = useSelector(state => state.auth.user);
  const screenLoading = useSelector(state => state.auth.screenLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!screenLoading) {
      setIsScreenLoading(false);
    }
  }, [screenLoading]);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    setIsScreenLoading(true);
  }

  const openDrawerHandler = () => {
    setIsDrawerOpen(true);
  }

  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  }

  return (
    <Fragment>
      {isScreenLoading && <LoadingScreen text="Logging out..." />}
      <header className={transparent ? 'header header--transparent' : 'header'}>
        <div className="container l-flex l-flex--space-between l-flex--center">
          <div className="header__left">
            <nav className="c-nav">
              <ul>
                <li className="">
                  <Link to="/">
                    <svg width="52" height="45" viewBox="0 0 52 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="17.4818" cy="10.6266" rx="6.08108" ry="10.1351" transform="rotate(-5 17.4818 10.6266)" fill={transparent ? '#ffffff' : '#444444'}/>
                      <ellipse cx="7.10086" cy="19.6023" rx="4.05405" ry="8.10811" transform="rotate(-25 7.10086 19.6023)" fill={transparent ? '#ffffff' : '#444444'}/>
                      <ellipse cx="44.3982" cy="19.6023" rx="4.05405" ry="8.10811" transform="rotate(25 44.3982 19.6023)" fill={transparent ? '#ffffff' : '#444444'}/>
                      <ellipse cx="33.698" cy="10.6266" rx="6.08108" ry="10.1351" transform="rotate(5 33.698 10.6266)" fill={transparent ? '#ffffff' : '#444444'}/>
                      <ellipse cx="26" cy="34" rx="17" ry="11" fill={transparent ? '#ffffff' : '#444444'}/>
                    </svg>
                  </Link>
                </li>
                <li className=""><Link to="/dogs">Dogs</Link></li>
              </ul>
            </nav>
          </div>
          <div className="header__right">
            <nav className="c-nav">
              <ul>
                {!isAuthorized ?
                  <Fragment>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                  </Fragment>
                  :
                  <Fragment>
                    <li className="u-desktop">Hello {user && user.firstName}</li>
                    <li className="u-desktop"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="u-desktop"><a href="#/" onClick={logoutHandler}>Logout</a></li>
                    <li className="u-mobile"><a href="#/" onClick={openDrawerHandler}>Menu</a></li>
                  </Fragment>
                }
              </ul>
            </nav>
          </div>
        </div>
      </header>

      { isDrawerOpen && <SideDrawer user={user} onLogout={logoutHandler} onDrawerClose={closeDrawerHandler} /> }
    </Fragment>
  )
}

export default Header;
