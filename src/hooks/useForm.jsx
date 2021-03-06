import React, {useState} from 'react';
import validate from "../utils/validate";

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event) {
      const validationErrors = validate(inputs);
      const noErrors = Object.keys(validationErrors).length === 0;
      setErrors(validationErrors);
      if (noErrors) {
        console.log("Authenticated", inputs);
      } else {
        console.log("errors try again", validationErrors);
      }
    }
  };
  const handleInputChange = (event) => {
    event.persist();
    console.log(event.target.id);
    setInputs(inputs => ({...inputs, [event.target.id]: event.target.value}));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors
  };
};

export default useForm;
