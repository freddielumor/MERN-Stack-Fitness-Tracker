import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import {
  GET_EXERCISES_ENDPOINT,
  UPDATE_EXERCISE_ENDPOINT,
} from "../../utilitites/apiConstants";
import "./EditExercise.scss";

const EditExercise = (props) => {
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  // Get all exercises
  useEffect(() => {
    axios.get(GET_EXERCISES_ENDPOINT).then((res) => {
      if (res.data.length > 0) {
        setState((prev) => ({
          ...prev,
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        }));
      }
    });

    // Get single exercise
    axios
      .get(`${GET_EXERCISES_ENDPOINT}/${props.id}`)
      .then((res) => {
        setState((prev) => ({
          ...prev,
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
      .then((res) => console.log(res.data));
  };

  return (
    <div className="edit-exercise">
      <h2>Edit Workout</h2>

      <Form className="create-exercise__form" onSubmit={hanldeSubmit}>
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
    </div>
  );
};

export default EditExercise;
