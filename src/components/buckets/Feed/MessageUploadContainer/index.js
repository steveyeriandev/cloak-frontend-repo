import React from "react";
import FeedMessageForm from "components/forms/FeedMessage";

function MessageUploadContainer(props) {
  // Container that handles the functionality for a teacher to upload a new message to bucket.
  return (
    <div {...props}>
      <FeedMessageForm />
    </div>
  );
}

export default MessageUploadContainer;
