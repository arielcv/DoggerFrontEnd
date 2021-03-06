import React, {useState} from 'react';
import validate from "../utils/validate";
import axios from 'axios'

import urlBase from '../config'

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const {username, email, password, role} = inputs;
    const validationErrors = validate(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      const authData = {name: username, email, password};
      let response;
      try {
        if (role === 'owner') {
          response = await axios.post(urlBase.urlAPI + 'owners/signup/', authData)
        } else {
          response = await axios.post(urlBase.urlAPI + 'walkers/signup/', authData)
        }
        console.log(response);
      } catch (error) {
        if (error.response.status === 400) {
          console.log(response);
        }
      }
    } else {
      console.log("errors try again", validationErrors);
    }
    return noErrors
  };

  const numberOfErrors = () => {
    return Object.keys(errors).length
  };

  const handleInputChange = (event) => {
    event.persist();
    console.log(event.target.id);
    setInputs(inputs => ({...inputs, [event.target.id]: event.target.value}));
  };
  return {
    handleSubmit,
    handleInputChange,
    numberOfErrors,
    inputs,
    errors
  };
};

export default useForm;
