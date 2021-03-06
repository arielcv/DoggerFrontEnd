const validate = (inputs) => {

  //User errors
  const errors = {};
  if (!inputs.username) {
    errors.username = "Username is required"
  }

  //Email errors
  if (!inputs.email) {
    errors.email = 'Email is required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)
  ) {
    errors.email = 'Invalid email address';
  }

  //Password Errors
  if (!inputs.password) {
    errors.password = 'Password is required'
  } else if (inputs.password.length < 6) {
    errors.password = 'Password too short'
  } else if (inputs.password !== inputs.repeatPassword) {
    errors.password = "The passwords doesn't match"
  }

  //Role Errors
  if (!inputs.role || (inputs !== 'owner' && inputs !== 'walker')){
    errors.role = "Select a role"
  }

  return errors;
};
export default validate;
