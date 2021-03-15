import React, {useState, useEffect} from 'react';
import WalkerCard from "./walkerCard";
import WalkerRender from "./walkerRender";

import {getDogsByOwner, getWalkers} from '../utils/services'
import DateTimeReservation from "./dateTimeReservation";


function DashboardWalkers({user}) {
  const [walkers, setWalkers] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState(null);
  const [dogs, setDogs] = useState(null);

  useEffect(async () => {
    const walkers = await getWalkers();
    if (walkers) setWalkers(walkers);
    const dogs = await getDogsByOwner(user.name);
    if (dogs) setDogs(dogs);
  }, []);

  const handleSelection = (data) => {
    setSelectedWalker(data);
  };

  return (
    <div className="App row">
      <div className="col-4">
        <WalkerRender data={selectedWalker}
                      dogs = {dogs}
                      walker = {selectedWalker}
                      selection = {handleSelection}
        />
        <div className='flex-lg-row align-content-center'>
          <i className='fa fa-4x fa-paw' style={{margin: '5%'}}/>
          <span style={{fontSize:'50px'}}>OR</span>
          <i className='fa fa-4x fa-paw' style={{margin: '5%'}}/>
        </div>
        <DateTimeReservation userId = {user.id}
                             dogs = {dogs}
                             submitText={"Request an user for an reservation"}
                             target = {'multiple'}
        />
      </div>
      <div className="col-8">
        <div className="card-deck">
          {walkers.map(data => <WalkerCard
              key={data.id}
              data={data}
              handleSelection={() => handleSelection(data)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardWalkers;
