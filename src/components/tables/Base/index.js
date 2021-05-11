import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTable = styled(Table)`
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 0;

  ${(props) =>
    props.$withHeader &&
    `
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `}

  td {
    vertical-align: middle;
  }

  .is-selected {
    background-color: ${(props) => props.theme.primary};
  }
`;

function BaseTable({ withHeader, withMultiSelect, ...props }) {
  // A base table component for all of our tables to inherit.
  return <StyledTable $withHeader={withHeader} {...props} />;
}

BaseTable.propTypes = {
  // Determines if the table has a header above it, which affects the styling.
  withHeader: PropTypes.bool,
};

BaseTable.defaultProps = {
  withHeader: false,
};

export default BaseTable;
