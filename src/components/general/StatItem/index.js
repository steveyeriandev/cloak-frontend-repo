import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopItem = styled.div`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizeXl};
`;

const BottomItem = styled.div``;

function StatItem({ top, bottom }) {
  // Provides a component to show a stat item, such as the stats on a user's profile page.
  return (
    <Wrapper>
      <TopItem>{top}</TopItem>
      <BottomItem>{bottom}</BottomItem>
    </Wrapper>
  );
}

StatItem.propTypes = {
  // The text to be shown on top, usually a number but allows for string as well.
  top: PropTypes.string.isRequired,

  // The text to be shown on bottom.
  bottom: PropTypes.string.isRequired,
};

export default StatItem;
