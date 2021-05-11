import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCaption = styled(Carousel.Caption)`
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  width: 100%;
  right: 0;
  left: 0;
  border-bottom-left-radius: ${(props) =>
    props.rounded ? props.theme.borderRadius : 0};
  border-bottom-right-radius: ${(props) =>
    props.rounded ? props.theme.borderRadius : 0};
`;

function CarouselCaption({ rounded, ...props }) {
  // A styled caption container for our carousel.
  return <StyledCaption rounded={rounded}>{props.children}</StyledCaption>;
}

CarouselCaption.propTypes = {
  // Determines if the caption should have rounded bottom corners
  rounded: PropTypes.bool,
};

export default CarouselCaption;
