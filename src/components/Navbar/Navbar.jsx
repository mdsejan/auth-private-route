import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then(() => console.log("loged out success"));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="mr-2">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className="mr-2">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <>
      <navbar className="bg-base-100 sticky top-0">
        <div className=" max-w-screen-2xl mx-auto navbar ">
          <div className="navbar-start ">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navLinks}
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl">Email Auth</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <span>{user.email} </span>
                {!user.email && <span>{user.displayName} </span>}
                <a
                  onClick={handleLogOut}
                  className="btn btn-sm capitalize ml-5"
                >
                  Sign Out
                </a>
              </>
            ) : (
              <Link className="btn btn-sm" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </navbar>
    </>
  );
};

export default Navbar;
