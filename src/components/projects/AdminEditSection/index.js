import React from "react";
import Alert from "react-bootstrap/Alert";

function ProjectAdminEditSection(props) {
  // Provides a section shown to project admins for editting the project.
  return (
    <Alert variant="light" className="border" {...props}>
      {props.children}
    </Alert>
  );
}

export default ProjectAdminEditSection;
