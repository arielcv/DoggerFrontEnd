import React, {useState} from 'react';
import {Collapse} from "react-bootstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import {toast} from "react-toastify";
import {Link} from 'react-router-dom'
import {sendReservationByWalker, sendReservationToAll} from "../utils/services";
import SelectDog from "./selectDog";

function DateTimeReservation({userId, walkerId, dogs, submitText, target, ...props}) {
  const [mode, setMode] = useState(false);
  const [reservation, setReservation] = useState({start: null, end: null, selectedDogId: null});
  const [errors, setErrors] = useState({start: "", end: "",selectedDogId:""});

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
    handleInput(dog, 'selectedDogId');
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
    if (!reservation.selectedDogId) {
      errorArray.selectedDogId = 'True';
    }
    setErrors(errorArray);
    return Object.keys(errorArray).length;
  };

  const handleSubmit = async () => {
    console.log(reservation);
      if (validate(reservation)) {
        toast.error('There are some errors in your reservation');
      } else {
        let response = '';
        if (target === 'multiple') {
          response = await sendReservationToAll(userId,reservation.start, reservation.end, reservation.selectedDogId);
        } else if (target === 'single') {
          response = await sendReservationByWalker(walkerId, reservation.start, reservation.end, reservation.selectedDogId);
        }
        if (response) {
          toast.success("Your reservation was created");
          setReservation({start: null, end: null, selectedDogId: null});
          setMode(false);
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
          {errors.selectedDogId && <div className='formError'>{`Select a dog`}</div>}

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
