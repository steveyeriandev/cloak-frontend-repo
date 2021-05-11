import React from "react";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";

import { getUserImage } from "utils/users";

function useProfileImage(props) {
  // Return an image object for the user.
  const user = useSelector((state) => state.account.user);

  // For now we'll just limit to 25px, but might pass it in later.
  return (
    <Image src={getUserImage(user)} alt="" style={{ width: 25 }} {...props} />
  );
}

export default useProfileImage;
