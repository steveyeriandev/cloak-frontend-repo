import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Loading from "components/loading/Loading";
import { bucketType } from "utils/enums";
import { getKeyByValue } from "utils/general";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.selected ? props.theme.success : props.theme.gray200};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 14px;
  font-weight: bold;

  ${(props) =>
    props.clickable &&
    `
    &:hover { cursor: pointer; }
  `}

  ${({ selected, theme }) =>
    selected !== null &&
    `
      &:hover {
        cursor: pointer;
        ${!selected && `background-color: ${theme.gray300}`}
      };
  `}
`;

const ActionButton = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const WithKind = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }
`;

function BucketSlot({
  bucket,
  registrationTier,
  action,
  actionIcon,
  showType,
  selected,
  isLoading,
  ...props
}) {
  // Renders a bucket slot in a registration tier bucket settings card.

  function renderAction() {
    if (action === undefined || actionIcon === undefined) return null;

    function handleClick(e) {
      // We don't want the click to continue to the bucket slot if they're clicking on the action.
      e.stopPropagation();
      return action();
    }

    return <ActionButton src={actionIcon} onClick={handleClick} />;
  }

  function renderBucketLabel() {
    // Determines what is shown in the left side of the bucket slot, its "label".
    if (!showType) {
      return isLoading ? (
        <span>
          <Loading size="sm" /> {bucket.title}
        </span>
      ) : (
        <span>
          {selected && <FontAwesomeIcon icon={faCheck} />} {bucket.title}
        </span>
      );
    }

    return (
      <WithKind>
        <p>
          {selected && <FontAwesomeIcon icon={faCheck} />} {bucket.title}
        </p>
        <small>
          <p className="text-muted">{getKeyByValue(bucketType, bucket.kind)}</p>
        </small>
      </WithKind>
    );
  }

  return (
    <Wrapper
      className={`${showType ? "my-2 px-3 py-1" : "my-2 px-3 py-2"}`}
      selected={selected}
      clickable={typeof props.onClick === "function"}
      {...props}
    >
      {renderBucketLabel()}
      {renderAction()}
    </Wrapper>
  );
}

BucketSlot.propTypes = {
  // The bucket object that is being rendered.
  bucket: PropTypes.object.isRequired,

  // The registration tier that we're working with the bucket slot.
  registrationTier: PropTypes.object,

  // An action to take on the bucket object.
  action: PropTypes.func,

  // If there is an action, then we should show an icon image to initiate the action.
  actionIcon: PropTypes.string,

  // Optionally show the type of the bucket in the slot component.
  showType: PropTypes.bool,

  // Determines if the slot is currently selected and/or selectable.
  selected: PropTypes.bool,

  // Determines if the bucket slot is currently loading
  isLoading: PropTypes.bool,
};

BucketSlot.defaultProps = {
  showType: false,
  selected: false,
  isLoading: false,
};

export default BucketSlot;
