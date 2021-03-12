import React,{useState} from 'react';
import {Collapse} from "react-bootstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import {toast} from "react-toastify";
import {sendReservationByWalker} from "../utils/services";

function DateTimeReservation(props) {
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

  const handleSubmit = async() => {
    if (validate(dateTime)) {
      toast.error('There are some errors in your reservation');
    } else {
      try{
        const response = await sendReservationByWalker(dateTime.start, dateTime.end);
        const {start, end} = {start: "2021-03-18T12:30:00Z", end: "2021-03-19T17:30:00Z"};
        console.log('Here');
        console.log(Date(start));
        console.log(Date(end));
      }catch (e) {
        console.log(e.response.status);
      }
    }
  };

  return (
    <div className='card' style={{margin:'5% 0'}}>
      <div className='card-header'>
        <button
          className='btn btn-outline-success'
          style={{width: '100%'}}
          onClick={() => setMode(!mode)}
          aria-controls="example-collapse-text"
          aria-expanded={mode}
        >
          Request an dog walker during a time
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
              onChange={value => handleStart(value)}
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
              onChange={value => handleEnd(value)}
            />
          </div>
          {errors.end && <div className='formError'>{`The end datetime is required`}</div>}

          <button className="btn btn-sm btn-primary"
                  style={{margin:'3%'}}
                  onClick={(datetime) => handleSubmit(datetime)}
          >
            Reservation
          </button>
        </div>
      </Collapse>
    </div>
  );
}

export default DateTimeReservation;
