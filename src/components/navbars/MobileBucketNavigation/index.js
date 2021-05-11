import React from "react";
import { useSelector } from "react-redux";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import NavDropdown from "react-bootstrap/NavDropdown";

import {
  getProjectBaseUrl,
  getProjectInfoSlug,
  getProjectUrl,
} from "utils/projects";

function MobileBucketNavigation({ collapse }) {
  // Displays the bucket navigation to be shown in the header for mobile clients.

  const project = useSelector((state) => state.projects.detail);

  // Only render bucket selector if we're in a project.
  if (!project || !project.buckets) return null;

  function renderItems() {
    // Render all the bucket links that should go in the dropdown.
    const projectUrl = getProjectBaseUrl(project);
    return project.buckets.map((bucket) => {
      return (
        <NavDropdown.Item
          key={bucket.id}
          as={Link}
          to={`${projectUrl}/${bucket.slug}`}
          onClick={() => collapse()}
        >
          {bucket.title}
        </NavDropdown.Item>
      );
    });
  }

  function getDropdownTitle() {
    // TODO: Probably should show something based on if we're in a bucket.
    return "Choose Bucket";
  }

  return (
    <NavDropdown title={getDropdownTitle()} className="d-md-none mr-auto">
      <NavDropdown.Item
        as={Link}
        to={getProjectUrl(project)}
        onClick={() => collapse()}
      >
        {getProjectInfoSlug(project)}
      </NavDropdown.Item>
      {renderItems()}
    </NavDropdown>
  );
}

MobileBucketNavigation.propTypes = {
  // Collapses the mobile navigation.
  collapse: PropTypes.func.isRequired,
};

export default MobileBucketNavigation;
