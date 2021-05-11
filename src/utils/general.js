export function getKeyByValue(object, value) {
  // Returns the key of an object by searching the value.
  return Object.keys(object).find((key) => object[key] === value);
}

export function getObjectByValue(object, value) {
  /* Returns the full object by searching the value.

     :param object Object: Typically an enum object that we're getting the full object of.
     :param value: Typically the integer value of an enum object.
  */
  const key = Object.keys(object).find((key) => object[key] === value);
  return { value, label: toTitleCase(key) };
}

export function toTitleCase(str) {
  // Returns a string in title case.
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertEnumToArray(enumObject) {
  // Takes an enum and converts it to an array of objects with id/label
  return Object.entries(enumObject).map((obj) => ({
    value: obj[1],
    label: toTitleCase(obj[0]),
  }));
}

export function getErrorMessage(data, defaultMessage) {
  /* Receives response data and parses it to return the error message to show.

     :param data object: The response data that was returned from server.
     :param defaultMessage string (optional): A default message if no error message can be determined.
  */
  if (typeof data !== "object") return defaultMessage;

  if ("nonFieldErrors" in data) return data.nonFieldErrors;
  else if ("detail" in data) return data.detail;
  else return defaultMessage;
}

export function openInNewTab(url) {
  // Sends the user to a url in a new tab
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
}

export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function appendUrlParameters(url, parameters) {
  /* Appends url parameters to a url, used for filtering endpoints.

     :return: A string url, with the parameters tacked on.
  */
  Object.keys(parameters).forEach((key, index) => {
    const symbol = index === 0 ? "?" : "&";
    url += `${symbol}${camelToSnakeCase(key)}=${parameters[key]}`;
  });

  return url;
}
