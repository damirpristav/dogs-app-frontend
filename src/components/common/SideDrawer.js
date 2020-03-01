import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const SideDrawer = (props) => {
  let links;
  if(props.user && props.user.role === 'admin') {
    links = (
      <Fragment>
        <li><NavLink to='/dashboard' activeClassName="active" exact onClick={props.onDrawerClose}>Adoptions</NavLink></li>
        <li><NavLink to='/dashboard/dogs' activeClassName="active" onClick={props.onDrawerClose}>Dogs</NavLink></li>
        <li><NavLink to='/dashboard/users' activeClassName="active" onClick={props.onDrawerClose}>Users</NavLink></li>
        <li><NavLink to='/dashboard/breeds' activeClassName="active" onClick={props.onDrawerClose}>Breeds</NavLink></li>
        <li><NavLink to='/dashboard/gallery' activeClassName="active" onClick={props.onDrawerClose}>Gallery</NavLink></li>
        <li><NavLink to="/dashboard/my-account" activeClassName="active" onClick={props.onDrawerClose}>My account</NavLink></li>
        <li><NavLink to="/dashboard/notifications" activeClassName="active" onClick={props.onDrawerClose}>Notifications</NavLink></li>
      </Fragment>
    );
  }else {
    links = (
      <Fragment>
        <li><NavLink to="/dashboard" activeClassName="active" onClick={props.onDrawerClose}>My Adoptions</NavLink></li>
        <li><NavLink to="/dashboard/my-account" activeClassName="active" onClick={props.onDrawerClose}>My account</NavLink></li>
        <li><NavLink to="/dashboard/notifications" activeClassName="active" onClick={props.onDrawerClose}>Notifications</NavLink></li>
      </Fragment>
    );
  }

  return(
    <div className="s-side-drawer">
      <div className="s-side-drawer__overlay" onClick={props.onDrawerClose}></div>
      <nav className="c-nav">
        <ul>
          {links}
          <li><a href="#/" onClick={props.onLogout}>Logout</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default SideDrawer;