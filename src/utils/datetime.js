// General functions for datetimes.

import moment from "moment";

export function militaryToDisplay(timeStr) {
  // Receives a string time (i.e. 22:00:00) and returns the display in am/pm.
  return moment(timeStr, "HH:mm:ss").format("h:mm a");
}
