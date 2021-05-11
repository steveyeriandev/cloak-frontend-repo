import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MediaItem from "components/media/Item";
import RemoveOverlayIcon from "components/general/RemoveOverlayIcon";
import CreateMediaItemContainer from "../CreateMediaItemContainer";
import { useDeleteMediaItem } from "hooks/MediaItems";

function EditMediaBlockContainer({ mediaBlock }) {
  // Provides a container to modify media block items.
  const handleDelete = useDeleteMediaItem();

  const colSize = 4;

  function renderItems() {
    return mediaBlock.items.map((item) => {
      return (
        <Col sm={colSize} className="mb-4" key={item.id}>
          <MediaItem
            item={item}
            actionComponent={
              <RemoveOverlayIcon onClick={(e) => handleDelete(item.id, e)} />
            }
            actionOnHover
          />
        </Col>
      );
    });
  }

  return (
    <Row>
      {renderItems()}
      <Col sm={colSize} className="flex-grow-1 mb-4">
        <CreateMediaItemContainer mediaBlock={mediaBlock} minHeight={220} />
      </Col>
    </Row>
  );
}

EditMediaBlockContainer.propTypes = {
  // The media block that we are rendering for edit.
  mediaBlock: PropTypes.object,
};

export default EditMediaBlockContainer;
