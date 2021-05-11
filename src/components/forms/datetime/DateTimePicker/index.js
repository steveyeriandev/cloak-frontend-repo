import React from "react";
import DateTime from "react-datetime";
import moment from "moment";

function DateTimePicker(props) {
  // Standard component for picking a date and time.
  return <DateTime {...props} value={moment(props.value)} />;
}

export default DateTimePicker;
