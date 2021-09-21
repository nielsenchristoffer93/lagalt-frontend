import React from "react";
import "./DiscussionMessageComponent.css";
import moment from "moment";


const DiscussionMessageComponent = ({ name, message, timestamp }) => {

  // const dateTimeAgo = moment("2021-09-02 10:04:50").fromNow(); //temporary solution



  return (

    <div class="comment-thread">
      <details open class="comment" id="comment-1">
        <a href="#comment-1" class="comment-border-link">
          <span class="sr-only"></span>
        </a>
        <summary>

          <div class="comment-info">
            <a href="#" class="comment-author">{name}</a>
            <p class="m-0"> comment posted
            &bull;  {timestamp}
            </p>
          </div>
        </summary>

        <div class="comment-body">
          <p>
            {message}
          </p>
          <hr />

        </div>

      </details>

    </div>

  );
};





export default DiscussionMessageComponent


