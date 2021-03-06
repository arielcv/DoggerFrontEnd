import {Route} from 'react-router-dom'
import React,{useState} from "react";

import DashboardCards from "./components/dashboardCards";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Registration from "./components/registration";

import "bootstrap/dist/css/bootstrap.min.css"
import 'react-widgets/dist/css/react-widgets.css';
import 'font-awesome/css/font-awesome.css'
import './App.css';

function App() {

  const [user,setUser] = useState(localStorage.getItem('user'))
  // const [user, setUser] = useState('Ariel')
  return (
    <div>
      <NavBar user = {user}/>
      <Route path = '/walkers' component = {DashboardCards} />
      <Route path = '/registration' component = {Registration}/>
      <Route path = '/login' component = {LoginForm}/>
    </div>
  );
}

export default App;
