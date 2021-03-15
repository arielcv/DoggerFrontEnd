import React, {useState, useEffect} from 'react';
import {getConstraints} from "../utils/services";

function WalkerCard({data, handleSelection}) {

  const [over, setOver] = useState(false);
  const [constraints, setConstraints] = useState([]);

  useEffect(async () => {
    console.log(data);
    const constraints = await getConstraints(data.id);
    setConstraints(constraints);
  }, []);


  const walkerConstraints = (c) => (
    <div key={c.id} className='card-footer'>
      <div className='row align-content-between'>
        <div className='col-6 constraint-card'>
          <div>Start</div>
          <div>{c.start}</div>
        </div>
        <div className='col-6 constraint-card'>
          <div>End</div>
          <div>{c.end}</div>
        </div>
      </div>
      <div className='constraint-card'>
        <div>Size allowed</div>
        <div>{c.sizesAllowed.toUpperCase()}</div>
      </div>
    </div>
  );


  return (
    <div className={`card custom-card ${(over) ? "borderTrue" : ""}`}
         onClick={handleSelection}
         onMouseOver={() => (setOver(true))}
         onMouseLeave={() => (setOver(false))}
    >
      <h1 className="card-title"> {data.name}</h1>
      <div className="card-header d-inline-flex"> {data.email}</div>
      {data.bio && <div className="card-body"> {data.bio}</div>}
      {data.birthdate && <div className="card-footer"> {data.birthdate}</div>}
      {constraints.map(constraint => walkerConstraints(constraint))}
    </div>
  );
}

export default WalkerCard;
