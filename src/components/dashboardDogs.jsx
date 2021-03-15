import React, {useState, useEffect} from 'react';
import {getDogsByOwner} from "../utils/services";
import DogCard from './dogCard'
import CreateDogForm from "./createDogForm";
import {Collapse} from "react-bootstrap";
import {createDog, updateDog, deleteDog} from "../utils/services"

function DashboardDogs(props) {
  const [dogs, setDogs] = useState([]);
  const [adding, setAdding] = useState(false);

  useEffect(async () => {
    const dogs = await getDogsByOwner(props.user.name);
    if (dogs) setDogs(dogs);
  }, []);

  const handleAddDog = async (newDog) => {
    try {
      const response = await createDog(newDog);
      if (response) {
        console.log(response);
        const arrayDogs = [...dogs, response];
        setDogs(arrayDogs);
        setAdding(false);
        return {}
      }
    } catch (e) {
      return e.response.data;
    }
  };

  const handleEditDog = async (data) => {
    console.log(data);
    try {
      const response = await updateDog(data);
      console.log(response.data);
      const arrayDogs = [...dogs, data];
      setDogs(arrayDogs);
      setAdding(false);
      return {}
    } catch (e) {
      return e.response.data;
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const response = await deleteDog(id);
    if (response) {
      const arrayDogs = dogs.filter((dog) => dog.id !== id);
      setDogs(arrayDogs);
      setAdding(false);
    }
  };

  return (
    <div className='dogCards'>
      <div className="card-deck d-inline-block" style={{width: '100%'}}>
        {dogs.map(dog => <DogCard
            key={dog.id}
            id={dog.id}
            owner={props.user}
            name={dog.name}
            size={dog.size}
            editDog={handleEditDog}
            deleteDog={handleDelete}
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
          {(adding) ? "Return" : "Add a dog"}
        </button>
        <Collapse in={adding}>
          <div>
            <CreateDogForm owner={props.user} createForm={true} addDog={handleAddDog}/>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default DashboardDogs;
