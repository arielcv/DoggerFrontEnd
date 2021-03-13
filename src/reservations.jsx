import React, {useState, useEffect} from 'react';
import {getReservationByWalker, getReservationByOwner} from "./utils/services";

function Reservations({user}) {

  const [reservations, setReservations] = useState([]);

  useEffect(async () => {
    try {
      let reservations = '';
      if (user.role === 'walker') {
        reservations = await getReservationByWalker(user.name);
      } else if (user.role === 'owner') {
        reservations = await getReservationByOwner(user.name);
      }
      console.log(reservations.data);
      setReservations(reservations.data);
    } catch (e) {
      console.log("Error");
    }
  }, []);

  const row = (rowData) => (
    <tr key={rowData.id}>
      <th>{rowData.start}</th>
      <th>{rowData.end}</th>
      <th>{rowData.dog.name}</th>
      <th>{rowData.dog.size.toUpperCase()}</th>
      <th>{rowData.owner.name}</th>
      <th>{(rowData.confirmed) ? <i className='fa fa-check-circle '/> :
        <i className='fa fa-2x fa-clock-o text-warning' style={{padding: '5%'}}/>}
      </th>
      <th>
        <button className='btn btn-outline-success btn-actions'>Accept</button>
        <button className='btn btn-outline-danger btn-actions'>Reject</button>
      </th>
    </tr>
  );

  const table = () => (
    <table className='table' style={{width: "100%"}}>
      <tr>
        <th>Start Date Time</th>
        <th>End Date Time</th>
        <th>Dog</th>
        <th>Size</th>
        {user.role === 'walker' && <th>Dog Owner</th>}
        {user.role === 'owner' && <th>Dog Walker</th>}
        <th>State</th>
        <th>Actions</th>
      </tr>
      {reservations.map(r => row(r))}

    </table>
  );

  return (
    <div style={{alignContent:'center',textAlign:'center', margin:'2.5% 0'}}>
      {reservations ? table() : <h1 className='jumbotron jumbotron-fluid'> You have no reservations</h1>}
    </div>
  );
}

export default Reservations;
