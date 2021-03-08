import React, {useState, useEffect} from 'react';
import {getProfileDetails} from "../utils/services";
import Alert from 'react-bootstrap/Alert'

function Profile({user}) {

  const [{email, role, name, bio, birthDate}, setDataProfile] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(async () => {
    const {data} = await getProfileDetails(user);
    setDataProfile(data);
    console.log(data);
  }, []);

  return (
    <div className="profileContainer">
      <div className="card profileInside">
        <div className="card-header">
          <div className="card-title">
            <h1>
              {user}
            </h1>
            <h2>
              {email}
            </h2>
          </div>
        </div>
        <div className="card-body">
          <Alert variant="primary" style={{textAlign:"center"}}>
            <Alert.Heading>You are a dog {role}</Alert.Heading>
          </Alert>
          <div className="form-group">
            <label htmlFor="username">Bio</label>
            <textarea rows = {5}
                   className="form-control"
                   id="bio"
                   value={bio}
            />
          </div>
          {/*{errors.username && <p className='formError'>{errors.username}</p>}*/}

          <div className="form-group">
            <label htmlFor="username">Birthdate</label>
            <input type="date"
                   className="form-control"
                   id="birthdate"
                   value={birthDate}
            />
          </div>
          {/*{errors.username && <p className='formError'>{errors.username}</p>}*/}

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
