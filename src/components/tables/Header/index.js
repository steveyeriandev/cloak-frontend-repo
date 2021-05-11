import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-top-right-radius: ${(props) => props.theme.borderRadius};
  border-top-left-radius: ${(props) => props.theme.borderRadius};
`;

const ActionsSection = styled.div`
  display: flex;
  justify-conteent: center;
  align-items: center;

  > .dropdown {
    margin-left: 20px;
  }
`;

function TableHeader({ text, renderActions, className, ...props }) {
  // Provides a header section to a table component.

  function renderActionSection() {
    if (!renderActions) return null;

    return <ActionsSection>{renderActions()}</ActionsSection>;
  }

  return (
    <StyledHeader className={`px-4 py-3 ${props.className}`} {...props}>
      <div>
        <h4 className="mb-0">{text}</h4>
      </div>
      {renderActionSection()}
    </StyledHeader>
  );
}

TableHeader.propTypes = {
  // The text that should be rendered on the left side of the header.
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

  // Provides a function to render the action buttons that should be in this header.
  renderActions: PropTypes.func,
};

TableHeader.defaultProps = {
  renderActions: null,
};

export default TableHeader;
