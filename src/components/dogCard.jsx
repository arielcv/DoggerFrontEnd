import React from 'react';

function DogCard({name,size}) {
  return (
    <div className='card' style={{minWidth:'90%', margin:'1%'}}>
      <div className='card-header'>{name}</div>
      <div className='card-body'>{size}</div>
    </div>
  );
}

export default DogCard;
