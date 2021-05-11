import React from "react";
import PropTypes from "prop-types";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import FileUploader from "components/buckets/Uploads/FileUploader";
import FixedBottomNavbar from "components/navbars/FixedBottom";
import { resetUploadSession } from "features/imageUploadSession/slice";

const StyledProgressBar = styled(ProgressBar)`
  width: 200px;
  background-color: white;
  color: black;
  box-shadow: 10px 10px 24px -2px rgba(0, 0, 0, 0.8);
`;

function UploadBucketFooter({ bucket }) {
  /* Displays a fixed transparent footer fixed along the bottom of the page used to for uploading
     new images to a stack.
  */
  const uploadSession = useSelector((state) => state.imageUploadSession);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function renderProgressBar() {
    // Show a progress bar letting the user know where they are at in their total upload.
    if (uploadSession.status === "idle") {
      return null;
    }

    if (uploadSession.status === "complete") {
      dispatch(resetUploadSession());
      addToast("Stack upload complete", { appearance: "success" });
      return null;
    }

    const percentComplete = parseInt(
      (uploadSession.current / uploadSession.total) * 100
    );
    return (
      <StyledProgressBar
        animated
        now={percentComplete}
        label={<span style={{ color: "#111" }}>{`${percentComplete}%`}</span>}
        variant="success"
      />
    );
  }

  return (
    <FixedBottomNavbar>
      <Container>
        <Nav className="ml-auto mr-3">
          <Nav.Item className="d-flex align-items-center mr-3 mb-1">
            {renderProgressBar()}
          </Nav.Item>
          <Nav.Item>
            <FileUploader bucket={bucket} />
          </Nav.Item>
        </Nav>
      </Container>
    </FixedBottomNavbar>
  );
}

UploadBucketFooter.propTypes = {
  bucket: PropTypes.object,
};

export default UploadBucketFooter;
