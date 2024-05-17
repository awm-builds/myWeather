import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
<nav className="navbar navbar-inverse navBar">
    <div className="container-fluid">
      <div className="navbar-header">    
        <section className="navbar-brand">
            <Link to="/">myWeather</Link>
          </section>
      </div>
    <ul className="nav navbar-nav">
      <li className="nav nav-bar navbar-center">{new Date().toLocaleString()}</li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
        { user ?
          <li className="glyphicon glyphicon-log-out">< Link to="/" onClick={handleLogOut}>Log Out</Link></li>
          :
          <li className="glyphicon glyphicon-log-in">< Link to="/AuthPage">Log In</Link></li>}
    </ul>
  </div>
</nav>
  );
}