import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/menu">Menu</Link>
      &nbsp; | &nbsp;
      {/* <Link to="/orders/new">New Order</Link> */}
      &nbsp;&nbsp;
      <span>DAY, DD MONTH, Time {/* user.name */}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>SIGN IN</Link>
    </nav>
  );
}