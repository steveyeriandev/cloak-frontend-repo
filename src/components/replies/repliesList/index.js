import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Reply from "components/replies/reply";

const Wrapper = styled.div`
    margin-left: 40px;
`;


function RepliesList({ replies, ...props }) {
  // Displays List of comment replies.
  return (
    <Wrapper>
        {replies.map(reply => <Reply reply={reply} key={reply.id} />)}
    </Wrapper>
  );
}

RepliesList.propTypes = {
  // List of comment replies.
  replies: PropTypes.array.isRequired
};

export default RepliesList;
