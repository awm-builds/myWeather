import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      {/* <Link to="/orders/new">New Order</Link> */}
      &nbsp;&nbsp;
      <span>{new Date().toLocaleString()}</span>
      &nbsp; | &nbsp;<Link to="/AuthPage" onClick={handleLogOut}>Log In</Link>
    </nav>
  );
}