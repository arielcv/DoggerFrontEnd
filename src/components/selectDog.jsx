import React from 'react';

function SelectDog({dogs, selectDog}) {
  return (
    <div>
      <label htmlFor="selDog">Select a dog:</label>
      <select className="form-control" id="selDog" onChange={(e) => selectDog(e.target.value)}>
        <option value={''}/>
        {dogs.map(dog => <option value={dog.id}>{dog.name}</option>)}
      </select>
    </div>
  );
}

export default SelectDog;
