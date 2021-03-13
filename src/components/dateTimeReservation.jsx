import React, {useState} from 'react';
import {Collapse} from "react-bootstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import {toast} from "react-toastify";
import {Link} from 'react-router-dom'
import {sendReservationByWalker, sendReservationToAll} from "../utils/services";
import SelectDog from "./selectDog";

function DateTimeReservation({walker, dogs, submitText, target, ...props}) {
  const [mode, setMode] = useState(false);
  const [reservation, setReservation] = useState({start: null, end: null, selectedDog: null});
  const [errors, setErrors] = useState({start: "", end: ""});

  const handleStart = value => {
    console.log(value);
    handleInput(value, 'start');
  };

  const handleEnd = value => {
    console.log(value);
    handleInput(value, 'end');
  };

  const handleDog = (dog) => {
    console.log(dog);
    handleInput(dog, 'selectedDog');
  };

  const handleInput = (value, field) => {
    const current = reservation;
    current[field] = value;
    setReservation(current);
    validate(reservation);
  };

  const validate = () => {
    const errorArray = {};
    if (!reservation.start) {
      errorArray.start = 'True';
    }
    if (!reservation.end) {
      errorArray.end = 'True';
    }
    if (!reservation.selectedDog) {
      errorArray.selectedDog = 'True';
    }
    setErrors(errorArray);
    return Object.keys(errorArray).length;
  };

  const handleSubmit = async () => {
      if (validate(reservation)) {
        toast.error('There are some errors in your reservation');
      } else {
        let response = '';
        try {
          console.log(target);
          if (target === 'multiple') {
            response = await sendReservationToAll(reservation.start, reservation.end, reservation.selectedDog);
          } else if (target === 'single'){
            response = await sendReservationByWalker(walker,reservation.start, reservation.end, reservation.selectedDog);
          }
          const {start, end} = response.data;
          const startDate = new Date(start);
          const endDate = new Date(end);
          toast.success("Your reservation was created");
          setReservation({start: null, end: null, selectedDog: null});
          setMode(false);
        } catch
          (e) {
          if (e.response.status === 406) {
            toast.error("The walker can't accept your reservation");
          } else {
            toast.error("Server error");
          }
        }
      }
    }
  ;

  return (
    <div className='card walker-details'>
      <div>
        <button
          className='btn btn-outline-success'
          style={{width: '100%'}}
          onClick={() => setMode(!mode)}
          aria-controls="example-collapse-text"
          aria-expanded={mode}
        >
          {`${submitText}`}
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

          <div className="form-group">
            {(dogs) ? <SelectDog dogs={dogs} selectDog={handleDog}/> :
              <div><h1>You have not dogs</h1><Link to={'/dogs'}>Create one</Link></div>}

          </div>
          {errors.selectedDog && <div className='formError'>{`Select a dog`}</div>}

          <button className="btn btn-sm btn-primary"
                  style={{margin: '3%'}}
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
