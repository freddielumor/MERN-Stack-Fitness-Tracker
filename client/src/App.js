import React from "react";
import { Router } from "@reach/router";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import EditWorkout from "./components/EditWorkout/EditWorkout";
import AddWorkout from "./components/AddWorkout/AddWorkout";
import AddUser from "./components/AddUser/AddUser";
import "./utilitites/normalize.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Router>
          <Home path="/" />
          <EditWorkout path="/edit/:id" />
          <AddWorkout path="/add" />
          <AddUser path="/user" />
        </Router>
      </main>
    </div>
  );
}

export default App;
