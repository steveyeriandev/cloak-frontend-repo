import React from "react";
import PropTypes from "prop-types";

import InfoTooltip from "components/tooltips/Info";
import BaseTable from "../Base";
import RevenueSplitRow from "./Row";

function RevenueSplitsTable({ revenueSplits, modalActionProps, ...props }) {
  function renderRows() {
    return revenueSplits.map((revenueSplit) => (
      <RevenueSplitRow
        revenueSplit={revenueSplit}
        modalActionProps={modalActionProps}
      />
    ));
  }

  return (
    <BaseTable {...props}>
      <thead>
        <tr>
          <th>User</th>
          <th>
            Split %{" "}
            <InfoTooltip text="The received portion (after platform fee) will be split accordingly." />
          </th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </BaseTable>
  );
}

RevenueSplitsTable.propTypes = {
  // The registration tier that we're showing the split for.
  revenueSplits: PropTypes.array.isRequired,

  // Properties passed down from the parent modal which go to the action button.
  modalActionProps: PropTypes.object.isRequired,
};

export default RevenueSplitsTable;
