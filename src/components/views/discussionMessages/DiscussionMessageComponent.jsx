import "./DiscussionMessageComponent.css";
import React from "react";
import { Row } from "react-bootstrap";
import { getTimeSinceCreation } from "../../../services/timeFormatter";

const DiscussionMessageComponent = ({ name, message, timestamp }) => {
  return (
    <div className="comment-thread">
      <details open className="comment">
        <div className="comment-border-link">
          <span className="sr-only"/>
        </div>
        <summary>
          <Row>
            <Row>
              <p>
                {name} &bull; <span>{getTimeSinceCreation(timestamp)}</span>
              </p>
            </Row>
          </Row>
        </summary>

        <div className="comment-body">
          <p>{message}</p>
          <hr />
        </div>
      </details>
    </div>
  );
};

export default DiscussionMessageComponent;
