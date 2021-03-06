import React from 'react';
import {Link} from 'react-router-dom'

function NavBar({user}) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location = '/'
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#">My Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">My dogs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/walkers">Walkers</a>
        </li>
      </ul>
      <ul className="nav navbar-nav justify-content-end align-content-around" style={{width: '80%'}}>
        <li
          className='align-items-end'>{user ? `Hello ${user}` :
          <Link to='/login'>Hello. You are not logged. Please login to enjoy our services</Link>}
        </li>
        <li>
          {user ? <a className='fa fa-power-off'
                     style={{'margin-left':'10px', cursor:'pointer'
                     }}
                     onClick={() => handleLogout()}
          > Log off</a> : null}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
