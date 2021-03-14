import React, {useState} from 'react';

function CreateDogForm({owner, addDog, id, editDog, name, size, createForm}) {
  const [data, setData] = useState({id: id, name: name, size: size, owner});
  const [errorArray, setErrorArray] = useState({});

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const newDog = {...data};
    newDog[id] = value;
    setData(newDog);
    validate()
  };

  const validate = () => {
    const errorArray = {};
    if (!data.name) {
      errorArray.start = 'True';
    }
    if (!data.size) {
      errorArray.end = 'True';
    }
    setErrorArray(errorArray);
    return Object.keys(errorArray).length;
  };

  const handleSubmit = async () => {
    if (validate() === 0) {
      const errors = (createForm) ? await addDog(data) : await editDog(data);
      if (errors){
        setErrorArray(errors)
      }
    }
  };

  return (
    <div className="text-center justify-content-center align-items-center" style={{display: 'flex'}}>
      <div className="card registrationBox align-items-center" style={{minWidth: '80%'}}>
        <div className="form-group">
          <label htmlFor="username">Dog Name</label>
          <input type="text"
                 className="form-control"
                 id="name"
                 value={data.name}
                 onChange={handleChange}
          />
        </div>
        {errorArray.name && <p className='formError'>{errorArray.name}</p>}

        <div style={{minWidth: '30%', margin: '1%'}}>
          <div className="form-group">
            <label htmlFor="size">Select size:</label>
            <select className="form-control" id="size" onChange={handleChange} value={data.size}>
              <option/>
              <option value={'small'}>Small</option>
              <option value={'medium'}>Medium</option>
              <option value={'large'}>Large</option>
            </select>
          </div>
        </div>
        {errorArray.size && <p className='formError'>{errorArray.size}</p>}

        <button type="submit"
                className="btn btn-primary"
                onClick={() => handleSubmit()}>{(createForm ? 'Add a dog' : 'Update dog\'s data')}</button>
      </div>
    </div>
  );
}

export default CreateDogForm;
