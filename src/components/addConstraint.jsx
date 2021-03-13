import React,{useState} from 'react';
import {DateTimePicker, Multiselect} from "react-widgets";
import {Collapse} from "react-bootstrap";

function AddConstraint({show, handleShow}) {

  const [data, setData] = useState('');
  const [errors, setErrors] = useState('');

  const handleStart = value => {
    console.log(value);
    handleInput(value, 'start');
  };

  const handleEnd = value => {
    console.log(value);
    handleInput(value, 'end');
  };

  const handleInput = (value, field) => {
    const current = data;
    data[field] = value;
    setData(current);
    validate(data);
  };

  const validate = () => {
    const errorArray = {};
    if (!data.start) {
      errorArray.start = 'True';
    }
    if (!data.end) {
      errorArray.end = 'True';
    }
    if (!data.selectedSizeDog) {
      errorArray.selectedDog = 'True';
    }
    setErrors(errorArray);
    return Object.keys(errorArray).length;
  };


  return (
    <div style={{margin:'2% 0'}}>
      <Collapse in={show}>
        <div className='row'>
          <div className='form-group col-4 text-lg-center'>
            <label>Start Time</label>
            <DateTimePicker
              dropDown
              data={[
                'orange',
                'red',
                'blue',
                'purple'
              ]}
              onChange={value => handleStart(value)}
            />
          </div>
          {errors.start && <div className='formError'>{`The start datetime is required`}</div>}

          <div className='form-group col-4 text-lg-center'>
            <label>Ending Time</label>
            <DateTimePicker
              dropDown
              data={[
                'orange',
                'red',
                'blue',
                'purple'
              ]}
              onChange={value => handleEnd(value)}
            />
          </div>
          {errors.end && <div className='formError'>{`The end datetime is required`}</div>}

          <div className='form-group col-4 text-lg-center'>
            <label>Select the sizes allowed </label>
            <Multiselect data={['Small','Medium','Large','All']}/>
          </div>

          <div style={{margin:"auto"}}>
            <button className='btn btn-outline-primary btn-block'>
              Create constraint
            </button>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default AddConstraint;
