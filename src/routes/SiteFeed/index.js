import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

import LoadingContainer from "components/loading/Container";
import PostService from "features/posts/service.js";
import Post from "components/posts/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const StyledRow = styled(Row)`
  > .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`;

function SiteFeedRoute() {
  // Provides the main static site feed that users can view new shared posts.

  const [isLoading, setIsLoading] = useState(true);
  const [feedData, setFeedData] = useState([]);
  const [feedDataNext, setFeedDataNext] = useState();

  useEffect(() => loadFeedData(), []);

  const postService = new PostService();

  async function loadFeedData() {
    // Performs the load of the site feed data.
    if (feedData.length === 0) setIsLoading(true);
    const response = feedDataNext
      ? await postService.getNextUrl(feedDataNext)
      : await postService.list();
    setFeedData([...feedData, ...response.data.results]);
    setFeedDataNext(response.data.next);
    if (isLoading) setIsLoading(false);
  }

  function renderItems() {
    return feedData.map((post) => (
      <Col md={{ span: 8, offset: 2 }} key={post.id}>
        <Post post={post} />
      </Col>
    ));
  }

  if (isLoading) return <LoadingContainer text="Loading site feed" />;

  if (feedData.length === 0)
    return (
      <Container className="pt-5">
        <Alert className="border bg-white text-center">
          <FontAwesomeIcon icon={faInfoCircle} /> There are no posts yet
        </Alert>
      </Container>
    );

  return (
    <Container>
      <StyledRow>
        <InfiniteScroll
          dataLength={feedData.length}
          next={loadFeedData}
          hasMore={feedDataNext !== null}
          loader={<LoadingContainer text="Loading more..." className="mb-5" />}
          scrollableTarget="root"
          style={{ overFlowY: "none" }}
        >
          {renderItems()}
        </InfiniteScroll>
      </StyledRow>
    </Container>
  );
}

export default SiteFeedRoute;
