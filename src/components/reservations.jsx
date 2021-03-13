import React, {useState, useEffect} from 'react';
import {getReservationByWalker, getReservationByOwner, confirmReservation} from "../utils/services";

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

  const row = ({id, start, end, dog, owner, confirmed}) => (
    <tr key={id}>
      <th>{start}</th>
      <th>{end}</th>
      <th>{dog.name}</th>
      <th>{dog.size.toUpperCase()}</th>
      <th>{owner.name}</th>
      <th>{(confirmed) ? <i className='fa fa-2x fa-check-circle text-success'/> :
        <i className='fa fa-2x fa-clock-o text-warning' style={{padding: '5%'}}/>}
      </th>
      <th>
        {user.role === 'walker' && <button className='btn btn-outline-success btn-actions'
                                           disabled={confirmed}
                                           onClick={() => handleconfirmReservation(id)}
        >Accept
        </button>}
        {user.role === 'walker' && <button className='btn btn-outline-danger btn-actions'
                                           disabled={confirmed}
                                           onClick={() => rejectReservation(id)}
        >
          Reject
        </button>}
        {user.role === 'owner' && <button className='btn btn-outline-danger btn-actions'
                                          disabled={confirmed}
                                          onClick={() => cancelReservation(id)}
        >
          Cancel
        </button>}
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

  const setTrue = (item,field) => {
    item[field] = true;
    return item
  }

  const handleconfirmReservation = async (id) => {
    try {
      await confirmReservation(user.name, id);
      const updatedReservations = reservations.map(r => r.id === id ? setTrue(r, 'confirmed') : r);
      setReservations(updatedReservations);
    } catch (e) {
      console.log('Error');
    }
  };

  const rejectReservation = (id) => {

  };

  const cancelReservation = (id) => {

  };

  return (
    <div style={{alignContent: 'center', textAlign: 'center', margin: '2.5% 0'}}>
      {reservations ? table() : <h1 className='jumbotron jumbotron-fluid'> You have no reservations</h1>}
    </div>
  );
}

export default Reservations;
