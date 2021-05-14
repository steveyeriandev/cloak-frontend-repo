import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import LoadingContainer from "components/loading/Container";
import Post from "components/posts/Post";
import { fetchPosts } from "features/posts/thunks";

const StyledRow = styled(Row)`
  > .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`;

function SiteFeedRoute() {
  // Provides the main static site feed that users can view new shared posts.

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.posts);

  useEffect(() => loadFeedData({ fresh: true }), []);

  async function loadFeedData({ fresh, nextUrl }) {
    // Performs the load of the site feed data.
    await dispatch(fetchPosts({ fresh, nextUrl }));
    setIsLoading(false);
  }

  function renderItems() {
    return postState.entities.map((post) => (
      <Col md={{ span: 8, offset: 2 }} key={post.id}>
        <Post post={post} />
      </Col>
    ));
  }

  if (isLoading) return <LoadingContainer text="Loading site feed" />;

  if (postState.entities.length === 0)
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
          dataLength={postState.entities.length}
          next={() => loadFeedData({ fresh: false, nextUrl: postState.next })}
          hasMore={postState.next !== null}
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
