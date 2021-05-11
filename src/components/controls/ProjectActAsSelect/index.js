import React from "react";
import Select from "../Select";
import PropTypes from "prop-types";

function ProjectActAsSelect({
  project,
  isPublic,
  registrationTier,
  setPublic,
  setRegistrationTier,
}) {
  /* Provides a select component so that a project admin can view the project as a user type. */
  let options = project.tiers.map((tier) => {
    return { value: tier.id, label: tier.title };
  });
  const publicObject = { value: "public", label: "Public" };
  options.unshift(publicObject);
  const yourselfObject = { value: null, label: "Yourself" };
  options.unshift(yourselfObject);

  function handleChange(obj) {
    // Set the value for selected and clear the other values appropriately.
    if (obj === null) {
      setPublic(false);
      setRegistrationTier(null);
    } else if (obj.value === "public") {
      setPublic(true);
      setRegistrationTier(null);
    } else {
      setPublic(false);
      setRegistrationTier(obj.value);
    }
  }

  function getDefaultValue() {
    // Check if there's a value already selected.
    if (isPublic) {
      return publicObject;
    } else if (registrationTier) {
      const registrationTierObject = project.tiers.find(
        (tier) => tier.id === registrationTier
      );
      return {
        value: registrationTierObject.id,
        label: registrationTierObject.title,
      };
    } else {
      return yourselfObject;
    }
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      defaultValue={getDefaultValue()}
    />
  );
}

ProjectActAsSelect.propTypes = {
  // The project that we're rendering the act as dropdown for.
  project: PropTypes.object.isRequired,

  // Determines if we're currently viewing as public.
  isPublic: PropTypes.bool.isRequired,

  // Determines if we're currently viewing as a registration tier.
  registrationTier: PropTypes.number,

  // Action to toggle viewing as a public user.
  setPublic: PropTypes.func.isRequired,

  // Action to set a registration tier that we're viewing as.
  setRegistrationTier: PropTypes.func.isRequired,
};

export default ProjectActAsSelect;
