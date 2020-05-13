import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./CreateExercise.scss";

const CreateExercise = () => {
  const [state, setState] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      username: "fred",
      users: ["fred"],
    }));
  }, []);

  console.log("username", state.username);
  console.log("description", state.description);
  console.log("duration", state.duration);
  console.log("date", state.date);
  console.log("users", state.users);

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

    console.log("exercise", exercise);

    // Go home after submit
    // window.location = "/";
  };

  return (
    <div className="create-exercise">
      <h2>Add New Workout</h2>

      <Form className="create-exercise__form" onSubmit={hanldeSubmit}>
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateExercise;
