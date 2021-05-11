import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

import BaseCarousel from "components/carousels/Base";
import CarouselCaption from "components/carousels/Caption";
import LoadingContainer from "components/loading/Container";

function ImageStackCarousel() {
  const stack = useSelector((state) => state.bucketUploads.current);

  function renderImages() {
    const { images } = stack;

    if (images === undefined) return null;

    return images.map((image, index) => {
      return (
        <Carousel.Item key={image.id}>
          <Image className="d-block w-100" src={image.image} alt="" />
          <CarouselCaption>
            <p>
              {index + 1} / {images.length}
            </p>
          </CarouselCaption>
        </Carousel.Item>
      );
    });
  }

  if (stack.isLoading) return <LoadingContainer className="mb-5" />;

  return <BaseCarousel>{renderImages()}</BaseCarousel>;
}

export default ImageStackCarousel;
