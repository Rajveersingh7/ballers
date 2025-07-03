import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm pl-7 pr-4">
      <div className="flex-1">
        <Link to="/" id="spfont" className="text-3xl text-lime-400">
          Ballers
        </Link>
      </div>
      <div className="flex-none mr-1">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/create"
              className="btn btn-ghost p-2 bg-lime-400 rounded-full text-black"
            >
              <span className="material-symbols-outlined text-4xl">add</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {!isLoggedIn ? (
          <>
            <Link
              to="/signup"
              className="btn btn-ghost bg-lime-400 text-slate-800 rounded-4xl mr-2 text-[14px]"
            >
              <p>Signup</p>
            </Link>
            <Link
              to="/login"
              className="btn btn-ghost bg-lime-400 text-slate-800 rounded-4xl mr-2 text-[14px]"
            >
              <p>Login</p>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="btn btn-ghost bg-lime-400 text-slate-800 rounded-4xl mr-2 text-[14px]"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
