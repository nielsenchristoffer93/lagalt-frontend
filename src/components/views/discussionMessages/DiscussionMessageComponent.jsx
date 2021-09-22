import React from "react";
import "./DiscussionMessageComponent.css";
import moment from "moment";
import { Row } from "react-bootstrap";
import { getTimeSinceCreation } from "../../../services/timeFormatter"


const DiscussionMessageComponent = ({ name, message, timestamp }) => {



  return (

    <div className="comment-thread">
      <details open className="comment">
        <div className="comment-border-link">
          <span className="sr-only"></span>
        </div>
        <summary>
          <Row>
            <Row>
              <p>{name} &bull; <span>{getTimeSinceCreation(timestamp)}</span></p>
            </Row>
          </Row>
          {/*<div className="comment-info">
            <a href="#" className="comment-author">{name}</a>
            <p className="m-0"> comment posted
            &bull;  {getTimeSinceCreation(timestamp)}
            </p>
  </div>*/}
        </summary>

        <div className="comment-body">
          <p>
            {message}
          </p>
          <hr />
        </div>

      </details>

  </div>
  )
};





export default DiscussionMessageComponent


