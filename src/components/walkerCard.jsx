import React, {useState} from 'react';

function WalkerCard({data, handleSelection}) {

  const [over, setOver] = useState(false);


  return (
    <div className={`card custom-card ${(over)? "borderTrue" : ""}`}
         onClick={handleSelection}
         onMouseOver={() => (setOver(true))}
         onMouseLeave={() => (setOver(false))}
    >
      <div className="card-title"> {data.name}</div>
      <div className="card-header d-inline-flex"> {data.email}</div>
      {data.bio && <div className="card-body"> {data.bio}</div>}
      {data.birthdate && <div className="card-footer"> {data.birthdate}</div>}
    </div>
  );
}

export default WalkerCard;
