import {Route, Redirect} from 'react-router-dom'
import React, {useState, useEffect} from "react";

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
import Reservations from "./components/reservations";
import {getProfileDetails} from "./utils/services";


function App() {
  toast.configure();

  const getData = async () => {
    const user = localStorage.getItem('user');
    const data = await getProfileDetails(user);
    console.log(data);
    return (data) ? data : false
  };

  const [user, setUser] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('Authorization');
    setUser('');
  };

  useEffect(async () => {
    const response = await getData();
    (response) ? setUser(response) : setUser('')
  }, []);

  return (
    <div>
      <ToastContainer/>
      <NavBar user={user} logout={handleLogout}/>
      <Route path='/profile' render={(props) => {
        return user ? <Profile user={user} handleLogin = {handleLogin}/> : <Redirect to='/login'/>
      }}/>
      <Route exact path='/dogs' render={(props) => {
        return user ? <DashboardDogs history={props.history} user={user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/walkers' render={(props) => {
        return user ? <DashboardWalkers user={user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/walker-reservations' render={(props) => {
        return user.role === 'walker' ? <Reservations user={user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/owner-reservations' render={(props) => {
        return user.role === 'owner' ? <Reservations user={user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/registration' render={(props) => {
        return (user) ? <Profile user={user}/> : <Registration{...props}/>
      }}/>
      <Route path='/login' render={(props) => {
        return (user) ? <Redirect to='/profile'/> : <LoginForm {...props} handleLogin={handleLogin}/>
      }}/>
    </div>
  );
}

export default App;
