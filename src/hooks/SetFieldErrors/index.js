function setFieldErrors(setError) {
  /* Sets the field errors for a form.

     :param setError func: The function from useForm to set field errors.
  */

  function _setFieldErrors(data) {
    /* Applies the response data to the field errors with the setError fucntion.

       :param data: The error data that was returned from the response or action.
    */
    if (typeof data === "object" && data !== null) {
      for (let fieldKey in data) {
        setError(fieldKey, {
          type: "manual",
          message: data[fieldKey],
        });
      }
    }

    return null;
  }

  return _setFieldErrors;
}

export default setFieldErrors;
