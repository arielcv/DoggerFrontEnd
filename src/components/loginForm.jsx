import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {login} from "../utils/services";

function LoginForm({handleLogin, ...props}) {

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const {id, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {username, password} = state;
    const data = await login(username, password);
    if (data){
      handleLogin(data);
      props.history.replace('/');
    }
  };

  return (
    <div className="text-center justify-content-center align-items-center" style={{display: 'flex'}}>
      <div className="col-3 card registrationBox align-items-center">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text"
                 className="form-control"
                 id="username"
                 value={state.username}
                 onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password"
                 className="form-control"
                 id="password"
                 value={state.password}
                 onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
        <Link to='registration'><a> If you have not account, create one here!</a></Link>
      </div>
    </div>
  );
}

export default LoginForm;
