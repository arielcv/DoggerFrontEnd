import React, {useState, useEffect} from 'react';
import WalkerCard from "./walkerCard";
import WalkerDetails from "./walkerDetails";

import {getWalkers} from '../utils/services'


function DashboardCards(props) {
  const [walkers, setWalkers] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState(null);

  useEffect(async () => {
    const {data} = await getWalkers();
    setWalkers(data);
    console.log(data);
  }, []);

  const handleSelection = (data) => {
    setSelectedWalker(data)
  };

  return (
    <div className="App row">
      <div className="col-4">
        <WalkerDetails data={selectedWalker}/>
      </div>
      <div className="col-8">
        <div className="card-deck">
          {walkers.map(data => <WalkerCard
              key={data.user}
              data={data}
              handleSelection={() => handleSelection(data)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
