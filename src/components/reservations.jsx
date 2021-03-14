import React, {useState, useEffect} from 'react';
import {getReservationByWalker, getReservationByOwner, confirmReservation, acceptReservation} from "../utils/services";

function Reservations({user}) {

  const [reservationsAssigned, setReservationsAssigned] = useState([]);
  const [reservationsUnassigned, setReservationsUnassigned] = useState([]);

  useEffect(async () => {
    try {
      let reservations = '';
      if (user.role === 'walker') {
        reservations = await getReservationByWalker(user.name);
      } else if (user.role === 'owner') {
        reservations = await getReservationByOwner(user.name);
      }
      setReservationsAssigned([...reservations.data[0]]);
      setReservationsUnassigned([...reservations.data[1]]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const row = ({id, start, end, dog, owner, confirmed}, assigned) => (
    <tr key={id}>
      {console.log(1)}
      <td>{start}</td>
      <td>{end}</td>
      <td>{dog.name}</td>
      <td>{dog.size.toUpperCase()}</td>
      <td>{owner.name}</td>
      <td>{(confirmed) ? <i className='fa fa-2x fa-check-circle text-success'/> :
        <i className='fa fa-2x fa-clock-o text-warning' style={{padding: '5%'}}/>}
      </td>
      <th>
        {user.role === 'walker' && <button className='btn btn-outline-success btn-actions'
                                           disabled={confirmed}
                                           onClick={(assigned) ? () => handleConfirmReservation(id) : () => handleAcceptReservation(id)}
        >Accept
        </button>}
        {user.role === 'walker' && assigned && <button className='btn btn-outline-danger btn-actions'
                                                       disabled={confirmed}
                                                       onClick={() => cancelReservation(id)}
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
      {console.log('assigned',reservationsAssigned)}
      {console.log('unassigned',reservationsUnassigned)}
      {(reservationsAssigned.length !== 0) ? <th colSpan={7}>Assigned Reservations</th> :
        <th colSpan={7}>There are no assigned reservations </th>}
      {(reservationsAssigned.length !== 0) ? reservationsAssigned.map(r => row(r,true)) : ''}
      <tr/>
      {(reservationsUnassigned.length !== 0) ? <th colSpan={7}>Unassigned Reservations</th> :
        <th colSpan={7}>There are no unassigned reservations </th>}
      {(reservationsUnassigned.length !== 0) ? reservationsUnassigned.map(r => row(r, false)) : ''}
    </table>
  );

  const setTrue = (item, field) => {
    item[field] = true;
    return item
  };

  const handleConfirmReservation = async (id) => {
    try {
      await confirmReservation(user.name, id);
      const updatedReservations = reservationsAssigned.map(r => r.id === id ? setTrue(r, 'confirmed') : r);
      setReservationsAssigned(updatedReservations);
    } catch (e) {
      console.log('Error');
    }
  };

  const handleAcceptReservation = async (id) => {
    try {
      console.log(id);
      const {data} = await acceptReservation(id,user.name);
      console.log(reservationsUnassigned);
      console.log(data);
      console.log([...reservationsUnassigned, data]);
      setReservationsUnassigned(reservationsUnassigned.filter(r => r.id !== id));
      setReservationsAssigned([...reservationsAssigned,data]);
    } catch (e) {
      console.log('Error');
    }
  };

  return (
    <div style={{alignContent: 'center', textAlign: 'center', margin: '2.5% 0'}}>
      {reservationsAssigned.length !== 0 || reservationsUnassigned.length !== 0 ? table() :
        <h1 className='jumbotron jumbotron-fluid'> You have no reservations</h1>}
    </div>
  );
}

export default Reservations;
