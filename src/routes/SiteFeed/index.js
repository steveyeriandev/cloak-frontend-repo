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
import { useLocation } from "@reach/router";
import { useToasts } from "react-toast-notifications";

import LoadingContainer from "components/loading/Container";
import Post from "components/posts/Post";
import { fetchPosts, fetchPostDetailsWithContentType } from "features/posts/thunks";
import { clearSelectedEntity } from "features/posts/slice";

const StyledRow = styled(Row)`
  > .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`;

function SiteFeedRoute() {
  // Provides the main static site feed that users can view new shared posts.
  const { addToast } = useToasts();
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.posts);
  // if there is a redirection from notification
  // detailed post will represent this notification target
  const detailedPost = postState.selectedEntity;

  // url params used to detect if there is a redirection from
  // notification list
  const search = new URLSearchParams(location.search);
  const objectId = search.get("object_id");
  const contentType = search.get("content_type");
  
  useEffect(() => loadFeedData({ fresh: true }), []);
  useEffect(() => {
    dispatch(clearSelectedEntity());
    if (objectId) {loadPostDetails(objectId, contentType);};
  }, [objectId]);

  async function loadPostDetails(objectId, contentType) {
    const action = await dispatch(fetchPostDetailsWithContentType({objectId: objectId, contentType: contentType}));
    if ( action.type === "FETCH_POST_DETAILS/rejected" ) {
      addToast("Error while fetching post with post id : " + objectId , { appearance: "error" });
    }
  }

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

  // if this page is render after user clicks a notification
  // we show the notification post on top
  function renderSelectedPostDetails() {
    if (detailedPost && objectId) {
      return (
      <Col md={{ span: 8, offset: 2 }} key={detailedPost.id}>
        <Post post={detailedPost} isDisplayedFully={true} />
      </Col>
      )
    }
    else {
      return null;
    }
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
        {renderSelectedPostDetails()}
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
