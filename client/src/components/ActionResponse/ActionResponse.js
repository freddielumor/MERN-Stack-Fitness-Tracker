import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import "./ActionResponse.scss";

const ActionResponse = ({ alertType, headingText, bodyText, buttonText }) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Alert variant={alertType} show={isVisible} className="action-response">
      <Alert.Heading>{headingText}</Alert.Heading>
      <p>{bodyText}</p>
      <hr />
      <div className="d-flex action-response__button">
        <Button
          onClick={() => setIsVisible(false)}
          variant={`outline-${alertType}`}
        >
          {buttonText}
        </Button>
      </div>
    </Alert>
  );
};

export default ActionResponse;
