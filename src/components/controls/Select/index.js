import React from "react";
import ReactSelect from "react-select";

function Select(props) {
  return <ReactSelect {...props}>{props.children}</ReactSelect>;
}

export default Select;
