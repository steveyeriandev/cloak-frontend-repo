import React from "react";
import PropTypes from "prop-types";

import { getProjectType } from "utils/projects";
import { projectTemplate } from "utils/enums";
import AccountRow from "./Row";
import BaseTable from "../Base";

function PaymentAccountTable({ project }) {
  // Displays the stripe users for a project and their current status/actions.

  function renderRows() {
    // Field is named accounts still, but they're actually user instances with an account field.
    return project.accounts.map((user) => (
      <AccountRow user={user} key={user.id} />
    ));
  }

  return (
    <BaseTable>
      <thead>
        <tr>
          <th>
            {getProjectType(project) === projectTemplate.liveClass
              ? "Teachers"
              : "Collaborators"}
          </th>
          <th>Can receive payment</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </BaseTable>
  );
}

PaymentAccountTable.propTypes = {
  // The project for which we're rendering the user accounts.
  project: PropTypes.object.isRequired,
};

export default PaymentAccountTable;
