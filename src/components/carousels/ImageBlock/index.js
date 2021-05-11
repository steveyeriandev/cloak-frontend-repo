import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";

import BaseCarousel from "components/carousels/Base";
import CarouselCaption from "components/carousels/Caption";

function ImageBlockCarousel() {
  /* Renders an image carousel for an image block which has multiple images. */
  const imageBlockState = useSelector(
    (state) => state.projects.activeImageBlock
  );

  function getInitialIndex() {
    // We receive the selected image id from the state, and need to map that to the image index.
    return imageBlockState.items.findIndex(
      (item) => item.id === imageBlockState.initial
    );
  }

  function renderImages() {
    const { items } = imageBlockState;

    if (items === undefined) return null;

    return items.map((image, index) => {
      return (
        <Carousel.Item key={image.id}>
          <Image rounded className="d-block w-100" src={image.image} alt="" />
          <CarouselCaption rounded>
            <p>
              {index + 1} / {items.length}
            </p>
          </CarouselCaption>
        </Carousel.Item>
      );
    });
  }

  return (
    <BaseCarousel defaultActiveIndex={getInitialIndex} keyboard={true}>
      {renderImages()}
    </BaseCarousel>
  );
}

export default ImageBlockCarousel;
