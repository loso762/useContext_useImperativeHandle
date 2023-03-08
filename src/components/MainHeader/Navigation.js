import React, { useContext } from 'react';
import AuthContext from '../store/auto-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  let {isLoggedIn,logoutHandler} = useContext(AuthContext);

  console.log(isLoggedIn);
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
      </nav>
  );
};

export default Navigation;
