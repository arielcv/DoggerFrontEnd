import React from 'react';
import {Link} from 'react-router-dom'
import profileLogo from '../imgs/profileLogo.png'
import dogLogo from '../imgs/dogLogo.png'
import reservationsLogo from '../imgs/reservationsLogo.png'
import walkerLogo from '../imgs/walkerLogo.png'

function NavBar({user, logout}) {

  return (
    <nav className="navbar navbar-expand-sm custom-navbar">
      <div>
        <i className='fa fa-4x fa-paw'/>
        <h3>Dogger</h3>
      </div>
      <ul className="navbar-nav flex-row col-8">

        {user && <div className='nav-item col-3'>
          <li className="nav-item text-lg-center">
            <Link className = 'btn btn-dark' to={'/profile'}>My Profile</Link>
          </li>
          <div className='profile-logo-container'>
            <img className='profile-logo' src={profileLogo}/>
          </div>
        </div>}

        {user.role === 'owner' && <div className='nav-item col-3'>
          <li className="nav-item text-lg-center">
            <Link className = 'btn btn-dark' to={"/dogs"}>My dogs</Link>
          </li>
          <div className='profile-logo-container'>
            <img className='profile-logo' src={dogLogo}/>
          </div>
        </div>}

        {user.role === 'owner' && <div className='nav-item col-3'>
          <li className="nav-item text-lg-center">
            <Link className = 'btn btn-dark' to={"/owner-reservations"}>My reservations</Link>
          </li>
          <div className='profile-logo-container'>
            <img className='profile-logo' src={reservationsLogo}/>
          </div>
        </div>}

        {user.role === 'walker' && <div className='nav-item col-3'>
          <li className="nav-item text-lg-center">
            <Link className = 'btn btn-dark' to={"/walker-reservations"}>My reservations</Link>
          </li>
          <div className='profile-logo-container'>
            <img className='profile-logo' src={reservationsLogo}/>
          </div>
        </div>}

        {user.role === 'owner' && <div className='nav-item col-3'>
          <li className="nav-item text-lg-center">
            <Link className = 'btn btn-dark' to={"/walkers"}>Walkers</Link>
          </li>
          <div className='profile-logo-container'>
            <img className='profile-logo' src={walkerLogo}/>
          </div>
        </div>}

      </ul>
      <ul className="nav navbar-nav justify-content-end align-content-between" style={{width: '80%'}}>
        <li className='align-items-end'>
          {user ? <h3>{`Hello ${user.name}`}</h3> :
            <Link className = 'btn btn-primary' to='/login'>Hello. You are not logged. Please login to enjoy our services</Link>}
        </li>
        <li>
          {user ? <button className='fa fa-power-off btn btn-outline-dark'
                     style={{
                       'marginLeft': '10px', cursor: 'pointer'
                     }}
                     onClick={() => logout()}
          > Log off</button> : null}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
