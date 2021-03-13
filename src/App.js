import {Route, Redirect} from 'react-router-dom'
import React, {useState} from "react";

import DashboardWalkers from "./components/dashboardWalkers";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Registration from "./components/registration";
import Profile from "./components/profile";
import {toast, ToastContainer} from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css"
import 'react-widgets/dist/css/react-widgets.css';
import "react-toastify/dist/ReactToastify.css"
import 'font-awesome/css/font-awesome.css'
import './App.css';
import DashboardDogs from "./components/dashboardDogs";
import Reservations from "./reservations";


function App() {
  toast.configure();

  const [user, setUser] = useState('');
  console.log(user);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser('');
  };

  return (
    <div>
      <ToastContainer/>
      <NavBar user={user} logout={handleLogout}/>
      <Route path='/profile' render={(props) => {
        return user ? <Profile user = {user}/> : <Redirect to='/login'/>
      }}/>
      <Route exact path='/dogs' render={(props) => {
        return user ? <DashboardDogs history = {props.history} user = {user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/walkers' render={(props) => {
        return user ? <DashboardWalkers user = {user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/walker-reservations' render={(props) => {
        return user.role === 'walker' ? <Reservations user = {user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/owner-reservations' render={(props) => {
        return user.role === 'owner' ? <Reservations user = {user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/registration' component={Registration}/>
      <Route path='/login' render={(props) => (
        <LoginForm {...props} handleLogin = {handleLogin}/>
      )}/>
    </div>
  );
}

export default App;
