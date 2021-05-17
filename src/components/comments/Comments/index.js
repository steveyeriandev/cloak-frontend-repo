import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import LoadingContainer from "components/loading/Container";
import ProjectService from "features/projects/service";
import BucketUploadService from "features/bucketUploads/service";
import Comment from "components/comments/Comment";

function CommentContainer({
  contentObject,
  contentTypeObj,
  additionalComments,
}) {
  // Show the full set of comments for a content object (project, bucketupload, etc)
  const [isLoading, setIsLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => fetchComments(), []);

  // Gets the service based on the content type that's being commented on.
  const service =
    contentTypeObj.model === "project"
      ? new ProjectService()
      : new BucketUploadService();

  function handleResponseSuccess(response) {
    // Callback after the response has come back with data.
    setComments([...comments, ...response.data.results]);
    setNextUrl(response.data.next);
    if (isLoading) setIsLoading(false);
  }

  async function fetchComments() {
    // Fetch the comments for the content object.
    setIsLoading(true);
    const response = await service.comments(contentObject.id);
    console.log(response)
    handleResponseSuccess(response);
  }

  async function fetchNext() {
    const response = await service.getNextUrl(nextUrl);
    handleResponseSuccess(response);
  }

  function renderComments() {
    // Combine the fetched comments along with any additional comments passed in through props.
    const fullComments = [...additionalComments, ...comments];
    return fullComments.map((comment) => (
      <Comment key={comment.id} comment={comment} className="py-1" />
    ));
  }

  if (isLoading)
    return (
      <div className="d-flex justify-content-center h-100">
        <LoadingContainer text="Loading comments" />
      </div>
    );

  if (comments.length === 0 && additionalComments.length === 0)
    return (
      <p className="text-muted text-center mt-4">Be the first to comment...</p>
    );

  return (
    <InfiniteScroll
      dataLength={comments.length}
      next={fetchNext}
      hasMore={nextUrl !== null}
      loader={<LoadingContainer text="Loading more..." />}
      scrollableTarget="comments-container"
    >
      {renderComments()}
    </InfiniteScroll>
  );
}

CommentContainer.propTypes = {
  // The content object for which we're showing the comments.
  contentObject: PropTypes.object.isRequired,

  // The content type object of the object we're rendering.
  contentTypeObj: PropTypes.object.isRequired,

  // Extra comments that are passed into the component for rendering.
  additionalComments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentContainer;
