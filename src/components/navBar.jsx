import React from 'react';
import {Link} from 'react-router-dom'

function NavBar({user, logout}) {

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <i className='fa fa-4x fa-paw text-break'/>
      <ul className="navbar-nav flex-row col-8">
        {user && <li className="nav-item col-2">
          <Link to={'/profile'}>My Profile</Link>
        </li>}
        {user.role === 'owner' && <li className="nav-item col-2">
          <Link to={"/dogs"}>My dogs</Link>
        </li>}
        {user.role === 'owner' && <li className="nav-item col-2">
          <Link to={"/owner-reservations"}>My reservations</Link>
        </li>}
        {user.role === 'walker' && <li className="nav-item col-2">
          <Link to={"/walker-reservations"}>My reservations</Link>
        </li>}
        {user.role === 'owner' && <li className="nav-item col-2">
          <Link to={"/walkers"}>Walkers</Link>
        </li>}
      </ul>
      <ul className="nav navbar-nav justify-content-end align-content-between" style={{width: '80%'}}>
        <li className='align-items-end'>
          {user ? `Hello ${user.name}` :
            <Link to='/login'>Hello. You are not logged. Please login to enjoy our services</Link>}
        </li>
        <li>
          {user ? <a className='fa fa-power-off'
                     style={{
                       'marginLeft': '10px', cursor: 'pointer'
                     }}
                     onClick={() => logout()}
          > Log off</a> : null}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
