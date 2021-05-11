import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ShadowImage from "components/images/Shadow";

const StyledShadowImage = styled(ShadowImage)`
  ${({ $hover }) =>
    $hover &&
    `
    &:hover {
      cursor: pointer;
    }
  `}
`;

const Wrapper = styled.div`
  position: relative;

  &:hover {
    div {
      display: block;
    }
  }
`;

const ActionWrapper = styled.div`
  ${({ $actionOnHover }) =>
    $actionOnHover &&
    `
    > div {
      display: none;
    }
  `}
`;

function MediaItem({
  item,
  actionComponent,
  actionOnHover,
  hoverCursor,
  ...props
}) {
  function renderAction() {
    // Renders the hover action component, if there was one passed in.
    if (!actionComponent) return null;

    // For some reason, the onClick event does not work directly on the actionComponent.
    return (
      <ActionWrapper
        onClick={actionComponent.props.onClick}
        $actionOnHover={actionOnHover ? 1 : 0}
      >
        {actionComponent}
      </ActionWrapper>
    );
  }

  return (
    <Wrapper>
      <StyledShadowImage
        rounded
        fluid
        src={item.image}
        $hoverCursor={hoverCursor ? 1 : 0}
        {...props}
      />
      {renderAction()}
    </Wrapper>
  );
}

MediaItem.propTypes = {
  // The item that we are rendering.
  item: PropTypes.object.isRequired,

  // Pass in a component to show in the corner which provides an action on the item.
  actionComponent: PropTypes.object,

  // The action component should only be shown upon hover.
  actionOnHover: PropTypes.bool,

  // Determines if the image should have a cursor upon hover.
  hoverCursor: PropTypes.bool,
};

MediaItem.defaultProps = {
  actionOnHover: false,
  hoverCursor: false,
};

export default MediaItem;
