import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";

import BucketRightColumn from "components/buckets/RightColumn";
import BucketBase from "components/buckets/Base";
import EmptyData from "components/general/EmptyData";
import LoadingContainer from "components/loading/Container";
import MessageUploadContainer from "components/buckets/Feed/MessageUploadContainer";
import { isProjectAdmin } from "utils/projects";
import Message from "./Message";

function FeedBucket({ bucket }) {
  /* The feed bucket is used to give a feed of messages that are viewable to the users who have
     access to the bucket. Typically this will be used by teachers to send links or messages to the
     students.
  */
  const project = useSelector((state) => state.projects.detail);
  const user = useSelector((state) => state.account.user);

  function renderFeed() {
    const feedData = bucket.feed;
    if (feedData === undefined) return <LoadingContainer />;

    if (feedData.length === 0)
      return (
        <EmptyData>There are no messages in this project's feed.</EmptyData>
      );

    return feedData.map((message) => {
      return (
        <Message
          key={message.id}
          feedMessage={message}
          canEdit={
            isProjectAdmin(user, project) || user.id === message.createdBy.id
          }
        />
      );
    });
  }

  return (
    <BucketBase>
      <Row className="h-100">
        <Col sm={8}>{renderFeed()}</Col>
        <BucketRightColumn>
          {(bucket.allowUserCreate || isProjectAdmin(user, project)) && (
            <MessageUploadContainer />
          )}
        </BucketRightColumn>
      </Row>
    </BucketBase>
  );
}

FeedBucket.propTypes = {
  bucket: PropTypes.object,
};

export default FeedBucket;
