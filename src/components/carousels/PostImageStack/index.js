import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import styled from "styled-components";

import CarouselNextButton from "components/carousels/NextButton";
import CarouselPreviousButton from "components/carousels/PreviousButton";
import useCarouselAutofocus from "hooks/CarouselAutofocus";

const StyledCaption = styled(Carousel.Caption)`
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  right: 0;
  bottom: 0;
`;

const PostCarousel = styled(Carousel)`
  .carousel-navigation-btn {
    display: none;
  }

  &:hover {
    .carousel-navigation-btn {
      display: block;
    }
  }
`;

function PostImageStack({ bucketUpload, autofocus }) {
  // Renders the image stack to be shown specifically in a post.
  useCarouselAutofocus(autofocus);

  function renderImages() {
    const { images } = bucketUpload;

    if (images === undefined) return null;

    return images.map((image, index) => {
      return (
        <Carousel.Item key={image.id}>
          <Image className="d-block w-100" src={image.image} alt="" />
          <StyledCaption>
            {index + 1} / {images.length}
          </StyledCaption>
        </Carousel.Item>
      );
    });
  }

  return (
    <PostCarousel
      slide={false}
      interval={null}
      nextIcon={<CarouselNextButton />}
      prevIcon={<CarouselPreviousButton />}
      indicators={false}
    >
      {renderImages()}
    </PostCarousel>
  );
}

PostImageStack.propTypes = {
  // The bucket upload that we're rendering the images for.
  bucketUpload: PropTypes.object.isRequired,

  // Determines if the carousel should automatically take focus, allowing for keys to navigate.
  autofocus: PropTypes.bool,
};

PostImageStack.defaultProps = {
  autofocus: false,
};

export default PostImageStack;
