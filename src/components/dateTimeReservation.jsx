import React,{useState} from 'react';
import {Collapse} from "react-bootstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

function DateTimeReservation(props) {
  const [mode, setMode] = useState(false);

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
              onChange={value => console.log(value)}
            />
          </div>
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
              onChange={value => console.log(value)}
            />
          </div>
          <button className="btn btn-sm btn-primary">Reservation</button>
        </div>
      </Collapse>
    </div>
  );
}

export default DateTimeReservation;
