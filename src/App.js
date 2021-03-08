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

function App() {

  toast.configure();
  const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <div>
      <ToastContainer/>
      <NavBar user={user} setUser={setUser}/>
      <Route path='/profile' render={(props) => {
        return user ? <Profile user = {user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/dogs' render={(props) => {
        return user ? <DashboardDogs user = {user}/> : <Redirect to='/login'/>
      }}/>
      <Route path='/walkers' render={(props) => {
        return user ? <DashboardWalkers/> : <Redirect to='/login'/>
      }}/>
      <Route path='/registration' component={Registration}/>
      <Route path='/login' render={(props) => (
        <LoginForm {...props} setUser={setUser}/>
      )}/>
    </div>
  );
}

export default App;
