import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { formatTimeStamp } from "utils/datetime";

const Wrapper = styled.div`
display: flex;
background-color: white;
margin-bottom: 2px;
margin-top: 2px;
padding: 15px 30px 15px 15px;
border-radius: 5px;
position: relative;
white-space: normal;
font-size: 14px;
align-items: center;
`;

const ImageWrapper = styled.div`
  width : 35px;
  border-radius: 50%;
  margin-right: 10px;
  img {
    width: 100%;
    border-radius: 50%;
    box-shadow: 2px 2px 1px ${props => props.theme.gray300};
  }
`;

const TimeStamp = styled.div`
  font-size: 10px;
  font-weight: 700;
`;

function Reply({ reply, ...props }) {
  // Displays an individual reply.
  return (
    <Wrapper>
        <ImageWrapper>
            <img src={reply.author.image} />
        </ImageWrapper>
        <div>
            <div> {reply.text} </div>
            <TimeStamp> {formatTimeStamp(reply.created)} </TimeStamp>
        </div>
    </Wrapper>
  );
}

Reply.propTypes = {
  // The reply which we're rendering.
  reply: PropTypes.object.isRequired
};

export default Reply;
