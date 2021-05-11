import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { getProjectUrl } from "utils/projects.js";

import ThumbnailImage from "../ThumbnailImage";

function ProjectTile({ hideOverlay, project }) {
  // Renders an individual project tile.
  return (
    <div className="project-tile m-3 radius">
      <Link to={getProjectUrl(project)}>
        <ThumbnailImage project={project} hideOverlay={hideOverlay} />
      </Link>
    </div>
  );
}

ProjectTile.propTypes = {
  // The project that we're rendering.
  project: PropTypes.object.isRequired,

  // Will hide the overlay of the project owner.
  hideOverlay: PropTypes.bool,
};

ProjectTile.defaultProps = {
  hideOverlay: false,
};

export default ProjectTile;
