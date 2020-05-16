import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { CREATE_USER_ENDPOINT } from "../../utilitites/apiConstants";
import "./AddUser.scss";

const AddUser = () => {
  const [username, setUsername] = useState("");

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

    axios.post(CREATE_USER_ENDPOINT, user).then((res) => console.log(res.data));

    // Clear input after submit
    setUsername("");
  };

  return (
    <div className="add-user">
      <h2>Add New User</h2>

      <Form className="add-user__form" onSubmit={hanldeSubmit}>
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

export default AddUser;
