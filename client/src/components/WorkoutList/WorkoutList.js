import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Workout from "../Workout/Workout";
import {
  GET_EXERCISES_ENDPOINT,
  DELETE_EXERCISE_ENDPOINT,
} from "../../utilitites/apiConstants";
import "./WorkoutList.scss";

const WorkoutList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(GET_EXERCISES_ENDPOINT)
      .then((res) => {
        setExercises(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Delete selected exercise
  const deleteExercise = (id) => {
    axios
      .delete(`${DELETE_EXERCISE_ENDPOINT}/${id}`)
      .then((res) => console.log(res.data));

    setExercises(exercises.filter((exercise) => exercise._id !== id));
  };

  const workoutList = () => {
    return exercises.map((currentExercise) => {
      return (
        <Workout
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
          id={currentExercise._id}
        />
      );
    });
  };

  return (
    <div className="workout-list">
      <h2>Workout Log</h2>

      <Table className="workout-list__form" striped responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{workoutList()}</tbody>
      </Table>
    </div>
  );
};

export default WorkoutList;
