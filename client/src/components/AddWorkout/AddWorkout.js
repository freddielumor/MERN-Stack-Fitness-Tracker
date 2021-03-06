import React, { useState, useEffect } from "react";
import axios from "axios";
import ActionResponse from "../ActionResponse/ActionResponse";
import { Button, Form } from "react-bootstrap";
import {
  GET_USERS_ENDPOINT,
  CREATE_EXERCISE_ENDPOINT,
} from "../../utilitites/apiConstants";
import "./AddWorkout.scss";

const AddWorkout = () => {
  const [state, setState] = useState({
    userLoaded: null,
    workoutAdded: null,
    workoutAddedSuccess: null,
    workoutAddedErr: null,
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios.get(GET_USERS_ENDPOINT).then((res) => {
      if (res.data.length > 0) {
        setState((prev) => ({
          ...prev,
          userLoaded: true,
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        }));
      }
    });
  }, []);

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
      .post(CREATE_EXERCISE_ENDPOINT, exercise)

      .then((res) => {
        // Handle success
        setState((prev) => ({
          ...prev,
          workoutAdded: true,
          workoutAddedSuccess: res.data,
        }));
      })

      // Handle errors
      .catch((err) => {
        setState((prev) => ({
          ...prev,
          workoutAdded: false,
          workoutAddedErr: err.response.data,
        }));
      });
  };

  return (
    <div className="add-workout">
      <h2>Add New Workout</h2>

      <Form className="add-workout__form" onSubmit={hanldeSubmit}>
        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Text className="text-muted">Select user</Form.Text>
          <Form.Control
            as="select"
            placeholder="Enter name"
            name={"username"}
            value={state.username}
            onChange={onChange}
          >
            {state.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Text className="text-muted">Add workout description</Form.Text>
          <Form.Control
            type="text"
            placeholder="E.g. Sprints"
            name={"description"}
            value={state.description}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration</Form.Label>
          <Form.Text className="text-muted">
            Enter workout duration (mins)
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
          <Form.Text className="text-muted">Select workout date</Form.Text>
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

      {state.workoutAddedSuccess && (
        <div className="edit-workout__response">
          <ActionResponse
            alertType="success"
            headingText="Success!"
            bodyText="Workout updated"
            buttonText="Close"
          />
        </div>
      )}

      {state.workoutAddedErr && (
        <div className="edit-workout__response">
          <ActionResponse
            alertType="danger"
            headingText="Success!"
            bodyText={state.workoutAddedErr}
            buttonText="Close"
          />
        </div>
      )}
    </div>
  );
};

export default AddWorkout;
