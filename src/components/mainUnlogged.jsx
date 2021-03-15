import React from 'react';
import dog1 from '../imgs/dog1.jpg'
import dog2 from '../imgs/dog2.jpg'

function MainUnlogged(props) {
  return (
    <div>
      <div className='presentation-bar'>
        <div className='presentation-text col-8'
             onClick={() => window.location = '/login'}
        >
          Welcome to dogger. Click here to login or register
        </div>
      </div>
      <img src={dog1} className='dog1'/>
      <img src={dog2} className='dog2'/>
    </div>
  );
}

export default MainUnlogged;
