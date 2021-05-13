import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

import BaseCarousel from "components/carousels/Base";
import CarouselCaption from "components/carousels/Caption";
import LoadingContainer from "components/loading/Container";
import useFetchBucketUploadImages from "hooks/FetchBucketUploadImages";

function ImageStackCarousel({ bucketUpload }) {
  // Carousel that allows us to tap through an image stack.
  const [isLoading, images] = useFetchBucketUploadImages(bucketUpload);

  if (isLoading) return <LoadingContainer />;

  function renderImages() {
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

  return <BaseCarousel>{renderImages()}</BaseCarousel>;
}

export default ImageStackCarousel;
