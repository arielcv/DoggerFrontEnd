import React, {useState} from 'react';
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import {Collapse} from 'react-bootstrap'
import {toast} from "react-toastify";

Moment.locale('en');
momentLocalizer();

function WalkerDetails({data}) {
  const [mode, setMode] = useState(false);
  const [dateTime, setDateTime] = useState({start: null, end: null});
  const [errors, setErrors] = useState({start: "", end: ""});

  const handleStart = value => {
    console.log(value);
    handleInput(value, 'start');
  };

  const handleEnd = value => {
    console.log(value);
    handleInput(value, 'end');
  };

  const handleInput = (value, field) => {
    const current = dateTime;
    current[field] = value;
    setDateTime(current);
    validate(dateTime);
  };

  const validate = dateTime => {
    const errorArray = {};
    if (!dateTime.start) {
      errorArray.start = 'True';
    }
    if (!dateTime.end) {
      errorArray.end = 'True';
    }
    setErrors(errorArray);
    return Object.keys(errorArray).length;
  };

  const handleSubmit = () => {
    if (validate(dateTime)) {
      toast.error('There are some errors in your reservation');
    } else {

    }
  };

  return (
    <div className="card walker-details">
      <h1 className="card-title">
        <div className='d-flex justify-content-between align-items-center'>
          <div style={{marginLeft: '60px'}}>{data.name}</div>
          <i className='btn-outline-success fa fa-window-close-o'
             style={{padding: '10px', cursor: 'pointer'}}
             onClick={() => setMode(false)}
          />
        </div>
      </h1>
      <div className="card-header">{data.email}</div>
      <div className='card-header'>
        <button
          className='btn btn-outline-success'
          onClick={() => setMode(!mode)}
          aria-controls="example-collapse-text"
          aria-expanded={mode}
        >
          Reserve
        </button>
      </div>
      <Collapse in={mode}>
        <div className="card-body">
          <div className='form-group'>
            <label>Start Time</label>
            <DateTimePicker
              dropDown
              data={[
                'orange',
                'red',
                'blue',
                'purple'
              ]}
              onChange={(value) => handleStart(value)}
            />
          </div>
          {errors.start && <div className='formError'>{`The start datetime is required`}</div>}

          <div className='form-group'>
            <label>Ending Time</label>
            <DateTimePicker
              dropDown
              data={[
                'orange',
                'red',
                'blue',
                'purple'
              ]}
              onChange={(value) => handleEnd(value)}
            />
          </div>
          {errors.end && <div className='formError'>{`The end datetime is required`}</div>}

          <button className="btn btn-sm btn-primary"
                  style={{margin: '3%'}}
                  onClick={(datetime) => handleSubmit(datetime)}
          >
            Reservation
          </button>
        </div>
      </Collapse>

    </div>
  )
    ;
}

export default WalkerDetails;
