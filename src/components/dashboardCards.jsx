import React, {useState,useEffect} from 'react';
import WalkerCard from "./walkerCard";
import WalkerDetails from "./walkerDetails";

import {getWalkers} from '../utils/services'


function DashboardCards(props) {
  const [walkers, setWalkers] = useState([]);

  useEffect(async () => {
    const {data} = await getWalkers();
    setWalkers(data);
    console.log(data);
  }, []);

  return (
    <div className="App row">
      <div className="col-4">
        <WalkerDetails/>
      </div>
      <div className="col-8">
        <div className="card-deck">
          {walkers.map(card => <WalkerCard/>)}
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
