import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./CreateUser.scss";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  console.log("username", username);

  const onChangeUsername = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();

    // Create user object to be submitted to database
    const user = {
      username,
    };

    console.log("user", user);

    // Clear input after submit
    setUsername("");
  };

  return (
    <div className="create-user">
      <h2>Add New User</h2>

      <Form className="create-user__form" onSubmit={hanldeSubmit}>
        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new username"
            name={"username"}
            value={username}
            onChange={onChangeUsername}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
