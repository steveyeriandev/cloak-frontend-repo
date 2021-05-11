import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

import CarouselNextButton from "components/carousels/NextButton";
import CarouselPreviousButton from "components/carousels/PreviousButton";
import useCarouselAutofocus from "hooks/CarouselAutofocus";

const StyledCarousel = styled(Carousel)`
  // Hide the controls when not hovering.

  .carousel-caption,
  .carousel-indicators,
  .carousel-navigation-btn {
    display: none;
  }

  &:hover {
    .carousel-indicators {
      display: flex;
    }

    .carousel-caption,
    .carousel-navigation-btn {
      display: block;
    }
  }
`;

function BaseCarousel(props) {
  /* Provides standard props for carousels to be used throughout the system. */
  useCarouselAutofocus();

  return (
    <StyledCarousel
      slide={false}
      interval={null}
      nextIcon={<CarouselNextButton />}
      prevIcon={<CarouselPreviousButton />}
      {...props}
    >
      {props.children}
    </StyledCarousel>
  );
}

export default BaseCarousel;
