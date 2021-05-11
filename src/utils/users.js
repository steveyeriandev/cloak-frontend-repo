import DefaultUserImage from "images/profile-generic.jpg";

export function getUserImage(user) {
  return user.image || user.socialImage || DefaultUserImage;
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function userHasSocial(user) {
  // Determines if the user has some social link, determined by their user data.
  return (
    user.facebook !== "" ||
    user.instagram !== "" ||
    user.twitter !== "" ||
    user.linkedin !== ""
  );
}

export function getFullName(user) {
  return `${user.firstName} ${user.lastName}`;
}
