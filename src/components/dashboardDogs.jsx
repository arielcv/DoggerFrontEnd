import React, {useState, useEffect} from 'react';
import {getDogsByOwner} from "../utils/services";
import DogCard from './dogCard'
import CreateDogForm from "./createDogForm";
import {Collapse} from "react-bootstrap";
import {createDog} from "../utils/services"

function DashboardDogs(props) {
  const [dogs, setDogs] = useState([]);
  const [adding, setAdding] = useState(false);

  useEffect(async () => {
    try {
      const {data} = await getDogsByOwner(props.user);
      setDogs(data);
    } catch (e) {
      console.log(e.response.status);
    }
  }, []);

  const handleAddDog = async (data) => {
    console.log(data);
    try {
      const response = await createDog(data);
      console.log(response.data);
      const arrayDogs = [...dogs, data];
      setDogs(arrayDogs);
      setAdding(false);
      return {}
    } catch (e) {
      return e.response.data;
      // Object.keys(errorArray).map((error) => toast.error(`There was a problem with the field ${error}: ${errorArray[error]}`))
    }
  };

  return (
    <div style={{maxWidth: '60%', margin: 'auto'}}>
      <div className="card-deck">
        {dogs.map(dog => <DogCard
            key={dog.user}
            name={dog.name}
            size={dog.size}
          />
        )}
      </div>
      <div>
        <button
          className='btn btn-primary'
          onClick={() => setAdding(!adding)}
          aria-controls="example-collapse-text"
          aria-expanded={adding}
        >
          Add a dog
        </button>
        <Collapse in={adding}>
          <div>
            <CreateDogForm user={props.user} addDog={handleAddDog}/>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default DashboardDogs;
