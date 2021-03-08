import React, {useState, useEffect} from 'react';
import {getDogsByOwner} from "../utils/services";
import DogCard from './dogCard'

function DashboardDogs({user}) {
  const [dogs, setDogs] = useState([]);

  useEffect(async () => {
    try {
      const {data} = await getDogsByOwner(user);
      setDogs(data);
    } catch (e) {
      console.log(e.response.status);
    }
  }, []);

  return (
    <div style={{margin: '2%'}}>
      <div className="card-deck">
        {dogs.map(dog => <DogCard
            key={dog.user}
            name={dog.name}
            size={dog.size}
          />
        )}
      </div>
      <div style={{margin:'1%'}}>
        <button className='btn btn-primary'>
          Add a dog
        </button>
      </div>
    </div>
  );
}

export default DashboardDogs;
