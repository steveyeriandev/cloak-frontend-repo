import React from "react";

function ModalSubheader(props) {
  // A secondary header for a modal to give some extra context to the user.
  return <p className="text-muted text-center">{props.children}</p>;
}

export default ModalSubheader;
