import React from 'react';
import {Link} from 'react-router-dom'

function NavBar({user, setUser}) {

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser('');
    console.log("Logged out");
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <ul className="navbar-nav flex-row">
        <li className="nav-item col-6">
          <Link to={'/profile'}>My Profile</Link>
        </li>
        <li className="nav-item col-6">
          <Link to={"/dogs"}>My dogs</Link>
        </li>
        <li className="nav-item col-6">
          <Link to={"/walkers"} >Walkers</Link>
        </li>
      </ul>
      <ul className="nav navbar-nav justify-content-end align-content-around" style={{width: '80%'}}>
        <li
          className='align-items-end'>{user ? `Hello ${user}` :
          <Link to='/login'>Hello. You are not logged. Please login to enjoy our services</Link>}
        </li>
        <li>
          {user ? <a className='fa fa-power-off'
                     style={{
                       'marginLeft': '10px', cursor: 'pointer'
                     }}
                     onClick={() => handleLogout()}
          > Log off</a> : null}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
