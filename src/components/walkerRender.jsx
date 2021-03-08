import React from 'react';
import WalkerDetails from "./walkerDetails";

function WalkerRender({data}) {
  return ((data) ? <WalkerDetails data = {data}/> : <h1>Select a walker</h1>)
}

export default WalkerRender;
