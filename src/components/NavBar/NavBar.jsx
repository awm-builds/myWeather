import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time immediately
    setCurrentTime(new Date());
    
    // Set up interval to update time every minute (60000ms)
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
<nav className="navbar navbar-inverse navBar">
    <div className="container-fluid">
      <div className="navbar-header">    
        <section className="navbar-brand">
            <img className="navLogo" src={require('../../img/myWeatherLogo.png')}/>
            <Link className="homeLink" to="/">myWeather</Link>
          </section>
      </div>
    <ul className="nav navbar-nav">
      <li className="nav nav-bar navbar-center navDate">{currentTime.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })}</li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
        { user ?
          <li className="inOutLink">< Link to="/" onClick={handleLogOut}>Log Out</Link></li>
          :
          <li className="inOutLink">< Link to="/AuthPage">Log In</Link></li>}
    </ul>
  </div>
</nav>
  );
}