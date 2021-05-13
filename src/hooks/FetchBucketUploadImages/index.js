import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import BucketUploadService from "features/bucketUploads/service";

function useFetchBucketUploadImages(bucketUpload) {
  // Fetches the bucket upload images.

  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  async function fetchImages() {
    // Fetches the image data for the comic.
    const service = new BucketUploadService();
    const response = await service.fetch(bucketUpload.id);
    setImages(response.data.images);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, [bucketUpload.id]);

  return [isLoading, images];
}

useFetchBucketUploadImages.propTypes = {
  // The bucket upload object that we're fetching images for.
  bucketUpload: PropTypes.string.isRequired,
};

export default useFetchBucketUploadImages;
