import React from 'react';
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

Moment.locale('en');
momentLocalizer();

function WalkerDetails({data}) {
  console.log(data);
  return (
    <div className="card details">
      <h1 className="card-title">{data.name}</h1>
      <div className="card-header">{data.email}</div>
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
    </div>
  )
    ;
}

export default WalkerDetails;
