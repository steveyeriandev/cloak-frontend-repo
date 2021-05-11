export function setFieldErrors(action, setError) {
  /* Renders the field errors from the action response from server.

    :param action: The redux action returned.
    :param setError: The set error action for the react hook form.
  */
  if (typeof action.payload.data === "object" && action.payload.data !== null) {
    for (let fieldKey in action.payload.data) {
      setError(fieldKey, {
        type: "manual",
        message: action.payload.data[fieldKey],
      });
    }
  }
}
