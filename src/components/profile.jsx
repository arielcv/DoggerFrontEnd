import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert'

function Profile({user}) {

  const [dataProfile, setDataProfile] = useState(user);
  const [errors, setErrors] = useState({});


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
          <Alert variant="primary" style={{textAlign:"center"}}>
            <Alert.Heading>You are a dog {user.role}</Alert.Heading>
          </Alert>
          <div className="form-group">
            <label htmlFor="username">Bio</label>
            <textarea rows = {5}
                   className="form-control"
                   id="bio"
                   value={(user.bio) ? user.bio : ''}
            />
          </div>
          {/*{errors.username && <p className='formError'>{errors.username}</p>}*/}

          <div className="form-group">
            <label htmlFor="username">Birthdate</label>
            <input type="date"
                   className="form-control"
                   id="birthdate"
                   value={user.birthDate}
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
