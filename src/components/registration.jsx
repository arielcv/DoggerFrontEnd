import React from 'react';
import useForm from '../hooks/useForm'
import {Link} from 'react-router-dom'

export default function Registration(props) {

  const {inputs, handleInputChange, handleSubmit, errors} = useForm(
    {username: '', email: '', password: '', repeatPassword: ''});

  const handleButton = (e) => {
    e.preventDefault();
    console.log("Button Pressed");
    handleSubmit()
  };

  return (
    <div className="text-center justify-content-center align-items-center" style={{display: 'flex'}}>
      <div className="col-3 card registrationBox align-items-center">

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text"
                 className="form-control"
                 id="username"
                 value={inputs.username}
                 onChange={(e) => handleInputChange(e)}/>
        </div>
        {errors.username && <p className='formError'>{errors.username}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email"
                 className="form-control"
                 id="email"
                 value={inputs.email}
                 onChange={handleInputChange}/>
        </div>
        {errors.email && <p className='formError'>{errors.email}</p>}

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password"
                 className="form-control"
                 id="password"
                 value={inputs.password}
                 onChange={handleInputChange}
          />
          {errors.password && <p className='formError'>{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="Repeat Password">Confirm your password</label>
          <input type="password"
                 className="form-control"
                 id="repeatPassword"
                 value={inputs.repeatPassword}
                 onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="userType">Choose your user type</label>
          <form
            className="form-control justify-content-center align-items-center align-content-md-center"
            id="userType"
            value={inputs.repeatPassword}
            onChange={handleInputChange}
          >
            <div className='form-row justify-content-around'>
              <div>
                <input type="radio" name="userType" value="owner" checked/> Owner
              </div>
              <div>
                <input type="radio" name="userType" value="walker" checked/> Walker
              </div>
            </div>
          </form>
        </div>

        <button className="btn btn-primary"
                style={{maxWidth: '50%'}}
                onClick={handleSubmit}
        >
          Register
        </button>
        <Link to='login'><a> If you already have an account click here!</a> </Link>
      </div>
    </div>
);
}
