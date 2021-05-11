import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

import BigCheckbox from "components/controls/BigCheckbox";
import EnrollmentActionButton from "components/tables/EnrollmentActionButton";
import { enrollmentStatus } from "utils/enums";
import { getKeyByValue } from "utils/general";
import { getUserImage } from "utils/users";

const ProfileImage = styled(Image)`
  width: 35px;
`;

const DataRow = styled.tr`
  &:hover:not(.is-selected) {
    background-color: ${(props) => props.theme.secondary};
  }
`;

function EnrollmentRow({ enrollment, isSelected, toggleSelected }) {
  // Renders a row of data for the enrollment table.

  function handleCheck(e) {
    // Toggles if the row is selected.
    toggleSelected(enrollment);
  }

  return (
    <DataRow key={enrollment.id} className={isSelected ? "is-selected" : ""}>
      <td className="pl-4">
        <BigCheckbox
          checked={isSelected}
          onChange={(e) => handleCheck(e, enrollment.id)}
          className="text-center"
        />
      </td>
      <td>
        <ProfileImage rounded src={getUserImage(enrollment.student)} alt="" />
      </td>
      <td>
        {enrollment.student.name}{" "}
        <span className="text-muted">@{enrollment.student.username}</span>
      </td>
      <td>{enrollment.registrationTier.title}</td>
      <td>{getKeyByValue(enrollmentStatus, enrollment.status)}</td>
      <td>
        <EnrollmentActionButton enrollment={enrollment} />
      </td>
    </DataRow>
  );
}

EnrollmentRow.propTypes = {
  // The enrollment object that we're rendering.
  enrollment: PropTypes.object.isRequired,

  // Determines if the row is selected or not.
  isSelected: PropTypes.bool.isRequired,

  // Action from parent item to execute when toggling if the row is selected.
  toggleSelected: PropTypes.func.isRequired,
};

export default EnrollmentRow;
