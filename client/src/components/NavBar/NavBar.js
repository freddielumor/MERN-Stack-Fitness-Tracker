import React from "react";
import { Link } from "@reach/router";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="nav">
      <Link className="nav__link" to="/">
        Home
      </Link>
      <Link className="nav__link" to="/create">
        Add Workout
      </Link>
      <Link className="nav__link" to="/edit/:id">
        Edit Workout
      </Link>
      <Link className="nav__link" to="/user">
        Account
      </Link>
    </nav>
  );
};

export default NavBar;
