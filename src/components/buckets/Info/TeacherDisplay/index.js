import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "@reach/router";

import { getUserImage } from "utils/users";

const Wrapper = styled.div`
  @media (max-width: ${(props) => props.theme.smBreakpoint}) {
    margin-top: ${(props) => props.theme.spacingLg};
  }

  @media (min-width: ${(props) => props.theme.smBreakpoint}) {
    display: inline;
    margin-right: 20px;
  }
`;

const TeacherImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

function TeacherDisplay({ teacher }) {
  /* Teacher display row used in the class info header section. */
  return (
    <Wrapper>
      <Link to={`/users/${teacher.username}`} className="text-dark">
        <TeacherImage src={getUserImage(teacher)} alt="" className="mr-2" />
        {teacher.firstName} {teacher.lastName}
      </Link>
    </Wrapper>
  );
}

TeacherDisplay.propTypes = {
  teacher: PropTypes.object,
};

export default TeacherDisplay;
