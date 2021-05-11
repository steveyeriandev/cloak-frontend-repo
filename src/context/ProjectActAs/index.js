import React from "react";

// Provides context for a project owner to view their project as a registration tier or public.
const ProjectActAsContext = React.createContext({
  registrationTier: null,
  public: false,
  setRegistrationTier: () => {},
  toggleUsePublic: () => {},
});

export default ProjectActAsContext;
