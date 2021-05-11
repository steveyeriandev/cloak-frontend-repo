import React from "react";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";

const StyledDropdown = styled(Dropdown)`
  a.active {
    color: ${(props) => props.theme.dark};
  }
`;

const StyledToggle = styled(Dropdown.Toggle)`
  &::after {
    margin-left: -4px;
  }
`;

const BucketTitle = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  display: inline-block;
  margin-bottom: -4px;
`;

function BucketNavigationDropdown({ title, ...props }) {
  // Provides a way to display more buckets than fit in the bar by dropdown select.
  return (
    <StyledDropdown>
      <StyledToggle size="sm" variant="light" className="my-2 w-100" block>
        <BucketTitle>{title}</BucketTitle>
      </StyledToggle>

      <Dropdown.Menu>{props.children}</Dropdown.Menu>
    </StyledDropdown>
  );
}

BucketNavigationDropdown.propTypes = {
  // The label to be shown in the dropdown, which generally is the current bucket.
  title: PropTypes.string.isRequired,
};

export default BucketNavigationDropdown;
