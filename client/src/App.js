import React from "react";
import { Router } from "@reach/router";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import EditExercise from "./components/EditExercise/EditExercise";
import CreateExercise from "./components/CreateExercise/CreateExercise";
import CreateUser from "./components/CreateUser/CreateUser";
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
          <EditExercise path="/edit/:id" />
          <CreateExercise path="/create" />
          <CreateUser path="/user" />
        </Router>
      </main>
    </div>
  );
}

export default App;
