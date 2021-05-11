import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  border: 2px solid ${(props) => props.theme.gray300};
`;

function TierBucketSettingButton(props) {
  // Styled button for usage in the tier bucket settings containers.
  return (
    <StyledButton variant="white" block {...props}>
      Add/Remove Buckets
    </StyledButton>
  );
}

export default TierBucketSettingButton;
