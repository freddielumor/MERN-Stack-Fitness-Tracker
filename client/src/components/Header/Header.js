import React from "react";
import { Link } from "@reach/router";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <Link className="" to="/">
        <h1 className="title">MERN Fitness Tracker</h1>
      </Link>

      <nav className="nav">
        <Link className="nav__link" to="/">
          Home
        </Link>
        <Link className="nav__link" to="/add">
          Add Workout
        </Link>
        <Link className="nav__link" to="/user">
          Add User
        </Link>
      </nav>
    </header>
  );
}
