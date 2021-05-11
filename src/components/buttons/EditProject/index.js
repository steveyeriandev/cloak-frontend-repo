import React from "react";
import Button from "react-bootstrap/Button";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import ClickableFontAwesomeIcon from "components/icons/ClickableIcon";

function EditProjectButton(props) {
  return (
    <Button size="sm" variant="white" className="mr-2" {...props}>
      <ClickableFontAwesomeIcon icon={faPencilAlt} />
    </Button>
  );
}

export default EditProjectButton;
