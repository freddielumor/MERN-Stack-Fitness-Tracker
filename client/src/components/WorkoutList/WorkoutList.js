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
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get(GET_EXERCISES_ENDPOINT)
      .then((res) => {
        setWorkouts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Delete selected exercise
  const deleteWorkout = (id) => {
    axios
      .delete(`${DELETE_EXERCISE_ENDPOINT}/${id}`)
      .then((res) => console.log(res.data));

    setWorkouts(workouts.filter((workout) => workout._id !== id));
  };

  const workoutLog = () => {
    return workouts.map((currentExercise) => {
      return (
        <Workout
          exercise={currentExercise}
          deleteWorkout={deleteWorkout}
          key={currentExercise._id}
          id={currentExercise._id}
        />
      );
    });
  };

  return (
    <div className="workout-list">
      <h2>Workout Log</h2>

      <Table className="workout-list__log" striped responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{workoutLog()}</tbody>
      </Table>
    </div>
  );
};

export default WorkoutList;
