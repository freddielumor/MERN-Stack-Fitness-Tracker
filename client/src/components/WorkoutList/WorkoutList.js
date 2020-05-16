import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import Workout from "../Workout/Workout";
import ActionResponse from "../ActionResponse/ActionResponse";
import {
  GET_EXERCISES_ENDPOINT,
  DELETE_EXERCISE_ENDPOINT,
} from "../../utilitites/apiConstants";
import "./WorkoutList.scss";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutsLoaded, setWorkoutsLoaded] = useState(false);
  const [workoutDeletedSuccess, setWorkoutDeletedSuccess] = useState(null);
  const [workoutDeletedErr, setWorkoutDeletedErr] = useState(null);

  useEffect(() => {
    axios
      .get(GET_EXERCISES_ENDPOINT)
      .then((res) => {
        setWorkouts(res.data);
        setWorkoutsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Delete selected exercise
  const deleteWorkout = (id) => {
    axios
      .delete(`${DELETE_EXERCISE_ENDPOINT}/${id}`)

      .then((res) => {
        // Handle success
        setWorkoutDeletedSuccess(res.data);
        setWorkouts(workouts.filter((workout) => workout._id !== id));
      })

      // Handle errors
      .catch((err) => {
        setWorkoutDeletedErr(err.response.data);
      });
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

  // Inform user if no workouts stored in db
  const noWorkouts = () => {
    return (
      <div className="workout-list__no-workouts">
        <h2>No workouts stored.</h2>

        <p>Please add a new workout</p>
      </div>
    );
  };

  // Loading spinner
  if (!workoutsLoaded) {
    return (
      <Spinner
        animation="border"
        variant="primary"
        className="workout-list__spinner"
      />
    );
  }

  return (
    <div className="workout-list">
      <h2>Workout Log</h2>

      {/* Render loading spinner or workout log */}
      {workouts < 1 ? (
        noWorkouts()
      ) : (
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
      )}

      {workoutDeletedSuccess && (
        <div className="workout-list__response">
          <ActionResponse
            alertType="success"
            headingText="Success!"
            bodyText="Workout deleted"
            buttonText="Close"
          />
        </div>
      )}

      {workoutDeletedErr && (
        <div className="workout-list__response">
          <ActionResponse
            alertType="danger"
            headingText="Error!"
            bodyText={workoutDeletedErr}
            buttonText="Close"
          />
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
