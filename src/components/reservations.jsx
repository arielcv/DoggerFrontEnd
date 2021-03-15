import React, {useState, useEffect} from 'react';
import {
  getReservationByWalker,
  getReservationByOwner,
  confirmReservation,
  acceptReservation,
  cancelReservation
} from "../utils/services";

function Reservations({user}) {

  const [reservationsAssigned, setReservationsAssigned] = useState([]);
  const [reservationsUnassigned, setReservationsUnassigned] = useState([]);

  useEffect(async () => {
    let response = {};
    if (user.role === 'walker') {
      response = await getReservationByWalker(user.id);
    } else if (user.role === 'owner') {
      response = await getReservationByOwner(user.id);
    }
    console.log(response);
    if (response) {
      console.log(response);
      if (response.assigned) setReservationsAssigned([...response.assigned]);
      if (response.unassigned) setReservationsUnassigned([...response.unassigned]);
    }
  }, []);

  const parseDate = (data) => {
    const correctionFactor = 6;
    const year = data.slice(0, 4);
    const month = data.slice(5, 7);
    const day = data.slice(8, 10);
    const hour = data.slice(11, 13) - correctionFactor;
    const minute = data.slice(14, 16);
    const second = data.slice(17, 19);
    const datetime = new Date(year, month, day, hour, minute, second);
    return [datetime.toLocaleDateString(), datetime.toLocaleTimeString()]
  };

  const handleCancelReservation = async (reservationId) => {
    const data = await cancelReservation(reservationId);
    console.log(data);
    if (data.walker) {
      const updated = reservationsAssigned.filter(r => r.id !== reservationId);
      console.log(updated);
      setReservationsAssigned(updated)
    } else {
      const updated = reservationsUnassigned.filter(r => r.id !== reservationId);
      setReservationsUnassigned(updated)
    }
  };

  const row = ({id: reservationId, start, end, dog, owner, walker, confirmed, ...rest}, assigned) => (
    <tr key={reservationId}>

      <td>{parseDate(start).map(e =><div>{e}</div>)}</td>
      <td>{parseDate(end).map(e =><div>{e}</div>)}</td>
      <td>{dog.name}</td>
      <td>{dog.size.toUpperCase()}</td>
      {(user.role === 'walker') && <td>{owner.name}</td>}
      {(user.role === 'owner') && <td>{(walker) ? (walker.name) : "Unassigned"}</td>}
      <td>{(confirmed) ? <i className='fa fa-2x fa-check-circle text-success'/> :
        <i className='fa fa-2x fa-clock-o text-warning' style={{padding: '5%'}}/>}
      </td>
      <th>
        {user.role === 'walker' && <button className='btn btn-outline-success btn-actions'
                                           disabled={confirmed}
                                           onClick={(assigned) ?
                                             () => handleConfirmReservation(reservationId) :
                                             () => handleAcceptReservation(reservationId)}
        >Accept
        </button>}
        {user.role === 'walker' && assigned && <button className='btn btn-outline-danger btn-actions'
                                                       disabled={confirmed}
        >
          Reject
        </button>}
        {user.role === 'owner' && <button className='btn btn-outline-danger btn-actions'
                                          disabled={confirmed}
                                          onClick={() => handleCancelReservation(reservationId)}
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
      {console.log(reservationsUnassigned, reservationsAssigned)}
      {(reservationsAssigned.length !== 0) ? <th colSpan={7}>Assigned Reservations</th> :
        <th colSpan={7}>There are no assigned reservations </th>}
      {(reservationsAssigned.length !== 0) ? reservationsAssigned.map(r => row(r, true)) : ''}
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

  const handleConfirmReservation = async (reservationId) => {
    const data = await confirmReservation(user.id, reservationId);
    if (data) {
      const updatedReservations = reservationsAssigned.map(r => r.id === reservationId ? setTrue(r, 'confirmed') : r);
      setReservationsAssigned(updatedReservations)
    }
  };

  const handleAcceptReservation = async (id) => {
    const data = await acceptReservation(id, user.name);
    if (data) {
      setReservationsUnassigned(reservationsUnassigned.filter(r => r.id !== id));
      setReservationsAssigned([...reservationsAssigned, data]);
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
