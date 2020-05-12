import React from "react";
import { Link } from "@reach/router";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <h1 className="title">MERN Fitness Tracker</h1>

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
    </header>
  );
}
