import React from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";

import { getFullName, getUserImage } from "utils/users";

import ActionButton from "../ActionButton";

function RevenueSplitRow({ revenueSplit, modalActionProps }) {
  const currentUser = useSelector((state) => state.account.user);
  const project = useSelector((state) => state.projects.detail);

  const { user, splitPercent } = revenueSplit;
  const isOwner = project.owner === currentUser.id;

  return (
    <tr>
      <td>
        <Image
          roundedCircle
          alt=""
          src={getUserImage(user)}
          style={{ width: 50 }}
        />{" "}
        {getFullName(user)}
      </td>
      <td>{splitPercent}</td>
      {isOwner && (
        <td>
          <ActionButton
            revenueSplit={revenueSplit}
            modalActionProps={modalActionProps}
          />
        </td>
      )}
    </tr>
  );
}

RevenueSplitRow.propTypes = {
  // The revenue split instance that we're rendering a row for.
  revenueSplit: PropTypes.object.isRequired,

  // Properties passed down from the parent modal.
  modalActionProps: PropTypes.object.isRequired,
};

export default RevenueSplitRow;
