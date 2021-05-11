import React from "react";
import DateTime from "react-datetime";
import moment from "moment";

function TimePicker(props) {
  // Standard component for picking a time.

  function toRepresentation(time) {
    // Convert the time from server to the representation display on frontend.
    return moment(time, ["h:mm a", "HH:mm:ss"]).format("h:mm a");
  }

  return (
    <DateTime
      renderInput={(props) => {
        // There is a bug when clearing the controlled value, the input still shows the previous
        // value - so, we ahve to do a custom render.
        // https://stackoverflow.com/questions/46053202/how-to-clear-the-value-entered-in-react-datetime
        return (
          <input
            {...props}
            value={props.value ? toRepresentation(props.value) : null}
          />
        );
      }}
      initialViewDate={toRepresentation(props.initialValue)}
      dateFormat={false}
      setViewDate={(date) => null}
      timeFormat="h:mm a"
      initialViewMode="time"
      closeOnSelect={true}
      {...props}
    />
  );
}

export default TimePicker;
