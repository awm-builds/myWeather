import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navBar">
      <Link to="/">Home</Link>
      &nbsp;&nbsp;&nbsp;
      {/* <Link to="/orders/new">New Order</Link> */}
      &nbsp;&nbsp;&nbsp;
      <span>{new Date().toLocaleString()}</span>
      &nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;
      <span>{ user ?
          < Link to="/" onClick={handleLogOut}>Log Out</Link> 
          :
          < Link to="/AuthPage">Log In</Link>}</span>
    </nav>
  );
}