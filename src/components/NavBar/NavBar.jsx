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
            <Link className="homeLink" to="/">myWeather</Link>
          </section>
      </div>
    <ul className="nav navbar-nav">
      <li className="nav nav-bar navbar-center navDate">{new Date().toLocaleString()}</li>
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