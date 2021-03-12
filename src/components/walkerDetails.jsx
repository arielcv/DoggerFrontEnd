import React from 'react';
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimeReservation from "./dateTimeReservation";

Moment.locale('en');
momentLocalizer();

function WalkerDetails({data, dogs, selection}) {

  return (
    <div className="card walker-details">
      <h1 className="card-title">
        <div className='d-flex justify-content-between align-items-center'>
          <div style={{marginLeft: '60px'}}>{data.name}</div>
          <i className='btn-outline-success fa fa-window-close-o'
             style={{padding: '10px', cursor: 'pointer'}}
             onClick={() => selection('')}
          />
        </div>
      </h1>
      <div className="card-header">{data.email}</div>
      <DateTimeReservation walker = {data.name} dogs={dogs} submitText={'Reserve this walker'} target = {'single'}/>

    </div>
  )
    ;
}

export default WalkerDetails;
