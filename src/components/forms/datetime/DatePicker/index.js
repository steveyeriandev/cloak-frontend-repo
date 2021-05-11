import React from "react";
import DateTime from "react-datetime";

function DatePicker(props) {
  // Standard component for picking a date.
  return (
    <DateTime
      timeFormat={false}
      dateFormat="YYYY-MM-DD"
      closeOnSelect={true}
      {...props}
    />
  );
}

export default DatePicker;
