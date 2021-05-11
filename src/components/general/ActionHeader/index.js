import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LoadingButton from "components/buttons/Loading";

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.p`
  font-size: ${(props) => (props.size === "sm" ? "16px" : "22px")};
`;

function ActionHeader({ action, actionLabel, size, isLoading, ...props }) {
  // Provides a title component that also allows for a top-level action.
  function renderActionButton() {
    if (!action) return null;

    return (
      <LoadingButton
        isLoading={isLoading}
        className="float-right"
        onClick={action}
        width={props.width || 100}
      >
        {actionLabel || "Save"}
      </LoadingButton>
    );
  }

  return (
    <>
      <TopSection>
        <HeaderText className="m-0" size={size}>
          {props.children}
        </HeaderText>
        {renderActionButton()}
      </TopSection>
      <hr />
    </>
  );
}

ActionHeader.propTypes = {
  // Provides an action to send.
  action: PropTypes.func,

  // Override the default action label.
  actionLabel: PropTypes.string,

  // Determines if the async action is currently running.
  isLoading: PropTypes.bool,
};

export default ActionHeader;
