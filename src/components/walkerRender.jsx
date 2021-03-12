import React from 'react';
import WalkerDetails from "./walkerDetails";

function WalkerRender({data, dogs, walker, selection}) {
  return ((data) ? <WalkerDetails data = {data} dogs ={dogs} walker = {walker} selection = {selection}/> : <h1 className='card card-header' style={{margin:'5% 0'}}>Select a walker</h1>)
}

export default WalkerRender;
