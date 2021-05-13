import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useLocation } from "@reach/router";
import { parse as queryStringParse } from "query-string";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import { useModal } from "react-modal-hook";
import { useDispatch, useSelector } from "react-redux";
import ReactPixel from "react-facebook-pixel";
import ReactQuill from "react-quill";

import BucketRightColumn from "components/buckets/RightColumn";
import BucketBase from "components/buckets/Base";
import RegistrationSection from "components/projects/registration/Section";
import ImageBlockModal from "components/modals/ImageBlock";
import FormModal from "components/modals/Form";
import ProjectSingleFieldForm from "components/forms/ProjectSingleField";
import EditProjectButton from "components/buttons/EditProject";
import MediaItem from "components/media/Item";
import ImageUploader from "components/images/ImageUploader";
import CreateMediaItemContainer from "components/projects/CreateMediaItemContainer";
import InfoTooltip from "components/tooltips/Info";
import RemoveOverlayIcon from "components/general/RemoveOverlayIcon";
import EmptyActionSection from "components/general/EmptyActionSection";
import ProjectPublicToggle from "components/projects/PublicToggle";
import HidePosterImageToggle from "components/projects/HidePosterImageToggle";
import ProjectAdminEditSection from "components/projects/AdminEditSection";
import ProjectActAsSelect from "components/controls/ProjectActAsSelect";
import DefaultProjectPoster from "images/project-generic.jpg";
import {
  activateImageBlock,
  deactivateImageBlock,
} from "features/projects/slice";
import { updateProjectImage } from "features/projects/thunks";
import { useDeleteMediaItem } from "hooks/MediaItems";
import useFeedShare from "hooks/FeedShare";
import { isProjectAdmin } from "utils/projects";
import ClassInfoHeader from "./ClassInfoHeader";

const ProjectTitle = styled.h1`
  font-size: 50px;
  display: flex;
  align-items: center;

  .icon-container {
    font-size: 30%;
  }
`;

const ProjectDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacingLg};
`;

function ProjectInfoBucket({ project, actAsContext }) {
  /* Provides the "bucket" (It's not actually a bucket in data, but shown as if it were) for showing
     the general project-level data and allows users to register for tiers.
  */
  const showConfirmShareModal = useFeedShare(
    "project",
    "Project is public!",
    project.id
  );

  const [showImageBlockModal, hideImageBlockModal] = useModal(() => {
    function hide() {
      dispatch(deactivateImageBlock());
      hideImageBlockModal();
    }

    return <ImageBlockModal show={true} onHide={hide} />;
  }, [project]);
  const [showEditTitleModal, hideEditTitleModal] = useModal(() => {
    return (
      <FormModal onHide={hideEditTitleModal}>
        <ProjectSingleFieldForm
          project={project}
          label="Title"
          fieldName="title"
          closeModal={hideEditTitleModal}
        />
      </FormModal>
    );
  }, [project]);
  const [showEditDescriptionModal, hideEditDescriptionModal] = useModal(() => {
    return (
      <FormModal onHide={hideEditDescriptionModal}>
        <ProjectSingleFieldForm
          project={project}
          label="Description"
          fieldName="description"
          closeModal={hideEditDescriptionModal}
          controllerProps={{
            as: ReactQuill,
          }}
        />
      </FormModal>
    );
  }, [project]);

  const location = useLocation();
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const queryStrings = queryStringParse(location.search, {
    parseBooleans: true,
  });
  const handleDelete = useDeleteMediaItem();

  const isOwner = user.id === project.owner;

  // Determines if the user is currently in act as mode.
  const isActingAs = actAsContext.isPublic || actAsContext.registrationTier;

  // Determines if the user should be able to see the special admin edit items.
  const shouldViewAdminItems = isProjectAdmin(user, project) && !isActingAs;

  function _trackPixelPurchase() {
    // When a user has a successful payment, we need to track it with facebook pixel.
    const purchasedTier = project.tiers.find((tier) => {
      return tier.id === parseInt(queryStrings.registrationTier);
    });

    if (purchasedTier)
      ReactPixel.track("Purchase", {
        currency: "USD",
        value: parseFloat(purchasedTier.price),
      });
  }

  useEffect(() => {
    function handleStripeRedirect() {
      // Stripe sends users to a redirect url with either success or canceled, we need to handle that
      // accordingly and notify the user.
      if (queryStrings.success === true) {
        addToast("Payment accepted", { appearance: "success" });
        _trackPixelPurchase(queryStrings);
      } else if (queryStrings.canceled === true)
        addToast("Payment canceled", { appearance: "warning" });
    }

    handleStripeRedirect();
  }, [addToast, location.search]);

  function createMarkup() {
    return { __html: project.description };
  }

  function handleBlockImageClick(imageId) {
    dispatch(activateImageBlock({ imageId }));
    showImageBlockModal();
  }

  function renderImageBlocks() {
    return project.imageBlocks.map((mediaBlock) => {
      const blocks = mediaBlock.items.map((item) => {
        /* Renders the media block(s) for the project. */

        // Special props that only the owner should have.
        const ownerProps = !isOwner
          ? {}
          : {
              actionComponent: (
                <RemoveOverlayIcon onClick={(e) => handleDelete(item.id, e)} />
              ),
              actionOnHover: true,
            };

        return (
          <Col sm={4} key={item.id} className="mb-4">
            <MediaItem
              hoverCursor
              item={item}
              onClick={() => handleBlockImageClick(item.id)}
              {...ownerProps}
            />
          </Col>
        );
      });

      // Return only the blocks for normal users, but the create container for the owner as well.
      if (!shouldViewAdminItems) return blocks;

      return (
        <>
          {blocks}
          <Col sm={4} className="mb-4">
            <CreateMediaItemContainer mediaBlock={project.imageBlocks[0]} />
          </Col>
        </>
      );
    });
  }

  function renderProjectImage() {
    // The image changes depending on if the user is the owner.
    return shouldViewAdminItems ? (
      <ImageUploader
        action={updateProjectImage}
        actionPayload={{ projectId: project.id }}
        imageSrc={project.image || DefaultProjectPoster}
        className="d-none d-md-block"
      />
    ) : (
      <Image
        fluid
        rounded
        src={project.image || DefaultProjectPoster}
        alt={project.title}
        className="d-none d-md-block"
      />
    );
  }

  function renderDescriptionSection() {
    /* Depending on if the user is the owner, we need to modify what's shown to allow the owner to
       edit the description.
    */

    if (!project.description && shouldViewAdminItems) {
      // If the project description is blank, then we should have a special render.
      return (
        <EmptyActionSection
          text="Your project description is currently empty."
          buttonAction={showEditDescriptionModal}
          buttonText="Create description"
        />
      );
    }

    return (
      <ProjectDescriptionContainer>
        <div dangerouslySetInnerHTML={createMarkup()} />
        <div>
          {shouldViewAdminItems && (
            <EditProjectButton
              onClick={showEditDescriptionModal}
              className="mr-3"
            />
          )}
        </div>
      </ProjectDescriptionContainer>
    );
  }

  return (
    <BucketBase>
      <Row className="h-100">
        <Col sm={12} md={8}>
          {isProjectAdmin(user, project) && (
            <ProjectAdminEditSection className="d-flex align-items-center justify-space-between border mt-4">
              <span className="w-50">
                Currently viewing as
                <InfoTooltip
                  text={`Use this drop down to see what you project looks like from the point of
                         view of someone who has purchased a specific level of access through one of
                         the pay buttons or as a public member`}
                  placement="bottom"
                  className="mr-2"
                />
              </span>
              <span className="w-50">
                <ProjectActAsSelect project={project} {...actAsContext} />
              </span>
            </ProjectAdminEditSection>
          )}
          <ProjectTitle className="mb-4">
            {project.title}
            {shouldViewAdminItems && (
              <EditProjectButton onClick={showEditTitleModal} />
            )}
          </ProjectTitle>
          {shouldViewAdminItems && (
            <ProjectAdminEditSection>
              <ProjectPublicToggle
                project={project}
                setPublicAction={
                  !project.hasBeenShared ? showConfirmShareModal : () => {}
                }
              />
            </ProjectAdminEditSection>
          )}
          <ClassInfoHeader
            project={project}
            shouldViewAdminItems={shouldViewAdminItems}
          />
          {renderDescriptionSection()}
          <Row className="d-none d-md-flex">{renderImageBlocks()}</Row>
        </Col>
        <BucketRightColumn sm={12} md={4}>
          <div className="d-none d-md-block mb-3">
            {!project.hidePosterImage && renderProjectImage()}
          </div>
          {shouldViewAdminItems && (
            <ProjectAdminEditSection>
              <HidePosterImageToggle project={project} />
            </ProjectAdminEditSection>
          )}
          <RegistrationSection
            project={project}
            shouldViewAdminItems={shouldViewAdminItems}
            actAsRegistrationTier={actAsContext.registrationTier}
          />
        </BucketRightColumn>
      </Row>
    </BucketBase>
  );
}

ProjectInfoBucket.propTypes = {
  // The project for which we're viewing the info bucket.
  project: PropTypes.object.isRequired,

  // The context for acting as a given user type.
  actAsContext: PropTypes.object.isRequired,
};

export default ProjectInfoBucket;
