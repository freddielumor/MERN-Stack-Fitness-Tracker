import React from "react";
import { Button } from "react-bootstrap";

const Workout = ({ exercise, deleteExercise, id }) => {
  return (
    <tr key={id}>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date && exercise.date.substring(0, 10)}</td>
      <td>
        <Button href={`/edit/${exercise._id}`} variant="secondary">
          edit
        </Button>{" "}
        <Button variant="danger" onClick={() => deleteExercise(exercise._id)}>
          delete
        </Button>{" "}
      </td>
    </tr>
  );
};

export default Workout;
