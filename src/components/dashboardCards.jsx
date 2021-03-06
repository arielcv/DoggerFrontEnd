import React from 'react';
import WalkerCard from "./walkerCard";
import WalkerDetails from "./walkerDetails";

function DashboardCards(props) {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="App row">
      <div className="col-4">
        <WalkerDetails/>
      </div>
      <div className="col-8">
        <div className="card-deck">
          {cards.map(card => <WalkerCard/>)}
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
