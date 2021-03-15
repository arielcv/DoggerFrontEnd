import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert'
import {DatePicker} from 'react-widgets'
import {editOwnerProfile, editWalkerProfile, getConstraints, removeConstraints} from "../utils/services";
import AddConstraint from "./addConstraint";
import {toast} from "react-toastify";

function Profile({user, handleLogin}) {

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

  const validate = () => {
    const errorArray = {};
    if (dataProfile.birthDate) {
      const currentYear = dataProfile.birthDate.getFullYear();
      const minAge = 16;
      const minYear = new Date().getFullYear() - minAge;
      if (currentYear > minYear) {
        errorArray.birthDate = 'The min age required is 16';
      }
    }
    setErrors(errorArray);
    return Object.keys(errorArray).length;
  };

  const handleSubmit = () => {
    if (validate() === 0) {
      let data = '';
      if (user.role === 'owner') {
        data = editOwnerProfile(user.id)
      } else if (user.role === 'walker') {
        data = editWalkerProfile(user.id)
      }
      if (data) handleLogin(dataProfile)
    } else {
      toast.error('There are some errors in your profile')
    }
  };

  const fetchConstraints = async () => {
    setShowConstraints(!showConstraints);
    if (!showConstraints) {
      const data = await getConstraints(user.id);
      console.log(data);
      setConstraints(data)
    }
  };


  const handleAddConstraints = (constraint) => {
    console.log(constraint);
    const updatedConstraints = [...constraints, ...constraint];
    setConstraints(updatedConstraints)
  };


  const handleRemoveConstraints = async (id) => {
    const updatedConstraints = constraints.filter(c => c.id !== id);
    const response = await removeConstraints(id);
    if (response) setConstraints(updatedConstraints)

  };

  const handleShow = () => {
    setShowConstraints(!showConstraints)
  };

  const row = ({id, start, end, sizesAllowed}) => (
    <tr key={id}>
      <th>{start}</th>
      <th>{end}</th>
      <th>{sizesAllowed.toUpperCase()}</th>
      <th>
        <div className='row flex-row align-content-between justify-content-around'>
          <i onClick={() => handleRemoveConstraints(id)} className='fa fa-2x fa-remove btn btn-sm'/>
        </div>
      </th>
    </tr>
  );

  const constraint = (data) => {
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

          {user.role === 'walker' && <div>
            <div style={{margin: '1% 0'}}>
              <button className='btn btn-success ' onClick={() => fetchConstraints()}>Show Constraints
              </button>
            </div>
            <Alert show={showConstraints} variant="warning">
              <Alert.Heading>Constraints</Alert.Heading>
              <table className='table' style={{color: 'gray', textAlign: "center"}}>
                <th>Start</th>
                <th>End</th>
                <th>Allowed sizes in this period</th>
                <th>Actions</th>
                {constraints && constraint(constraints)}
              </table>
              <div>
                <button className='btn btn-outline-danger btn-block'
                        style={{width: '20%', margin: 'auto'}}
                        onClick={() => setAddConstraint(!addConstraint)}
                >
                  Add a constraint
                </button>
                <AddConstraint show={addConstraint}
                               handleShow={handleShow}
                               name={dataProfile.name}
                               id = {dataProfile.id}
                               handleAdd={handleAddConstraints}
                />
              </div>
            </Alert>
          </div>}

          <div className="form-group">
            <label htmlFor="username">Bio</label>
            <textarea rows={5}
                      className="form-control"
                      id="bio"
                      value={(dataProfile.bio) ? dataProfile.bio : ''}
                      onChange={(e) => handleInput(e.target.value, e.target.id)}
            />
          </div>


          <div className="form-group">
            <label htmlFor="bithdate">Birthdate</label>
            <DatePicker onChange={(e) => handleInput(e, 'birthDate')}
                        value={(dataProfile.birthDate) ? dataProfile.birthDate : null}
                        min={new Date(1900, 1, 1)}
                        max={new Date()}
                        def
            />
          </div>
          {errors.birthDate && <p className='formError'>{errors.birthDate}</p>}

          <button className="btn btn-primary"
                  style={{maxWidth: '50%'}}
                  onClick={handleSubmit}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
