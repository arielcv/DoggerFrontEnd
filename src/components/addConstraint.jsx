import React, {useState} from 'react';
import {TimePicker, Multiselect} from "react-widgets";
import {Collapse} from "react-bootstrap";
import {createConstraints} from "../utils/services";

function AddConstraint({show, id, handleAdd}) {

  const [data, setData] = useState({start: '', end: '', sizesAllowed: []});
  const [errors, setErrors] = useState('');

  const handleStart = value => {
    console.log(value);
    handleInput(value, 'start');
  };

  const handleEnd = value => {
    console.log(value);
    handleInput(value, 'end');
  };

  const handleSize = value => {
    console.log(value);
    let output = [];
    if (value === []) {
      output = [];
    } else if (value.includes('All')) {
      output = ['All'];
    } else if ((value.includes('Small')) && (value.includes('Medium')) && (value.includes('Large'))) {
      output = ['All'];
    } else {
      output = value;
    }
    handleInput(output, 'sizesAllowed');
  };


  const handleInput = (value, field) => {
    const current = data;
    console.log(current);
    current[field] = value;
    console.log(current);
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
    if (data.sizesAllowed.length === 0) {
      errorArray.size = 'True';
    }
    setErrors(errorArray);
    return Object.keys(errorArray).length;
  };

  const handleCreateConstraint = async () => {
    const response = await createConstraints(id, data.start, data.end, data.sizesAllowed);
    console.log(response);
    if (response) handleAdd(response);
  };

  return (
    <div style={{margin: '2% 0'}}>
      <Collapse in={show}>
        <div className='row'>
          <div className='form-group col-4 text-lg-center'>
            <label>Start Time</label>
            <TimePicker
              dropDown
              data={[
                'orange',
                'red',
                'blue',
                'purple'
              ]}
              onChange={value => handleStart(value)}
            />
            {errors.start && <div className='formError'>{`The start datetime is required`}</div>}
          </div>

          <div className='form-group col-4 text-lg-center'>
            <label>Ending Time</label>
            <TimePicker
              dropDown
              data={[
                'orange',
                'red',
                'blue',
                'purple'
              ]}
              onChange={value => handleEnd(value)}
            />
            {errors.end && <div className='formError'>{`The end datetime is required`}</div>}
          </div>

          <div className='form-group col-4 text-lg-center'>
            <label>Select the sizes allowed </label>
            <Multiselect data={['small', 'medium', 'large', 'all']}
                         value={data.size}
                         onChange={(value) => handleSize(value)}
            />
            {errors.size && <div className='formError'>{`The size is required`}</div>}
          </div>

          <div style={{margin: "auto"}}>
            <button className='btn btn-outline-primary btn-block'
                    onClick={() => handleCreateConstraint()}
            >
              Create constraint
            </button>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default AddConstraint;
