import React, { useState, useEffect } from "react";
import axios from "axios";
import ActionResponse from "../ActionResponse/ActionResponse";
import { Button, Form } from "react-bootstrap";
import {
  GET_EXERCISES_ENDPOINT,
  UPDATE_EXERCISE_ENDPOINT,
} from "../../utilitites/apiConstants";
import "./EditWorkout.scss";

const EditWorkout = (props) => {
  const [state, setState] = useState({
    workoutLoaded: false,
    workoutUpdated: null,
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  // Get selected workout
  useEffect(() => {
    axios
      .get(`${GET_EXERCISES_ENDPOINT}/${props.id}`)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          workoutLoaded: true,
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        }));
      })
      .catch((err) => console.log(err));
  }, [props.id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();

    // Get completed form data from state
    const { username, description, duration, date, users } = state;

    // Create exercise object to be submitted to database
    const exercise = {
      username,
      description,
      duration: parseInt(duration),
      date,
      users,
    };

    axios
      .post(`${UPDATE_EXERCISE_ENDPOINT}/${props.id}`, exercise)
      .then((res) => {
        // Handle success
        setState((prev) => ({
          ...prev,
          workoutUpdated: true,
          workoutUpdatedSuccess: res.data,
        }));
      })

      // Handle errors
      .catch((err) => {
        setState((prev) => ({
          ...prev,
          workoutUpdated: false,
          workoutUpdateErr: err.response.data,
        }));
      });
  };

  return (
    <div className="edit-workout">
      <h2>Edit Workout</h2>

      <Form className="edit-workout__form" onSubmit={hanldeSubmit}>
        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name={"username"}
            value={state.username}
            onChange={onChange}
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Text className="text-muted">Edit workout description</Form.Text>
          <Form.Control
            type="text"
            placeholder="Enter workout description"
            name={"description"}
            value={state.description}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration</Form.Label>
          <Form.Text className="text-muted">
            Edit workout duration (mins)
          </Form.Text>
          <Form.Control
            type="number"
            name={"duration"}
            value={state.duration}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Text className="text-muted">Edit workout date</Form.Text>
          <Form.Control
            type="date"
            name={"date"}
            value={state.date}
            onChange={onChange}
          />
        </Form.Group>
        <Button href={`/`} variant="secondary">
          Cancel
        </Button>{" "}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {state.workoutUpdatedSuccess && (
        <div className="edit-workout__response">
          <ActionResponse
            alertType="success"
            headingText="Success!"
            bodyText="Workout updated"
            buttonText="Close"
          />
        </div>
      )}

      {state.workoutUpdateErr && (
        <div className="edit-workout__response">
          <ActionResponse
            alertType="danger"
            headingText="Success!"
            bodyText={state.workoutUpdateErr}
            buttonText="Close"
          />
        </div>
      )}
    </div>
  );
};

export default EditWorkout;
