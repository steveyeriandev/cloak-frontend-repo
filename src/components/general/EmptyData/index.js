import React from "react";

function EmptyDataDisplay(props) {
  /* Displays a message to the user letting them know that the section they're looking at does not
     have any data.
  */
  return <h5 className="m-4 text-center w-100">{props.children}</h5>;
}

export default EmptyDataDisplay;
