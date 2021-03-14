import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert'
import {getConstraints,removeConstraints} from "../utils/services";
import AddConstraint from "./addConstraint";

function Profile({user}) {

  const [dataProfile, setDataProfile] = useState(user);
  const [addConstraint, setAddConstraint] = useState(false);
  const [showConstraints, setShowConstraints] = useState(false);
  const [constraints, setConstraints] = useState([]);
  const [errors, setErrors] = useState({});


  const handleInput = (value, field) => {
    const current = dataProfile;
    current[field] = value;
    setDataProfile(current);
    console.log(current);
    console.log(value, field);
    validate(current);
  };

  const validate = (profile) => {
    const errorArray = {};
    const currentYear = profile.birthDate.slice(0, 4);
    const minAge = 16;
    const minYear = new Date().getFullYear() - minAge;
    if (dataProfile.birthDate && currentYear > minYear) {
      errorArray.birthDate = 'The min age required is 16';
    }
    setErrors(errorArray);
  };

  const fetchConstraints = async () => {
    setShowConstraints(!showConstraints);
    try {
      if (!showConstraints) {
        const {data} = await getConstraints(user.name);
        console.log(data);
        setConstraints(data)
      }
    } catch (e) {
      console.log('Error')
    }
  };

  const handleAddConstraints = async (constraint) => {
    const updatedConstraints = [...constraints, ...constraint];
    setConstraints(updatedConstraints)
  };


  const handleRemoveConstraints = async (id) => {
    const updatedConstraints = constraints.filter(c => c.id !== id);
    try {
      await removeConstraints(id);
      setConstraints(updatedConstraints)
    } catch (e) {
      console.log(e.response.error)
    }
  };

  const handleShow = () => {
    setShowConstraints(!showConstraints)
  };

  const row = ({id,start, end, sizesAllowed}) => (
    <tr key={id}>
      <th>{start}</th>
      <th>{end}</th>
      <th>{sizesAllowed.toUpperCase()}</th>
      <th>
        <div className='row flex-row align-content-between justify-content-around'>
          <i onClick={() => handleEditConstraints()} className='fa fa-2x fa-edit btn btn-sm'/>
          <i onClick={() => handleRemoveConstraints(id)} className='fa fa-2x fa-remove btn btn-sm'/>
        </div>
      </th>
    </tr>
  );

  const constraint = (data) => {
    console.log(data);
    return data.map((c) => row(c))
  };

  return (
    <div className="profileContainer">
      <div className="card profileInside">
        <div className="card-header">
          <div className="card-title">
            <h1>
              {user.name}
            </h1>
            <h2>
              {user.email}
            </h2>
          </div>
        </div>
        <div className="card-body">
          <Alert variant="success" style={{textAlign: "center"}}>
            <Alert.Heading>You are a dog {user.role}</Alert.Heading>
          </Alert>

          <div>
            <div style={{margin: '1% 0'}}>
              <button className='btn btn-success ' onClick={() => fetchConstraints()}>Show Constraints
              </button>
            </div>
            <Alert show={showConstraints} variant="warning">
              <Alert.Heading>Constraints</Alert.Heading>
              <table className='table' style={{color:'gray',textAlign:"center"}}>
                <th>Start</th>
                <th>End</th>
                <th>Allowed sizes in this period</th>
                <th>Actions</th>
                {constraint(constraints)}
              </table>
              <div>
                <button className='btn btn-outline-danger btn-block'
                        style={{width:'20%',margin:'auto'}}
                        onClick={() => setAddConstraint(!addConstraint)}
                >
                  Add a constraint
                </button>
                <AddConstraint show ={addConstraint}
                               handleShow = {handleShow}
                               name = {dataProfile.name}
                               handleAdd={(data) => handleAddConstraints(data)}
                />
              </div>
            </Alert>
          </div>

          <div className="form-group">
            <label htmlFor="username">Bio</label>
            <textarea rows={5}
                      className="form-control"
                      id="bio"
                      value={(dataProfile.bio) ? dataProfile.bio : ''}
                      onChange={(e) => handleInput(e.target.value, e.target.id)}
            />
          </div>
          {/*{errors.username && <p className='formError'>{errors.username}</p>}*/}

          <div className="form-group">
            <label htmlFor="username">Birthdate</label>
            <input type="date"
                   className="form-control"
                   id="birthDate"
                   value={dataProfile.birthDate}
                   onChange={(e) => handleInput(e.target.value, e.target.id)}
            />
          </div>
          {errors.birthDate && <p className='formError'>{errors.birthDate}</p>}

          <button className="btn btn-primary"
                  style={{maxWidth: '50%'}}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
