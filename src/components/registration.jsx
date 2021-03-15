import React from 'react';
import useForm from '../hooks/useForm'
import {Link} from 'react-router-dom'
import {toast} from "react-toastify";

export default function Registration(props) {

  const {inputs, handleInputChange, handleSubmit , errors} = useForm(
    {username: '', email: '', password: '', role: '', repeatPassword: ''});

  const handleButton = async (e) => {
    e.preventDefault();
    if (await handleSubmit()) {
      toast.success('User created successfully');
      props.history.replace('/login')
    } else {
      toast.error('There was error(s) creating your user');
    }
  };

  return (
    <div className="text-center justify-content-center align-items-center" style={{display: 'flex'}}>
      <form className="col-3 card registrationBox align-items-center"
            onSubmit={(e) => handleButton(e)}
      >

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

        <div style={{width: "80%"}}>
          <label htmlFor="userType">Choose your user type</label>
          <form
            className="form-control justify-content-center align-items-center align-content-md-center"
            id="userType"
            value={inputs.repeatPassword}
            onChange={handleInputChange}
          >
            <div className='form-row justify-content-around' onChange={handleInputChange}>
              <div>
                <input type="radio" id='role' name="userType" value="owner"/> Owner
              </div>
              <div>
                <input type="radio" id='role' name="userType" value="walker"/> Walker
              </div>
            </div>
          </form>
          {errors.role && <p className='formError'>{errors.role}</p>}
        </div>

        <button className="btn btn-primary"
                style={{maxWidth: '50%', margin:"2% 0"}}
                type={"submit"}
        >
          Register
        </button>
        <Link to='login'><a> If you already have an account click here!</a> </Link>
      </form>
    </div>
  );
}
